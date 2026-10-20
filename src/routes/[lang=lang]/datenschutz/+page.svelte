<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { i18n } from '$lib/i18n/index.js';
	import Shield from 'lucide-svelte/icons/shield';
	import Server from 'lucide-svelte/icons/server';
	import Mail from 'lucide-svelte/icons/mail';
	import Cookie from 'lucide-svelte/icons/cookie';
	import Lock from 'lucide-svelte/icons/lock';
	import UserCheck from 'lucide-svelte/icons/user-check';
	import AlertTriangle from 'lucide-svelte/icons/alert-triangle';
	import RefreshCw from 'lucide-svelte/icons/refresh-cw';
	import User from 'lucide-svelte/icons/user';

	const t = $derived(i18n.t);
	const p = $derived(t.privacy);

	const sections = $derived(
		[p.toc1, p.toc2, p.toc3, p.toc4, p.toc5, p.toc6, p.toc7, p.toc8, p.toc9, p.toc10].map((label, i) => ({
			id: String(i + 1),
			label
		}))
	);
</script>

<svelte:head>
	<title>{p.title}</title>
	<meta name="description" content={p.description} />
</svelte:head>

<BasicPage>
	<div>

		<!-- HEADER -->
		<section class="page-hero">
			<div class="relative">
			<div class="flex items-center gap-3 mb-4">
				<div class="p-2.5 rounded-xl bg-white/4 border border-white/8">
					<Shield size={20} class="text-white/50" />
				</div>
				<span class="text-xs text-white/30 uppercase tracking-wider">{t.legal.eyebrow}</span>
			</div>
			<h1 class="page-title mb-5">{p.heading}</h1>
			<p class="text-white/45 text-base leading-relaxed">{p.intro}</p>
			<p class="text-xs text-white/25 mt-4">{p.updated}</p>
			</div>
		</section>

		<div class="max-w-3xl">

		{#if t.legal.notice}
			<p class="mt-8 border-l-2 border-accent pl-4 text-sm text-fg-muted">{t.legal.notice}</p>
		{/if}

		<!-- TOC -->
		<nav class="py-6 border-b border-white/[0.07]">
			<p class="text-xs text-white/25 uppercase tracking-wider mb-3">{p.toc}</p>
			<div class="flex flex-wrap gap-2">
				{#each sections as s}
					<a
						href="#{s.id}"
						class="px-3 py-1.5 rounded-lg text-xs text-white/40 bg-white/3 border border-white/6 hover:bg-white/6 hover:text-white/70 hover:border-white/12 transition-all"
					>
						{s.id}. {s.label}
					</a>
				{/each}
			</div>
		</nav>

		<div class="py-10 space-y-10">

			<!-- 1. ÜBERBLICK -->
			<section id="1">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">01</span>
					<h2 class="text-base font-semibold text-white/80">{p.s1Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<p class="text-sm text-white/50 leading-relaxed">{p.s1Text}</p>
				</div>
			</section>

			<!-- 2. VERANTWORTLICHER -->
			<section id="2">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">02</span>
					<h2 class="text-base font-semibold text-white/80">{p.s2Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<User size={14} class="text-white/40" />
						</div>
						<div class="space-y-0.5 text-sm">
							<p class="text-white/70 font-medium">Marvin - c/o Online-Impressum #7296</p>
							<p class="text-white/35">Europaring 90</p>
							<p class="text-white/35">53757 St Augustin</p>
							<p class="text-white/35">{p.s2Country}</p>
							<a href="mailto:elmoradar@gmail.com" class="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors mt-2">
								<Mail size={12} />
								elmoradar@gmail.com
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- 3. HOSTING -->
			<section id="3">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">03</span>
					<h2 class="text-base font-semibold text-white/80">{p.s3Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<Server size={14} class="text-white/40" />
						</div>
						<div class="text-sm">
							<p class="text-white/60 font-medium mb-1">{p.s3Own}</p>
							<p class="text-white/35 text-xs leading-relaxed">{p.s3Location}</p>
						</div>
					</div>
					<div class="h-px bg-white/6"></div>
					<p class="text-sm text-white/50 leading-relaxed">{p.s3Text}</p>
					<p class="text-xs text-white/30 leading-relaxed">{p.s3Legal}</p>
				</div>
			</section>

			<!-- 4. DATENSPEICHERUNG -->
			<section id="4">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">04</span>
					<h2 class="text-base font-semibold text-white/80">{p.s4Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-4">
					<div>
						<p class="text-sm font-medium text-white/60 mb-3">{p.s4Logs}</p>
						<p class="text-sm text-white/45 leading-relaxed mb-4">{p.s4Intro}</p>
						<ul class="space-y-1.5">
							{#each p.logData as item}
								<li class="flex items-center gap-2.5 text-sm text-white/40">
									<span class="h-1 w-1 rounded-full bg-white/20 shrink-0"></span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
					<div class="h-px bg-white/6"></div>
					<p class="text-xs text-white/30 leading-relaxed">{p.s4Note}</p>
				</div>
			</section>

			<!-- 5. KONTAKTAUFNAHME -->
			<section id="5">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">05</span>
					<h2 class="text-base font-semibold text-white/80">{p.s5Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<Mail size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">{p.s5Text}</p>
					</div>
					<p class="text-xs text-white/30 leading-relaxed">{p.s5Legal}</p>
				</div>
			</section>

			<!-- 6. COOKIES -->
			<section id="6">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">06</span>
					<h2 class="text-base font-semibold text-white/80">{p.s6Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<Cookie size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">{p.s6Text}</p>
					</div>
					<p class="text-xs text-white/30">{p.s6Legal}</p>
				</div>
			</section>

			<!-- 7. SSL/TLS -->
			<section id="7">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">07</span>
					<h2 class="text-base font-semibold text-white/80">{p.s7Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-green-500/8 border border-green-500/15 shrink-0 mt-0.5">
							<Lock size={14} class="text-green-400/70" />
						</div>
						<div class="space-y-1.5">
							<p class="text-sm text-white/50 leading-relaxed">{p.s7Text}</p>
							<p class="text-xs text-white/30">
								{p.s7Note1}<span class="font-mono text-green-400/60">https://</span>{p.s7Note2}
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- 8. RECHTE -->
			<section id="8">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">08</span>
					<h2 class="text-base font-semibold text-white/80">{p.s8Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<UserCheck size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">{p.s8Intro}</p>
					</div>
					<div class="grid sm:grid-cols-2 gap-2 pl-1">
						{#each p.rights as right}
							<div class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/2 border border-white/5">
								<span class="h-1 w-1 rounded-full bg-white/25 shrink-0"></span>
								<span class="text-sm text-white/45">{right}</span>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- 9. AUFSICHTSBEHÖRDE -->
			<section id="9">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">09</span>
					<h2 class="text-base font-semibold text-white/80">{p.s9Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<AlertTriangle size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">{p.s9Text}</p>
					</div>
					<div class="pl-1">
						<p class="text-sm text-white/60 font-medium mb-1">{p.s9Authority}</p>
						<a
							href="https://www.datenschutz-berlin.de"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
						>
							www.datenschutz-berlin.de →
						</a>
					</div>
				</div>
			</section>

			<!-- 10. ÄNDERUNGEN -->
			<section id="10">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">10</span>
					<h2 class="text-base font-semibold text-white/80">{p.s10Title}</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<RefreshCw size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">{p.s10Text}</p>
					</div>
				</div>
			</section>

			<!-- FOOTER NOTE -->
			<div class="pt-4 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
				<p class="text-xs text-white/20">{p.updated}</p>
			</div>

		</div>
	</div>
		</div>
</BasicPage>
