<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { reveal } from '$lib/reveal.js';

	import Plane from 'lucide-svelte/icons/plane';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import MoonStar from 'lucide-svelte/icons/moon-star';
	import Building2 from 'lucide-svelte/icons/building-2';
	import TowerControl from 'lucide-svelte/icons/tower-control';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import { onMount } from 'svelte';
	import { consent } from '$lib/stores/consent.js';
	import { i18n } from '$lib/i18n/index.js';

	const t = $derived(i18n.t);

	type LatestVideo = { videoId: string; title: string; publishedAt: string; url: string };
	let latest = $state<LatestVideo[]>([]);
	let latestState = $state<'loading' | 'ready' | 'error'>('loading');

	onMount(async () => {
		try {
			const res = await fetch('/api/youtube/videos?handle=elmoradarVODs&limit=4');
			if (!res.ok) throw new Error();
			const data = await res.json();
			latest = (data.items ?? []).slice(0, 4);
			latestState = 'ready';
		} catch {
			latestState = 'error';
		}
	});

	const playlists = [
		{
			id: 'vatsim',
			icon: Plane,
			gradient: 'bg-surface border-line',
			iconColor: 'text-fg-muted bg-line border-line',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUrMvv-907uTybfc6Hk4z55b'
		},
		{
			id: 'rescue',
			icon: LifeBuoy,
			gradient: 'bg-surface border-line',
			iconColor: 'text-fg-muted bg-raised border-line',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUoDYQo3D9nyYylzGTTrJ4lI'
		},
		{
			id: 'longhaul',
			icon: MoonStar,
			gradient: 'bg-surface border-line',
			iconColor: 'text-fg-muted bg-line border-line',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUq6seZkRIMpAaDuaw8IitbP'
		},
		{
			id: 'cities',
			icon: Building2,
			gradient: 'bg-surface border-line',
			iconColor: 'text-fg-muted bg-line border-line',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUpXuvjFz7pVrYMIooCyQF1_'
		},
		{
			id: 'atc',
			icon: TowerControl,
			gradient: 'bg-surface border-line',
			iconColor: 'text-fg-muted bg-line border-line',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUrsrtMte0318bOgM5Q1O1Mr'
		}
	];
</script>

<svelte:head>
	<title>{t.videos.title}</title>
</svelte:head>

<BasicPage>
	<div>

		<!-- HEADER -->
		<section class="page-hero">
			<div class="relative max-w-2xl">
				<p class="eyebrow eyebrow-rule mb-4">{t.videos.eyebrow}</p>
				<h1 class="page-title mb-5">{t.videos.titleLead} <em>{t.videos.titleEm}</em></h1>
				<p class="text-white/50 text-base leading-relaxed">{t.videos.intro}</p>
			</div>
		</section>

		<!-- LATEST UPLOADS -->
		<section class="py-12">
			<div class="flex items-end justify-between gap-4 mb-6">
				<h2 class="section-title">{t.videos.latestHeading}</h2>
				<a href="https://youtube.com/@elmoradarVODs" target="_blank" rel="noopener noreferrer" class="text-sm text-fg-muted hover:text-accent-hover transition-colors">{t.common.viewAll} →</a>
			</div>
			{#if latestState === 'ready' && latest.length > 0}
				<div class="grid gap-x-4 gap-y-8 md:grid-cols-3">
					{#each latest as v, i}
						<a href={v.url} target="_blank" rel="noopener noreferrer" class="group block {i === 0 ? 'md:col-span-3 md:grid md:grid-cols-[1.6fr_1fr] md:gap-8 md:items-center' : ''}">
							<div class="aspect-video overflow-hidden rounded-lg border border-line bg-raised group-hover:border-accent/60 transition-colors">
								{#if $consent === 'accepted'}
									<img src="https://i.ytimg.com/vi/{v.videoId}/hqdefault.jpg" alt="{t.videos.thumbAlt}: {v.title}" loading="lazy" class="w-full h-full object-cover zoom-img" />
								{:else}
									<div class="w-full h-full flex items-center justify-center text-xs text-fg-subtle px-4 text-center">{t.videos.thumbConsent}</div>
								{/if}
							</div>
							<div class="mt-3 {i === 0 ? 'md:mt-0' : ''}">
								{#if i === 0}<p class="eyebrow eyebrow-rule mb-3">{t.videos.latestFirst}</p>{/if}
								<p class="font-medium leading-snug group-hover:text-accent-hover transition-colors {i === 0 ? 'text-xl md:text-2xl tracking-tight' : 'text-sm line-clamp-2'}">{v.title}</p>
								<p class="text-xs text-fg-subtle mt-1.5">{new Date(v.publishedAt).toLocaleDateString(i18n.locale, { day: '2-digit', month: 'long', year: 'numeric' })}</p>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="rounded-lg border border-line bg-surface px-6 py-10 text-center text-sm text-fg-muted">
					{latestState === 'loading' ? t.common.loading : t.videos.latestError}
				</div>
			{/if}
		</section>

		<!-- PLAYLISTS -->
		<section class="reveal py-12 border-t border-line" use:reveal>
			<h2 class="section-title mb-6">{t.videos.playlistsHeading}</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each playlists as p, i}
					<a
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative rounded-lg block {i === 0 ? 'lg:col-span-2' : ''}"
					>
						<div class="rounded-lg overflow-hidden border p-6 h-full flex flex-col transition-colors group-hover:border-accent/60 {i === 0 ? 'bg-accent-soft border-accent-deep' : 'bg-surface border-line'}">
							<div class="flex items-start justify-between mb-5">
								<div class="rounded-md p-3 border {p.iconColor}">
									<p.icon size={20} />
								</div>
								<svg viewBox="0 0 24 24" class="w-4 h-4 fill-current text-white/15 group-hover:text-accent transition-colors shrink-0" aria-hidden="true">
								<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
							</div>
							<div class="font-display text-lg font-semibold text-white mb-2 leading-snug">{t.videos.playlists[p.id].name}</div>
							<div class="text-xs text-white/40 leading-relaxed mb-5 flex-1">{t.videos.playlists[p.id].desc}</div>
							<div class="flex items-center gap-1.5 text-[11px] text-fg-subtle group-hover:text-accent-hover transition-colors">
								<ExternalLink size={11} />
								{t.videos.playlistOpen}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- CHANNEL LINK -->
		<section class="reveal border-t border-line py-10" use:reveal>
			<div class="rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-line bg-white/2 px-6 py-5">
				<div>
					<p class="text-sm font-display font-semibold text-white/80 mb-1">{t.videos.channelHeading}</p>
					<p class="text-xs text-white/40">{t.videos.channelText}</p>
				</div>
				<a
					href="https://youtube.com/@elmoradarVODs"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-md inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-sm font-display font-semibold text-white transition-all shrink-0"
				>
					<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
						<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
					</svg>
					{t.videos.channelCta}
				</a>
			</div>
		</section>

	</div>
</BasicPage>
