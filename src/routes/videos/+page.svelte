<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { glow } from '$lib/glow.js';
	import { reveal } from '$lib/reveal.js';

	import Plane from 'lucide-svelte/icons/plane';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import MoonStar from 'lucide-svelte/icons/moon-star';
	import Building2 from 'lucide-svelte/icons/building-2';
	import TowerControl from 'lucide-svelte/icons/tower-control';
	import ExternalLink from 'lucide-svelte/icons/external-link';

	const playlists = [
		{
			name: 'VATSIM Flüge',
			desc: 'VATSIM-Flüge in voller Länge, unterschiedliche Airliner, unterschiedliche Strecken.',
			icon: Plane,
			gradient: 'from-sky-500/20 via-blue-500/10 to-transparent border-sky-500/25',
			iconColor: 'text-sky-300 bg-sky-500/20 border-sky-500/25',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUrMvv-907uTybfc6Hk4z55b'
		},
		{
			name: 'Rettungshelikopter',
			desc: 'Rettungsflüge und Heli-Einsätze abseits der Airliner-Routine.',
			icon: LifeBuoy,
			gradient: 'from-red-500/20 via-rose-500/10 to-transparent border-red-500/25',
			iconColor: 'text-red-300 bg-red-500/20 border-red-500/25',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUoDYQo3D9nyYylzGTTrJ4lI'
		},
		{
			name: 'Overnight Longhauls',
			desc: 'Lange Nachtflüge, ruhiger Stream, meistens mehr Atmosphäre als Action.',
			icon: MoonStar,
			gradient: 'from-indigo-500/20 via-violet-500/10 to-transparent border-indigo-500/25',
			iconColor: 'text-indigo-300 bg-indigo-500/20 border-indigo-500/25',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUq6seZkRIMpAaDuaw8IitbP'
		},
		{
			name: 'Cities: Skylines',
			desc: 'Städtebau zwischendurch, wenn der Sim mal Pause hat.',
			icon: Building2,
			gradient: 'from-emerald-500/20 via-green-500/10 to-transparent border-emerald-500/25',
			iconColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/25',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUpXuvjFz7pVrYMIooCyQF1_'
		},
		{
			name: 'Lotsen',
			desc: 'ATC-Sessions als Controller: Tower, Approach und Center auf VATSIM.',
			icon: TowerControl,
			gradient: 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/25',
			iconColor: 'text-amber-300 bg-amber-500/20 border-amber-500/25',
			url: 'https://www.youtube.com/playlist?list=PL5B83GzmIRUrsrtMte0318bOgM5Q1O1Mr'
		}
	];
</script>

<svelte:head>
	<title>Videos & Playlists – elmoradar</title>
</svelte:head>

<BasicPage>
	<div>

		<!-- HEADER -->
		<section class="relative pt-8 pb-12 border-b border-signal-500/10 overflow-hidden">
			<div class="relative max-w-2xl">
				<h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-5">Videos & Playlists</h1>
				<p class="text-white/50 text-base leading-relaxed">
					Alles, was auf dem VOD-Kanal nach Thema sortiert ist. Von langen VATSIM-Flügen über
					Rettungsflüge bis hin zu ATC-Sessions als Lotse.
				</p>
			</div>
		</section>

		<!-- PLAYLISTS -->
		<section class="reveal py-12" use:reveal>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each playlists as p}
					<a
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						class="glow-card group relative hud-panel block hover:scale-[1.01] transition-transform"
						use:glow
					>
						<span class="glow-border" aria-hidden="true"></span>
						<div class="hud-panel overflow-hidden border bg-linear-to-br {p.gradient} p-6 h-full flex flex-col">
							<div class="flex items-start justify-between mb-5">
								<div class="hud-panel-sm p-3 border {p.iconColor}">
									<p.icon size={20} />
								</div>
								<svg viewBox="0 0 24 24" class="w-4 h-4 fill-current text-white/15 group-hover:text-red-400/70 transition-colors shrink-0" aria-hidden="true">
								<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
							</div>
							<div class="font-display text-lg font-semibold text-white mb-2 leading-snug">{p.name}</div>
							<div class="text-xs text-white/40 leading-relaxed mb-5 flex-1">{p.desc}</div>
							<div class="flex items-center gap-1.5 text-[11px] text-signal-500/40 group-hover:text-signal-400 transition-colors">
								<ExternalLink size={11} />
								Playlist ansehen
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- CHANNEL LINK -->
		<section class="reveal border-t border-signal-500/10 py-10" use:reveal>
			<div class="hud-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-signal-500/15 bg-white/2 px-6 py-5">
				<div>
					<p class="text-sm font-display font-semibold text-white/80 mb-1">Alles auf einen Blick</p>
					<p class="text-xs text-white/40">Der komplette VOD-Kanal mit allen Streams ungeschnitten.</p>
				</div>
				<a
					href="https://youtube.com/@elmoradarVODs"
					target="_blank"
					rel="noopener noreferrer"
					class="hud-panel-sm inline-flex items-center gap-2 px-5 py-2.5 bg-signal-600 hover:bg-signal-500 text-sm font-display font-semibold text-white shadow-[0_0_20px_rgba(255,33,56,0.3)] transition-all shrink-0"
				>
					<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
						<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
					</svg>
					Zum Kanal
				</a>
			</div>
		</section>

	</div>
</BasicPage>
