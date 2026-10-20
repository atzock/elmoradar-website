<script lang="ts">
	import {
		navigraph,
		aerosoft,
		orbx,
		inibuilds,
		gamesPlanet,
		moza,
		tobii,
		streamerImage,
	} from '$lib/assets/index.js';
	import BasicPage from '$lib/components/basic-page.svelte';
	import { reveal } from '$lib/reveal.js';
	import { consent } from '$lib/stores/consent.js';
	import { i18n } from '$lib/i18n/index.js';
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

	const t = $derived(i18n.t);

	const stats = $derived([
		{ value: '1.8K', label: t.home.stats.hours, icon: Clock },
		{ value: '450+', label: t.home.stats.flights, icon: Plane },
		{ value: '75+', label: t.home.stats.airports, icon: Map },
		{ value: 'C1', label: t.home.stats.rating, icon: Award }
	]);

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
		{ name: 'GamesPlanet', url: 'https://de.gamesplanet.com/?ref=elmo', logo: gamesPlanet },
		{ name: 'MOZA Racing', url: 'https://mozaracing.com/elmoradar', logo: moza },
		{ name: 'Tobii Gaming', url: 'https://tobii.gg/elmoradar', logo: tobii }
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
	<title>{t.home.title}</title>
	<meta property="og:title" content={t.home.title} />
	<meta property="og:description" content={t.home.ogDescription} />
	<meta name="description" content={t.home.description} />
</svelte:head>

<BasicPage>
	<div>

		<!-- ── HERO ──────────────────────────────────────────────────── -->
		<section class="page-hero">

			<!-- Twitch live banner -->
			{#if twitchLive}
				<a
					href="https://twitch.tv/elmoradar"
					target="_blank"
					class="rounded-md flex items-center gap-2.5 mb-6 px-4 py-3 bg-accent-soft border border-line hover:bg-raised transition-colors group"
				>
					<span class="h-2 w-2 rounded-full bg-accent animate-pulse shrink-0"></span>
					<span class="text-sm font-display text-accent font-medium shrink-0">{t.home.liveNow}</span>
					{#if twitchViewers}
						<span class="text-sm font-mono text-white/40 shrink-0">· {twitchViewers}</span>
					{/if}
					{#if twitchTitle}
						<span class="text-sm text-white/30 truncate hidden sm:block">· {twitchTitle}</span>
					{/if}
					<span class="ml-auto text-fg-subtle text-xs group-hover:text-accent-hover transition-colors shrink-0">{t.home.watch}</span>
				</a>
			{/if}

			<!-- TWO-COLUMN LAYOUT -->
			<div class="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">

				<!-- LEFT: Text + CTA + Socials -->
				<div class="flex-1 min-w-0">
					<p class="eyebrow eyebrow-rule mb-5">{t.home.eyebrow}</p>
					<h1 class="display-title mb-6">elmo<em>radar</em></h1>

					<p class="text-fg text-lg leading-relaxed max-w-xl mb-4">{t.home.lead}</p>
					<p class="text-fg-muted text-[15px] leading-relaxed max-w-xl mb-8">{t.home.body}</p>

					<!-- Primary Twitch CTA -->
					<a
						href="https://twitch.tv/elmoradar"
						target="_blank"
						class="btn btn-primary !px-6 !py-3 mb-6"
					>
						<svg viewBox="0 0 24 24" class="w-4 h-4 fill-current shrink-0" aria-hidden="true">
							<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
						</svg>
						{t.home.toStream}
					</a>

					<!-- Social icon row -->
					<div class="flex flex-wrap gap-2 text-sm">
						<a
							href="https://tiktok.com/@elmoradar"
							target="_blank"
							class="btn btn-secondary !px-3 !py-1.5 text-fg-muted hover:text-fg"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
							</svg>
							TikTok
						</a>
						<a
							href="https://youtube.com/@elmoradar"
							target="_blank"
							class="btn btn-secondary !px-3 !py-1.5 text-fg-muted hover:text-fg"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
							YouTube
						</a>
						<a
							href="https://youtube.com/@elmoradarVODs"
							target="_blank"
							class="btn btn-secondary !px-3 !py-1.5 text-fg-muted hover:text-fg"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
							YouTube VODs
						</a>
						<a
							href={discordLink}
							target="_blank"
							class="btn btn-secondary !px-3 !py-1.5 text-fg-muted hover:text-fg"
						>
							<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
								<path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
							</svg>
							Discord
						</a>
					</div>
				</div>

				<!-- RIGHT: Behind the Stream (desktop only) -->
				<div class="relative max-w-md mx-auto lg:max-w-none w-full">
					<div class="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border border-accent-deep bg-accent-soft/40" aria-hidden="true"></div>
						<figure class="relative overflow-hidden rounded-lg border border-line bg-surface">
							<img src={streamerImage} alt={t.home.portraitAlt} class="w-full object-cover" />
							<div class="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none"></div>
							<figcaption class="absolute bottom-0 left-0 right-0 px-5 py-4 eyebrow !text-fg">{t.home.portraitCaption}</figcaption>
						</figure>
				</div>

			</div>

			<!-- VATSIM live strip -->
			{#if vatsimConnected}
				<div class="rounded-md mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 bg-green-500/6 border border-green-500/20 text-sm">
					<span class="flex items-center gap-2 text-green-400/80 font-display">
						<span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
						<Plane size={13} />
						{t.home.inAir}
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
		<div class="reveal grid grid-cols-2 gap-2 py-6 border-b border-line lg:hidden" use:reveal>
			{#each stats as s}
				{@const Icon = s.icon}
				<div class="rounded-md flex flex-col items-center justify-center gap-1 py-4 bg-white/3 border border-line">
					<span class="text-xl font-semibold text-white tabular-nums">{s.value}</span>
					<span class="flex items-center gap-1.5 text-xs font-mono text-white/35">
						<Icon size={11} class="text-fg-subtle" />
						{s.label}
					</span>
				</div>
			{/each}
		</div>

		<!-- MAIN GRID -->
		<div class="py-10 sm:py-14 grid gap-12 sm:gap-16">

			<!-- LEFT: VIDEOS — both cards share one fixed geometry (16:9 frame + fixed-height caption) -->
			<div class="reveal" use:reveal>
				<h2 class="section-title text-2xl sm:text-3xl mb-8 sm:mb-10">{t.home.videos.heading}</h2>
				<div class="grid gap-8 lg:gap-10 md:grid-cols-2">
					{#each [
						{ eyebrow: 'elmoradarVODs', desc: t.home.videos.vodsDesc, video: vodsVideo, fallback: t.home.videos.vodTitleFallback },
						{ eyebrow: t.home.videos.mainName, desc: t.home.videos.mainDesc, video: mainVideo, fallback: t.home.videos.mainTitleFallback }
					] as card}
						<div class="flex flex-col">
							<p class="eyebrow eyebrow-rule mb-1.5">{card.eyebrow}</p>
							<p class="text-sm sm:text-base text-fg-muted mb-4 md:min-h-12">{card.desc}</p>
							<div class="flex flex-col flex-1 overflow-hidden rounded-xl border border-line bg-surface">
								<div class="aspect-video w-full bg-bg-2">
									{#if !card.video}
										<div class="h-full flex items-center justify-center text-xs font-mono text-fg-subtle">{t.common.loading}</div>
									{:else if $consent === 'accepted'}
										<iframe
											title={card.video.title || card.fallback}
											class="h-full w-full block"
											src={card.video.embedUrl}
											allowfullscreen
										></iframe>
									{:else}
										<div class="h-full flex flex-col items-center justify-center gap-2.5 px-4 text-center">
											<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current text-fg-subtle" aria-hidden="true">
												<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
											</svg>
											<p class="text-xs text-fg-muted leading-relaxed">{t.common.embedOff} {t.common.embedOffHint}</p>
											<button onclick={() => consent.accept()} class="btn btn-secondary !px-3 !py-1.5 text-xs">{t.common.embedEnable}</button>
											<a href={card.video.url} target="_blank" rel="noopener noreferrer" class="text-xs text-fg-subtle hover:text-fg transition-colors">{t.common.watchOnYoutube}</a>
										</div>
									{/if}
								</div>
								<div class="h-24 sm:h-28 px-5 py-4 border-t border-line">
									{#if card.video}
										<p class="text-base sm:text-lg font-medium leading-snug tracking-tight line-clamp-2">{card.video.title}</p>
										<p class="text-xs text-fg-subtle mt-1">{new Date(card.video.publishedAt).toLocaleDateString(i18n.locale, { day: '2-digit', month: 'long', year: 'numeric' })}</p>
									{:else}
										<div class="h-3.5 w-3/4 rounded bg-raised"></div>
										<div class="h-3 w-1/3 rounded bg-raised mt-2.5"></div>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- RIGHT: SIDEBAR -->
			<div class="reveal grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-5 border-t border-line pt-10" use:reveal={{ delay: 120 }}>

				<!-- STATS (desktop only) -->
				<div class="hidden lg:block">
					<h3 class="eyebrow !text-fg mb-3 pb-2 border-b border-line">{t.home.side.numbers}</h3>
					<div class="space-y-1">
						{#each stats as s}
							{@const Icon = s.icon}
							<div class="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-raised transition-colors group">
								<span class="flex items-center gap-2.5 text-sm text-white/45 group-hover:text-white/60 transition-colors">
									<Icon size={14} class="text-fg-subtle" />
									{s.label}
								</span>
								<span class="text-sm font-display font-semibold text-white tabular-nums">{s.value}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- VATSIM NETWORK -->
				{#if onlinePilots > 0}
					<div>
						<h3 class="eyebrow !text-fg mb-3 pb-2 border-b border-line">{t.home.side.network}</h3>
						<div class="space-y-2 text-sm">
							<div class="flex items-center justify-between text-white/45">
								<span class="flex items-center gap-2">
									<Plane size={13} class="text-fg-subtle" />
									{t.home.side.pilots}
								</span>
								<span class="font-medium font-mono text-white/60">{onlinePilots.toLocaleString(i18n.locale)}</span>
							</div>
							<div class="flex items-center justify-between text-white/45">
								<span class="flex items-center gap-2">
									<Users size={13} class="text-fg-subtle" />
									{t.home.side.controllers}
								</span>
								<span class="font-medium font-mono text-white/60">{onlineControllers.toLocaleString(i18n.locale)}</span>
							</div>
						</div>
					</div>
				{/if}

				<!-- RECENT FLIGHT -->
				{#if recentFlightplans.length > 0}
					<div>
						<h3 class="eyebrow !text-fg mb-3 pb-2 border-b border-line">{t.home.side.lastFlight}</h3>
						<div class="space-y-1">
							{#each recentFlightplans as fp}
								<div class="flex items-center gap-2 px-2 py-2.5 rounded-md hover:bg-raised transition-colors text-xs group">
									<Plane size={11} class="text-fg-subtle shrink-0 group-hover:text-fg-subtle transition-colors" />
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
						<h3 class="eyebrow !text-fg mb-3 pb-2 border-b border-line">{t.home.side.lastAtc}</h3>
						<div class="px-2 py-2.5 rounded-md hover:bg-raised transition-colors text-xs group">
							<div class="flex items-center gap-2 mb-1.5">
								<Headphones size={11} class="text-fg-subtle shrink-0 group-hover:text-fg-subtle transition-colors" />
								<span class="font-mono text-white/55 font-medium">{lastAtcSession.callsign}</span>
								{#if lastAtcSession.minutes > 0}
									<span class="ml-auto text-white/25">{Math.round(lastAtcSession.minutes)} {t.home.side.minutes}</span>
								{/if}
							</div>
							{#if lastAtcSession.start}
								<p class="text-white/20 pl-4.75">
									{new Date(lastAtcSession.start).toLocaleDateString(i18n.locale, { day: '2-digit', month: '2-digit', year: 'numeric' })}
									{#if lastAtcSession.end}
										· {new Date(lastAtcSession.start).toLocaleTimeString(i18n.locale, { hour: '2-digit', minute: '2-digit' })} – {new Date(lastAtcSession.end).toLocaleTimeString(i18n.locale, { hour: '2-digit', minute: '2-digit' })} UTC
									{/if}
								</p>
							{/if}
						</div>
					</div>
				{/if}

				<!-- ADDONS LINK -->
				<div>
					<h3 class="eyebrow !text-fg mb-3 pb-2 border-b border-line">{t.home.side.addons}</h3>
					<p class="text-sm text-white/40 mb-3 leading-relaxed">
						{t.home.side.addonsText}
					</p>
					<a
						href={i18n.href('/addons')}
						class="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-accent-hover transition-colors"
					>
						{t.home.side.addonsLink}
						<ArrowRight size={13} class="text-fg-subtle" />
					</a>
				</div>

			</div>
		</div>

		<!-- FLEET TEASER -->
		<section class="reveal border-t border-line py-10 sm:py-14" use:reveal>
			<div class="flex items-end justify-between mb-6 sm:mb-8">
				<div>
					<h2 class="section-title text-2xl mb-2">{t.home.hangar.heading}</h2>
					<p class="text-sm text-white/45">{t.home.hangar.sub}</p>
				</div>
				<a
					href={i18n.href('/addons')}
					class="hidden sm:flex items-center gap-1.5 text-sm text-white/40 hover:text-accent-hover transition-colors shrink-0"
				>
					{t.common.viewAll}
					<ArrowRight size={14} />
				</a>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
				{#each fleetTeaser as plane, i}
					<a
						href={plane.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative rounded-md block {i === 0 ? 'col-span-2 row-span-2' : ''}"
					>
						<div class="rounded-md overflow-hidden border bg-surface h-full flex flex-col transition-colors group-hover:border-accent/60 {i === 0 ? 'border-accent-deep' : 'border-line'}">
							<div class="aspect-video overflow-hidden bg-raised {i === 0 ? 'sm:aspect-auto sm:flex-1' : ''}">
								<img
									src={plane.img}
									alt={plane.name}
									loading="lazy"
									class="w-full h-full object-cover zoom-img"
								/>
							</div>
							<div class="px-3 py-2.5 {i === 0 ? 'sm:px-5 sm:py-4' : ''}">
								{#if i === 0}<p class="eyebrow eyebrow-rule mb-2">{t.home.hangar.main}</p>{/if}
								<p class="font-medium leading-tight text-white/80 group-hover:text-white transition-colors {i === 0 ? 'sm:text-xl tracking-tight' : 'text-xs'}">{plane.name}</p>
							</div>
						</div>
					</a>
				{/each}
				<a href={i18n.href('/addons')} class="hidden sm:flex sm:col-span-2 items-center justify-center gap-2 rounded-md border border-line bg-accent-soft text-sm text-fg hover:border-accent/60 transition-colors">{t.home.hangar.all} <ArrowRight size={14} /></a>
			</div>

			<a
				href={i18n.href('/addons')}
				class="sm:hidden flex items-center justify-center gap-1.5 mt-4 text-sm text-white/40 hover:text-accent-hover transition-colors"
			>
				{t.home.hangar.allMobile}
				<ArrowRight size={14} />
			</a>
		</section>

		<!-- PARTNERS -->
		<section class="reveal band py-10 sm:py-16" use:reveal>
			<div class="mb-7 sm:mb-10">
				<h2 class="section-title text-2xl mb-2">{t.home.partners.heading}</h2>
				<p class="text-sm text-white/45 max-w-lg">{t.home.partners.sub}</p>
			</div>
			<div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
				{#each partners as p}
					<a
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-lg flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 border border-line bg-white/3 hover:bg-raised hover:border-line-strong transition-all group"
					>
						<div class="shrink-0 w-10 sm:w-16 flex items-center justify-center">
							<img src={p.logo} alt={p.name} class="max-h-8 sm:max-h-12 max-w-full w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity" />
						</div>
						<div class="min-w-0">
							<p class="text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">{p.name}</p>
							<p class="text-[10px] sm:text-xs text-fg-subtle mt-0.5 group-hover:text-accent-hover transition-colors hidden sm:block">{t.home.partners.blurbs[p.name]}</p>
						</div>
					</a>
				{/each}
			</div>
		</section>
	</div>
</BasicPage>
