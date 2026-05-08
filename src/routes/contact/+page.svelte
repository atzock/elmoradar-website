<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import Send from 'lucide-svelte/icons/send';
	import CheckCircle from 'lucide-svelte/icons/check-circle';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import Loader from 'lucide-svelte/icons/loader';

	type Category = { value: string; label: string; hint: string };

	const categories: Category[] = [
		{ value: 'business',   label: 'Business-Anfrage',    hint: 'Kooperationen, Werbung, Sponsorings' },
		{ value: 'collab',     label: 'Kooperation',         hint: 'Gemeinsame Streams, Projekte, Events' },
		{ value: 'stream-idea',label: 'Stream-Idee',         hint: 'Ideen für Routen, Szenarien, Challenges' },
		{ value: 'question',   label: 'Allgemeine Frage',    hint: 'Setup, VATSIM, Sim-Fragen etc.' },
		{ value: 'other',      label: 'Sonstiges',           hint: 'Alles andere' }
	];

	let name       = $state('');
	let email      = $state('');
	let category   = $state('');
	let message    = $state('');
	// Honeypot — never touched by real users
	let _gotcha    = $state('');

	// Render timestamp injected on mount (spam timing check)
	let _renderTime = $state('');

	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMsg = $state('');

	let selectedCategory = $derived(categories.find((c) => c.value === category) ?? null);

	// Build subject line from category + optional prefix
	let subjectLine = $derived(
		selectedCategory ? `[${selectedCategory.label}]` : '[Kontakt]'
	);

	import { onMount } from 'svelte';
	onMount(() => {
		_renderTime = String(Date.now());
	});

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		if (!name.trim() || !email.trim() || !category || !message.trim()) return;

		status = 'loading';
		errorMsg = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					subject: `${subjectLine} ${name.trim()}`,
					message: message.trim(),
					_gotcha,
					_renderTime
				})
			});

			const data = await res.json();

			if (res.ok && data.ok) {
				status = 'success';
			} else {
				status = 'error';
				errorMsg = data.error ?? 'Unbekannter Fehler.';
			}
		} catch {
			status = 'error';
			errorMsg = 'Verbindungsfehler. Bitte direkt per Mail schreiben.';
		}
	}
</script>

<svelte:head>
	<title>Kontakt – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="max-w-2xl">

		<!-- HEADER -->
		<section class="relative pt-8 pb-12 border-b border-white/[0.07] overflow-hidden">
			<div class="relative">
				<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-5">Kontakt</h1>
				<p class="text-white/50 text-base leading-relaxed">
					Von der Business-Anfrage bis zur Stream-Idee — schreib einfach. Ich antworte in der Regel innerhalb von 24–48 Stunden.
				</p>
			</div>
		</section>

		<div class="py-10">

			{#if status === 'success'}
				<!-- SUCCESS STATE -->
				<div class="flex flex-col items-center gap-4 py-16 text-center">
					<div class="p-4 rounded-full bg-green-500/10 border border-green-500/20">
						<CheckCircle size={32} class="text-green-400" />
					</div>
					<div>
						<h2 class="text-xl font-semibold text-white mb-2">Nachricht gesendet</h2>
						<p class="text-white/45 text-sm max-w-sm">
							Ich hab's bekommen und melde mich bald. Danke!
						</p>
					</div>
					<button
						onclick={() => {
							status = 'idle';
							name = ''; email = ''; category = ''; message = '';
						}}
						class="mt-2 text-sm text-white/40 hover:text-white/70 transition-colors"
					>
						Neue Nachricht schreiben
					</button>
				</div>

			{:else}
				<!-- FORM -->
				<form onsubmit={submit} novalidate class="space-y-6">

					<!-- Honeypot (invisible) -->
					<div aria-hidden="true" style="position:absolute;left:-9999px;height:0;width:0;overflow:hidden;">
						<label for="_gotcha">Website</label>
						<input id="_gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off" bind:value={_gotcha} />
					</div>
					<input type="hidden" name="_renderTime" bind:value={_renderTime} />

					<!-- Kategorie (first — sets tone) -->
					<div>
						<label class="block text-xs text-white/35 uppercase tracking-widest mb-3" for="category">
							Worum geht's? <span class="text-red-500/60">*</span>
						</label>
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
							{#each categories as cat}
								<button
									type="button"
									onclick={() => (category = cat.value)}
									class="flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl border text-left transition-all {category === cat.value
										? 'bg-red-600/10 border-red-500/30 text-white'
										: 'bg-white/2 border-white/8 text-white/50 hover:bg-white/5 hover:text-white/70 hover:border-white/15'}"
								>
									<span class="text-sm font-medium leading-tight">{cat.label}</span>
									<span class="text-[11px] leading-tight {category === cat.value ? 'text-white/40' : 'text-white/25'}">{cat.hint}</span>
								</button>
							{/each}
						</div>
					</div>

					<!-- Name + Email row -->
					<div class="grid sm:grid-cols-2 gap-4">
						<div>
							<label class="block text-xs text-white/35 uppercase tracking-widest mb-2" for="name">
								Name <span class="text-red-500/60">*</span>
							</label>
							<input
								id="name"
								type="text"
								autocomplete="name"
								placeholder="Dein Name"
								maxlength="100"
								required
								bind:value={name}
								class="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/6 transition-all"
							/>
						</div>
						<div>
							<label class="block text-xs text-white/35 uppercase tracking-widest mb-2" for="email">
								E-Mail <span class="text-red-500/60">*</span>
							</label>
							<input
								id="email"
								type="email"
								autocomplete="email"
								placeholder="deine@mail.de"
								required
								bind:value={email}
								class="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/6 transition-all"
							/>
						</div>
					</div>

					<!-- Message -->
					<div>
						<label class="block text-xs text-white/35 uppercase tracking-widest mb-2" for="message">
							Nachricht <span class="text-red-500/60">*</span>
						</label>
						<textarea
							id="message"
							rows="6"
							maxlength="5000"
							placeholder="Was liegt an?"
							required
							bind:value={message}
							class="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/6 transition-all resize-none leading-relaxed"
						></textarea>
						<div class="flex justify-between mt-1.5">
							<p class="text-xs text-white/20">Mindestens ein paar Sätze helfen mir weiter.</p>
							<span class="text-xs text-white/20 tabular-nums">{message.length}/5000</span>
						</div>
					</div>

					<!-- Error -->
					{#if status === 'error'}
						<div class="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-sm text-red-400">
							<AlertCircle size={16} class="shrink-0 mt-0.5" />
							<span>{errorMsg}</span>
						</div>
					{/if}

					<!-- Submit -->
					<div class="flex items-center justify-between gap-4 pt-1">
						<p class="text-xs text-white/20 leading-relaxed max-w-xs">
							Deine Daten werden ausschließlich zur Beantwortung deiner Anfrage verwendet.
						</p>
						<button
							type="submit"
							disabled={status === 'loading' || !name.trim() || !email.trim() || !category || !message.trim()}
							class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-semibold text-white shadow-[0_0_20px_rgba(239,68,68,0.25)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none shrink-0"
						>
							{#if status === 'loading'}
								<Loader size={15} class="animate-spin" />
								Wird gesendet…
							{:else}
								<Send size={15} />
								Absenden
							{/if}
						</button>
					</div>

				</form>

				<!-- ALTERNATIVE CONTACT -->
				<div class="mt-12 pt-8 border-t border-white/6 grid sm:grid-cols-2 gap-6">
					<div>
						<p class="text-xs text-white/25 uppercase tracking-widest mb-2">Direkte Mail</p>
						<a href="mailto:elmoradar@gmail.com" class="text-sm text-white/55 hover:text-white transition-colors">
							elmoradar@gmail.com
						</a>
					</div>
					<div>
						<p class="text-xs text-white/25 uppercase tracking-widest mb-2">Discord</p>
						<a href="https://discord.gg/elmoradar" target="_blank" rel="noopener noreferrer" class="text-sm text-white/55 hover:text-white transition-colors">
							discord.gg/elmoradar
						</a>
					</div>
				</div>
			{/if}

		</div>
	</div>
</BasicPage>
