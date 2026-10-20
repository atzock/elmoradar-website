<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { reveal } from '$lib/reveal.js';
	import { i18n } from '$lib/i18n/index.js';
	import Send from 'lucide-svelte/icons/send';
	import CheckCircle from 'lucide-svelte/icons/check-circle';
	import AlertCircle from 'lucide-svelte/icons/alert-circle';
	import Loader from 'lucide-svelte/icons/loader';

	const t = $derived(i18n.t);

	const categories = $derived(
		Object.entries(t.contact.categories).map(([value, c]) => ({ value, label: c.label, hint: c.hint }))
	);

	let name       = $state('');
	let email      = $state('');
	let category   = $state('');
	let subject    = $state('');
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
		selectedCategory ? `[${selectedCategory.label}]` : `[${t.contact.subjectFallback}]`
	);

	import { onMount } from 'svelte';
	onMount(() => {
		_renderTime = String(Date.now());
	});

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		if (!name.trim() || !email.trim() || !category || !subject.trim() || !message.trim()) return;

		status = 'loading';
		errorMsg = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					subject: `${subjectLine} ${subject.trim()}`,
					message: message.trim(),
					lang: i18n.lang,
					_gotcha,
					_renderTime
				})
			});

			const data = await res.json();

			if (res.ok && data.ok) {
				status = 'success';
			} else {
				status = 'error';
				errorMsg = data.error ?? t.contact.errUnknown;
			}
		} catch {
			status = 'error';
			errorMsg = t.contact.errConnection;
		}
	}
</script>

<svelte:head>
	<title>{t.contact.title}</title>
</svelte:head>

<BasicPage>
	<div>

		<!-- HEADER -->
		<section class="page-hero">
			<div class="relative">
				<p class="eyebrow eyebrow-rule mb-4">{t.contact.eyebrow}</p>
				<h1 class="page-title mb-5">{t.contact.titleWord}<span class="text-accent">.</span></h1>
				<p class="text-white/50 text-base leading-relaxed">{t.contact.intro}</p>
			</div>
		</section>

		<div class="max-w-2xl">

		<div class="reveal py-10" use:reveal>

			{#if status === 'success'}
				<!-- SUCCESS STATE -->
				<div class="flex flex-col items-center gap-4 py-16 text-center">
					<div class="p-4 rounded-full bg-green-500/10 border border-green-500/20">
						<CheckCircle size={32} class="text-green-400" />
					</div>
					<div>
						<h2 class="font-display text-xl font-semibold text-white mb-2">{t.contact.sentTitle}</h2>
						<p class="text-white/45 text-sm max-w-sm">{t.contact.sentText}</p>
					</div>
					<button
						onclick={() => {
							status = 'idle';
							name = ''; email = ''; category = ''; subject = ''; message = '';
						}}
						class="mt-2 text-sm text-white/40 hover:text-white/70 transition-colors"
					>
						{t.contact.another}
					</button>
				</div>

			{:else}
				<!-- FORM -->
				<form onsubmit={submit} novalidate class="space-y-6">

					<!-- Honeypot (invisible) -->
					<div aria-hidden="true" style="position:absolute;left:-9999px;height:0;width:0;overflow:hidden;">
						<label for="_gotcha">{t.contact.honeypot}</label>
						<input id="_gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off" bind:value={_gotcha} />
					</div>
					<input type="hidden" name="_renderTime" bind:value={_renderTime} />

					<!-- Kategorie (first — sets tone) -->
					<div>
						<label class="block text-xs font-mono text-fg-subtle uppercase tracking-wider mb-3" for="category">
							{t.contact.topic} <span class="text-fg-subtle">*</span>
						</label>
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
							{#each categories as cat}
								<button
									type="button"
									onclick={() => (category = cat.value)}
									class="rounded-md flex flex-col items-start gap-0.5 px-4 py-3 border text-left transition-all {category === cat.value
										? 'bg-accent-soft border-line text-white'
										: 'bg-white/2 border-line text-white/50 hover:bg-white/5 hover:text-white/70 hover:border-line-strong'}"
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
							<label class="block text-xs font-mono text-fg-subtle uppercase tracking-wider mb-2" for="name">
								{t.contact.name} <span class="text-fg-subtle">*</span>
							</label>
							<input
								id="name"
								type="text"
								autocomplete="name"
								placeholder={t.contact.namePlaceholder}
								maxlength="100"
								required
								bind:value={name}
								class="rounded-md w-full border border-line bg-white/4 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-line focus:bg-white/6 transition-all"
							/>
						</div>
						<div>
							<label class="block text-xs font-mono text-fg-subtle uppercase tracking-wider mb-2" for="email">
								{t.contact.email} <span class="text-fg-subtle">*</span>
							</label>
							<input
								id="email"
								type="email"
								autocomplete="email"
								placeholder={t.contact.emailPlaceholder}
								required
								bind:value={email}
								class="rounded-md w-full border border-line bg-white/4 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-line focus:bg-white/6 transition-all"
							/>
						</div>
					</div>

					<!-- Subject -->
					<div>
						<label class="block text-xs font-mono text-fg-subtle uppercase tracking-wider mb-2" for="subject">
							{t.contact.subject} <span class="text-fg-subtle">*</span>
						</label>
						<input
							id="subject"
							type="text"
							placeholder={t.contact.subjectPlaceholder}
							maxlength="200"
							required
							bind:value={subject}
							class="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/6 transition-all"
						/>
					</div>

					<!-- Message -->
					<div>
						<label class="block text-xs font-mono text-fg-subtle uppercase tracking-wider mb-2" for="message">
							{t.contact.message} <span class="text-fg-subtle">*</span>
						</label>
						<textarea
							id="message"
							rows="6"
							maxlength="5000"
							placeholder={t.contact.messagePlaceholder}
							required
							bind:value={message}
							class="rounded-md w-full border border-line bg-white/4 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-line focus:bg-white/6 transition-all resize-none leading-relaxed"
						></textarea>
						<div class="flex justify-between mt-1.5">
							<p class="text-xs text-white/20">{t.contact.messageHint}</p>
							<span class="text-xs text-white/20 tabular-nums">{message.length}/5000</span>
						</div>
					</div>

					<!-- Error -->
					{#if status === 'error'}
						<div class="rounded-md flex items-start gap-3 px-4 py-3 bg-accent-soft border border-line text-sm text-accent">
							<AlertCircle size={16} class="shrink-0 mt-0.5" />
							<span>{errorMsg}</span>
						</div>
					{/if}

					<!-- Submit -->
					<div class="flex items-center justify-between gap-4 pt-1">
						<p class="text-xs text-white/20 leading-relaxed max-w-xs">{t.contact.privacyNote}</p>
						<button
							type="submit"
							disabled={status === 'loading' || !name.trim() || !email.trim() || !category || !subject.trim() || !message.trim()}
							class="rounded-lg flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-sm font-display font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none shrink-0"
						>
							{#if status === 'loading'}
								<Loader size={15} class="animate-spin" />
								{t.contact.sending}
							{:else}
								<Send size={15} />
								{t.contact.send}
							{/if}
						</button>
					</div>

				</form>

				<!-- ALTERNATIVE CONTACT -->
				<div class="mt-12 pt-8 border-t border-line grid sm:grid-cols-2 gap-6">
					<div>
						<p class="text-xs font-mono text-fg-subtle uppercase tracking-wider mb-2">{t.contact.directMail}</p>
						<a href="mailto:elmoradar@gmail.com" class="text-sm text-white/55 hover:text-white transition-colors">
							elmoradar@gmail.com
						</a>
					</div>
					<div>
						<p class="text-xs font-mono text-fg-subtle uppercase tracking-wider mb-2">{t.contact.discord}</p>
						<a href="https://discord.gg/elmoradar" target="_blank" rel="noopener noreferrer" class="text-sm text-white/55 hover:text-white transition-colors">
							discord.gg/elmoradar
						</a>
					</div>
				</div>
			{/if}

		</div>
	</div>
		</div>
</BasicPage>
