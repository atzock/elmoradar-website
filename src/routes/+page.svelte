<script lang="ts">
	import {
		navigraph,
		aerosoft,
		orbx,
		inibuilds,
		gamesPlanet,
		streamerImage,
	} from '$lib/assets/index.js';
	import BasicPage from '$lib/components/basic-page.svelte';
	import { glow } from '$lib/glow.js';
	import { consent } from '$lib/stores/consent.js';
	import { onMount } from 'svelte';
	import Plane from 'lucide-svelte/icons/plane';
	import Headphones from 'lucide-svelte/icons/headphones';
	import Users from 'lucide-svelte/icons/users';
	import Clock from 'lucide-svelte/icons/clock';
	import Award from 'lucide-svelte/icons/award';
	import Map from 'lucide-svelte/icons/map';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	let discordLink = 'https://discord.gg/elmoradar';

	let twitchLive = $state(false);
	let twitchViewers = $state<number | null>(null);
	let twitchTitle = $state('');

	let vatsimConnected = $state(false);
	let vatsimCallsign = $state('');
	let vatsimRoute = $state('');
	let vatsimAltitude = $state('');
	let onlinePilots = $state<number>(0);
	let onlineControllers = $state<number>(0);

	type RecentVideoItem = {
		videoId: string;
		title: string;
		publishedAt: string;
		embedUrl: string;
		url: string;
	};

	let vodsVideo = $state<RecentVideoItem | null>(null);
	let mainVideo = $state<RecentVideoItem | null>(null);

	type FlightplanItem = {
		id: number;
		callsign: string;
		dep?: string;
		arr?: string;
		aircraft?: string;
		altitude?: string;
	};

	type AtcSession = {
		callsign: string;
		type?: string;
		start?: string;
		end?: string;
		minutes: number;
	};

	let recentFlightplans = $state<FlightplanItem[]>([]);
	let lastAtcSession = $state<AtcSession | null>(null);
	const HARDCODED_VATSIM_MEMBER_ID = 1411028;

	const stats = [
		{ value: '1.8K', label: 'Flugstunden', icon: Clock },
		{ value: '450+', label: 'VATSIM-Flüge', icon: Plane },
		{ value: '75+', label: 'Airports', icon: Map },
		{ value: 'C1', label: 'VATSIM Rating', icon: Award }
	];

	// Typical stream schedule
	const schedule = [
		{ day: 'Mo', active: false },
		{ day: 'Di', active: false },
		{ day: 'Mi', active: true },
		{ day: 'Do', active: false },
		{ day: 'Fr', active: true },
		{ day: 'Sa', active: true },
		{ day: 'So', active: false }
	];

	// Today's weekday index (0 = Mo, 6 = So)
	const todayIdx = (new Date().getDay() + 6) % 7;

	const partners = [
		{ name: 'Navigraph', url: 'https://navigraph.com', logo: navigraph },
		{ name: 'Aerosoft', url: 'https://aerosoft.com', logo: aerosoft },
		{ name: 'Orbx', url: 'https://orbxdirect.com', logo: orbx },
		{ name: 'iniBuilds', url: 'https://inibuilds.com/?ref=elmoradar', logo: inibuilds },
		{ name: 'GamesPlanet', url: 'https://de.gamesplanet.com/?ref=elmo', logo: gamesPlanet }
	];

	const fleetTeaser = [
		{
			name: 'Fenix A320',
			url: 'https://fenixsim.com',
			img: 'https://flyawaysimulation.com/media/images14/images/fenix-roadmap-a320neo-fs2020-fs2024-1.jpeg'
		},
		{
			name: 'ini A350',
			url: 'https://inibuilds.com/products/inibuilds-a350-airliner-msfs-2024?ref=elmoradar',
			img: 'https://inibuilds.com/cdn/shop/files/FlightSimulator2024_gibhJDge7T_b8c0b58b-eb0f-499b-9f94-776345917ec6.png?v=1741617134'
		},
		{
			name: 'FBW A380',
			url: 'https://flybywiresim.com/a380x/',
			img: 'https://flybywiresim.com/img/notam-images/a380x/a380x-a32nx.png'
		},
		{
			name: 'HPG H145',
			url: 'https://www.hypeperformancegroup.com/products/hpg-h145',
			img: 'https://www.hypeperformancegroup.com/cdn/shop/products/yes_1_1296x.jpg?v=1630111353'
		}
	];

	async function loadAtcSession() {
		const res = await fetch(`/api/vatsim/member/atc?memberId=${HARDCODED_VATSIM_MEMBER_ID}`);
		if (res.ok) {
			const data = await res.json();
			lastAtcSession = data.session ?? null;
		}
	}

	async function loadStatus() {
		const [twitchRes, vatsimRes, youtubeVodsRes, youtubeMainRes] = await Promise.allSettled([
			fetch('/api/twitch/status'),
			fetch(`/api/vatsim/status?memberId=${HARDCODED_VATSIM_MEMBER_ID}`),
			fetch('/api/youtube/videos?handle=elmoradarVODs'),
			fetch('/api/youtube/videos?handle=elmoradar')
		]);

		if (twitchRes.status === 'fulfilled' && twitchRes.value.ok) {
			const data = await twitchRes.value.json();
			twitchLive = data.live;
			twitchViewers = data.viewers ?? null;
			twitchTitle = data.title ?? '';
		}

		if (vatsimRes.status === 'fulfilled' && vatsimRes.value.ok) {
			const data = await vatsimRes.value.json();
			vatsimConnected = data.connected;
			vatsimCallsign = data.callsign;
			vatsimRoute = data.route;
			vatsimAltitude = data.altitude;
			onlinePilots = data.onlinePilots ?? 0;
			onlineControllers = data.onlineControllers ?? 0;
		}

		const flightplanRes = await fetch(
			`/api/vatsim/member/flightplans?memberId=${HARDCODED_VATSIM_MEMBER_ID}`
		);
		if (flightplanRes.ok) {
			const flightplanData = await flightplanRes.json();
			recentFlightplans = flightplanData.items ?? [];
		}

		if (youtubeVodsRes.status === 'fulfilled' && youtubeVodsRes.value.ok) {
			const data = await youtubeVodsRes.value.json();
			vodsVideo = Array.isArray(data.items) && data.items.length > 0 ? data.items[0] : null;
		}

		if (youtubeMainRes.status === 'fulfilled' && youtubeMainRes.value.ok) {
			const data = await youtubeMainRes.value.json();
			mainVideo = Array.isArray(data.items) && data.items.length > 0 ? data.items[0] : null;
		}

	}

	onMount(() => {
		loadStatus();
		loadAtcSession();
		setInterval(loadStatus, 30000);
	});
</script>

<svelte:head>
	<title>elmoradar – VATSIM ATC & Pilot · Flugsimulation & Streaming</title>
	<meta name="og:title" content="elmoradar – VATSIM ATC & Pilot · Flugsimulation & Streaming" />
	<meta name="og:description" content="Flugsimulation auf VATSIM, zu viel Kaffee und ein Homesetup, das langsam außer Kontrolle gerät. Streame auf Twitch." />
	<meta
		name="description"
		content="Flugsimulation, VATSIM und zu viel Kaffee - elmoradar auf Twitch."
	/>
</svelte:head>

<BasicPage>
	<div>

		<!-- ── HERO ──────────────────────────────────────────────────── -->
		<section class="pt-8 pb-12 border-b border-white/6">

			<!-- Twitch live banner -->
			{#if twitchLive}
				<a
					href="https://twitch.tv/elmoradar"
					target="_blank"
					class="flex items-center gap-2.5 mb-6 px-4 py-3 rounded-xl bg-[#9147ff]/10 border border-[#9147ff]/25 hover:bg-[#9147ff]/15 transition-colors group"
				>
					<span class="h-2 w-2 rounded-full bg-[#9147ff] animate-pulse shrink-0"></span>
					<span class="text-sm text-[#b580ff] font-medium shrink-0">Gerade live</span>
					{#if twitchViewers}
						<span class="text-sm text-white/40 shrink-0">· {twitchViewers}</span>
					{/if}
					{#if twitchTitle}
						<span class="text-sm text-white/30 truncate hidden sm:block">— {twitchTitle}</span>
					{/if}
					<span class="ml-auto text-[#9147ff]/70 text-xs group-hover:text-[#b580ff] transition-colors shrink-0">Ansehen →</span>
				</a>
			{/if}

			<!-- TWO-COLUMN LAYOUT -->
			<div class="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start lg:items-center">

				<!-- LEFT: Text + CTA + Socials -->
				<div class="flex-1 min-w-0">
					<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">elmoradar</h1>

					<p class="text-white/60 text-[15px] leading-relaxed max-w-xl mb-3">
						Flugsimulation auf einem Level, bei dem Kaffee kein Genuss mehr ist. Er ist eine
						Notwendigkeit. Ich fliege fast täglich auf VATSIM, lotse gelegentlich als Controller und
						versuche, meine RTX 5090 nicht zu langweilen.
					</p>
					<p class="text-white/35 text-sm leading-relaxed max-w-xl mb-7">
						Hier findest du mein komplettes Setup, alle Addons die ich täglich nutze sowie meine
						Grafikeinstellungen für Microsoft Flight Simulator 2024. Schau gerne auf dem Stream
						vorbei. Meistens täglich ab ~19 Uhr.
					</p>

					<!-- Primary Twitch CTA -->
					<a
						href="https://twitch.tv/elmoradar"
						target="_blank"
						class="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#9147ff] hover:bg-[#7d3bd6] text-white font-semibold text-sm shadow-[0_0_30px_rgba(145,71,255,0.4)] hover:shadow-[0_0_45px_rgba(145,71,255,0.55)] transition-all mb-6"
					>
						<svg viewBox="0 0 24 24" class="w-4 h-4 fill-current shrink-0" aria-hidden="true">
							<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
						</svg>
						Zum Stream
					</a>

					<!-- Social icon row -->
					<div class="flex flex-wrap gap-2 text-sm">
						<a
							href="https://tiktok.com/@elmoradar"
							target="_blank"
							class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/55 hover:text-white transition-all"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
							</svg>
							TikTok
						</a>
						<a
							href="https://youtube.com/@elmoradar"
							target="_blank"
							class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/8 hover:border-red-500/20 text-white/55 hover:text-red-400 transition-all"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
							YouTube
						</a>
						<a
							href="https://youtube.com/@elmoradarVODs"
							target="_blank"
							class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/8 hover:border-red-500/20 text-white/55 hover:text-red-400 transition-all"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
							YouTube VODs
						</a>
						<a
							href={discordLink}
							target="_blank"
							class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-indigo-500/10 border border-white/8 hover:border-indigo-500/20 text-white/55 hover:text-indigo-300 transition-all"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
							</svg>
							Discord
						</a>
					</div>
				</div>

				<!-- RIGHT: Behind the Stream (desktop only) -->
				<div class="hidden lg:block shrink-0 w-72 xl:w-80">
					<div class="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_60px_rgba(145,71,255,0.12)]">
						<img
							src={streamerImage}
							alt="Behind the Stream – elmoradar Setup"
							class="w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
						<div class="absolute bottom-0 left-0 right-0 px-4 py-3">
							<p class="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium">Behind the Stream</p>
						</div>
					</div>
				</div>

			</div>

			<!-- VATSIM live strip -->
			{#if vatsimConnected}
				<div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 rounded-xl bg-green-500/6 border border-green-500/20 text-sm">
					<span class="flex items-center gap-2 text-green-400/80">
						<span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
						<Plane size={13} />
						In der Luft
					</span>
					{#if vatsimCallsign}
						<span class="font-mono text-white/80 font-medium">{vatsimCallsign}</span>
					{/if}
					{#if vatsimRoute && vatsimRoute !== 'N/A'}
						<span class="text-white/40 text-xs sm:text-sm">{vatsimRoute}</span>
					{/if}
					{#if vatsimAltitude && vatsimAltitude !== 'N/A'}
						<span class="text-white/30 text-xs">{vatsimAltitude}</span>
					{/if}
				</div>
			{/if}
		</section>

		<!-- STATS STRIP (mobile only) -->
		<div class="grid grid-cols-2 gap-2 py-6 border-b border-white/6 lg:hidden">
			{#each stats as s}
				{@const Icon = s.icon}
				<div class="flex flex-col items-center justify-center gap-1 py-4 rounded-xl bg-white/3 border border-white/6">
					<span class="text-xl font-bold text-white tabular-nums">{s.value}</span>
					<span class="flex items-center gap-1.5 text-xs text-white/35">
						<Icon size={11} class="text-white/20" />
						{s.label}
					</span>
				</div>
			{/each}
		</div>

		<!-- MAIN GRID -->
		<div class="py-8 sm:py-12 grid gap-8 sm:gap-12 lg:grid-cols-[1fr_240px]">

			<!-- LEFT: VIDEOS -->
			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-6 sm:mb-8">Videos</h2>
				<div class="grid gap-8 sm:gap-10">

					<!-- VODs Kanal -->
					<div>
						<div class="mb-3">
							<p class="text-sm font-semibold text-white/70">elmoradarVODS</p>
							<p class="text-xs text-white/35 mt-0.5">Alle vergangenen Streams ungeschnitten. Hier der letzte Stream:</p>
						</div>
						{#if vodsVideo}
							<div class="max-w-xs sm:max-w-none mx-auto sm:mx-0 rounded-xl overflow-hidden border border-white/[0.07] bg-white/2">
								{#if $consent === 'accepted'}
									<iframe
										title={vodsVideo.title || 'YouTube VOD'}
										class="aspect-video w-full block"
										src={vodsVideo.embedUrl}
										allowfullscreen
									></iframe>
								{:else}
									<div class="aspect-video flex flex-col items-center justify-center gap-3 px-6">
										<svg viewBox="0 0 24 24" class="w-7 h-7 fill-current text-white/12" aria-hidden="true">
											<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
										</svg>
										<p class="text-xs text-white/25 text-center leading-relaxed">
											Einbettung deaktiviert —<br />Cookies müssen akzeptiert werden.
										</p>
										<div class="flex flex-col items-center gap-2">
											<button
												onclick={() => consent.accept()}
												class="text-xs font-medium text-white/55 hover:text-white border border-white/10 hover:border-white/22 bg-white/3 hover:bg-white/6 px-4 py-2 rounded-lg transition-all"
											>
												Einbettungen aktivieren
											</button>
											<a href={vodsVideo.url} target="_blank" rel="noopener noreferrer" class="text-xs text-white/22 hover:text-white/50 transition-colors">
												Auf YouTube ansehen →
											</a>
										</div>
									</div>
								{/if}
								{#if vodsVideo.title}
									<div class="px-4 py-3">
										<p class="text-sm text-white/45 truncate">{vodsVideo.title}</p>
									</div>
								{/if}
							</div>
						{:else}
							<div class="max-w-xs sm:max-w-none mx-auto sm:mx-0 aspect-video rounded-xl border border-white/[0.07] bg-white/2 flex items-center justify-center">
								<span class="text-xs text-white/20">Wird geladen…</span>
							</div>
						{/if}
					</div>

					<!-- Hauptkanal -->
					<div>
						<div class="mb-3">
							<p class="text-sm font-semibold text-white/70">elmoradar Hauptkanal</p>
							<p class="text-xs text-white/35 mt-0.5">Highlights aus den Streams — hier das neueste Video:</p>
						</div>
						{#if mainVideo}
							<div class="max-w-xs sm:max-w-none mx-auto sm:mx-0 rounded-xl overflow-hidden border border-white/[0.07] bg-white/2">
								{#if $consent === 'accepted'}
									<iframe
										title={mainVideo.title || 'YouTube Video'}
										class="aspect-video w-full block"
										src={mainVideo.embedUrl}
										allowfullscreen
									></iframe>
								{:else}
									<div class="aspect-video flex flex-col items-center justify-center gap-3 px-6">
										<svg viewBox="0 0 24 24" class="w-7 h-7 fill-current text-white/12" aria-hidden="true">
											<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
										</svg>
										<p class="text-xs text-white/25 text-center leading-relaxed">
											Einbettung deaktiviert —<br />Cookies müssen akzeptiert werden.
										</p>
										<div class="flex flex-col items-center gap-2">
											<button
												onclick={() => consent.accept()}
												class="text-xs font-medium text-white/55 hover:text-white border border-white/10 hover:border-white/22 bg-white/3 hover:bg-white/6 px-4 py-2 rounded-lg transition-all"
											>
												Einbettungen aktivieren
											</button>
											<a href={mainVideo.url} target="_blank" rel="noopener noreferrer" class="text-xs text-white/22 hover:text-white/50 transition-colors">
												Auf YouTube ansehen →
											</a>
										</div>
									</div>
								{/if}
								{#if mainVideo.title}
									<div class="px-4 py-3">
										<p class="text-sm text-white/45 truncate">{mainVideo.title}</p>
									</div>
								{/if}
							</div>
						{:else}
							<div class="max-w-xs sm:max-w-none mx-auto sm:mx-0 aspect-video rounded-xl border border-white/[0.07] bg-white/2 flex items-center justify-center">
								<span class="text-xs text-white/20">Wird geladen…</span>
							</div>
						{/if}
					</div>

				</div>
			</div>

			<!-- RIGHT: SIDEBAR -->
			<div class="space-y-9">

				<!-- STATS (desktop only) -->
				<div class="hidden lg:block">
					<h3 class="text-xs text-white/30 uppercase tracking-widest mb-4">Zahlen</h3>
					<div class="space-y-1">
						{#each stats as s}
							{@const Icon = s.icon}
							<div class="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/3 transition-colors group">
								<span class="flex items-center gap-2.5 text-sm text-white/45 group-hover:text-white/60 transition-colors">
									<Icon size={14} class="text-white/20" />
									{s.label}
								</span>
								<span class="text-sm font-semibold text-white tabular-nums">{s.value}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- VATSIM NETWORK -->
				{#if onlinePilots > 0}
					<div>
						<h3 class="text-xs text-white/30 uppercase tracking-widest mb-4">VATSIM Netzwerk</h3>
						<div class="space-y-2 text-sm">
							<div class="flex items-center justify-between text-white/45">
								<span class="flex items-center gap-2">
									<Plane size={13} class="text-white/20" />
									Piloten online
								</span>
								<span class="font-medium text-white/60">{onlinePilots.toLocaleString('de')}</span>
							</div>
							<div class="flex items-center justify-between text-white/45">
								<span class="flex items-center gap-2">
									<Users size={13} class="text-white/20" />
									Controller
								</span>
								<span class="font-medium text-white/60">{onlineControllers.toLocaleString('de')}</span>
							</div>
						</div>
					</div>
				{/if}

				<!-- RECENT FLIGHT -->
				{#if recentFlightplans.length > 0}
					<div>
						<h3 class="text-xs text-white/30 uppercase tracking-widest mb-4">Letzter Flug</h3>
						<div class="space-y-1">
							{#each recentFlightplans as fp}
								<div class="flex items-center gap-2 px-2 py-2.5 rounded-lg hover:bg-white/3 transition-colors text-xs group">
									<Plane size={11} class="text-white/15 shrink-0 group-hover:text-white/30 transition-colors" />
									<span class="font-mono text-white/55 shrink-0 w-20 truncate">{fp.callsign}</span>
									{#if fp.dep && fp.arr}
										<span class="text-white/30 truncate">{fp.dep} → {fp.arr}</span>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- LAST ATC SESSION -->
				{#if lastAtcSession}
					<div>
						<h3 class="text-xs text-white/30 uppercase tracking-widest mb-4">Letzte ATC Session</h3>
						<div class="px-2 py-2.5 rounded-lg hover:bg-white/3 transition-colors text-xs group">
							<div class="flex items-center gap-2 mb-1.5">
								<Headphones size={11} class="text-white/15 shrink-0 group-hover:text-white/30 transition-colors" />
								<span class="font-mono text-white/55 font-medium">{lastAtcSession.callsign}</span>
								{#if lastAtcSession.minutes > 0}
									<span class="ml-auto text-white/25">{Math.round(lastAtcSession.minutes)} min</span>
								{/if}
							</div>
							{#if lastAtcSession.start}
								<p class="text-white/20 pl-4.75">
									{new Date(lastAtcSession.start).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
									{#if lastAtcSession.end}
										· {new Date(lastAtcSession.start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} – {new Date(lastAtcSession.end).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} UTC
									{/if}
								</p>
							{/if}
						</div>
					</div>
				{/if}

				<!-- ADDONS LINK -->
				<div>
					<h3 class="text-xs text-white/30 uppercase tracking-widest mb-4">Meine Addons</h3>
					<p class="text-sm text-white/40 mb-3 leading-relaxed">
						10 Flieger, 6 Tools — alles täglich im Einsatz.
					</p>
					<a
						href="/addons"
						class="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
					>
						Addons ansehen
						<ArrowRight size={13} class="text-white/30" />
					</a>
				</div>

			</div>
		</div>

		<!-- FLEET TEASER -->
		<section class="border-t border-white/6 py-10 sm:py-14">
			<div class="flex items-end justify-between mb-6 sm:mb-8">
				<div>
					<h2 class="text-xl sm:text-2xl font-bold text-white mb-1.5">Im Hangar</h2>
					<p class="text-sm text-white/45">Die Flieger, die meistens zum Einsatz kommen.</p>
				</div>
				<a
					href="/addons"
					class="hidden sm:flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors shrink-0"
				>
					Alle ansehen
					<ArrowRight size={14} />
				</a>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
				{#each fleetTeaser as plane}
					<a
						href={plane.url}
						target="_blank"
						rel="noopener noreferrer"
						class="glow-card group relative rounded-xl block"
						use:glow
					>
						<span class="glow-border" aria-hidden="true"></span>
						<div class="rounded-xl overflow-hidden border border-white/8 bg-white/2 hover:border-white/15 transition-all">
							<div class="aspect-video overflow-hidden bg-white/5">
								<img
									src={plane.img}
									alt={plane.name}
									loading="lazy"
									class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
								/>
							</div>
							<div class="px-3 py-2.5">
								<p class="text-xs text-white/60 group-hover:text-white/80 transition-colors font-medium leading-tight">{plane.name}</p>
							</div>
						</div>
					</a>
				{/each}
			</div>

			<a
				href="/addons"
				class="sm:hidden flex items-center justify-center gap-1.5 mt-4 text-sm text-white/40 hover:text-white/70 transition-colors"
			>
				Alle Flieger & Addons ansehen
				<ArrowRight size={14} />
			</a>
		</section>

		<!-- PARTNERS -->
		<section class="border-t border-white/6 py-10 sm:py-16">
			<div class="mb-7 sm:mb-10">
				<h2 class="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">Partner & Sponsoren</h2>
				<p class="text-sm text-white/45 max-w-lg">Diese Unternehmen machen elmoradar möglich. Von Navdaten über Airports bis hin zu Spielen.</p>
			</div>
			<div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
				{#each partners as p}
					<a
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/20 transition-all group"
					>
						<div class="shrink-0 w-10 sm:w-16 flex items-center justify-center">
							<img src={p.logo} alt={p.name} class="max-h-8 sm:max-h-12 max-w-full w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity" />
						</div>
						<div class="min-w-0">
							<p class="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">{p.name}</p>
							<p class="text-[10px] sm:text-xs text-white/30 mt-0.5 group-hover:text-white/45 transition-colors hidden sm:block">Partner →</p>
						</div>
					</a>
				{/each}
			</div>
		</section>
	</div>
</BasicPage>
