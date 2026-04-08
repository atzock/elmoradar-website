<script lang="ts">
	import {
		elmoFace,
		navigraph,
		aerosoft,
		orbx,
		inibuilds,
		gamesPlanet,
	} from '$lib/assets/index.js';
	import BasicPage from '$lib/components/basic-page.svelte';
	import { onMount } from 'svelte';
	import Plane from 'lucide-svelte/icons/plane';
	import Users from 'lucide-svelte/icons/users';
	import Clock from 'lucide-svelte/icons/clock';
	import Award from 'lucide-svelte/icons/award';
	import Map from 'lucide-svelte/icons/map';
	import Radio from 'lucide-svelte/icons/radio';

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

	let recentFlightplans = $state<FlightplanItem[]>([]);
	const HARDCODED_VATSIM_MEMBER_ID = 1411028;

	const stats = [
		{ value: '1.8K', label: 'Flugstunden', icon: Clock },
		{ value: '450+', label: 'VATSIM-Flüge', icon: Plane },
		{ value: '75+', label: 'Airports', icon: Map },
		{ value: 'C1', label: 'VATSIM Rating', icon: Award }
	];

	const partners = [
		{ name: 'Navigraph', url: 'https://navigraph.com', logo: navigraph },
		{ name: 'Aerosoft', url: 'https://aerosoft.com', logo: aerosoft },
		{ name: 'Orbx', url: 'https://orbxdirect.com', logo: orbx },
		{ name: 'iniBuilds', url: 'https://inibuilds.com/?ref=elmoradar', logo: inibuilds },
		{ name: 'GamesPlanet', url: 'https://de.gamesplanet.com/?ref=elmo', logo: gamesPlanet }
	];

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

			if (HARDCODED_VATSIM_MEMBER_ID) {
				const flightplanRes = await fetch(
					`/api/vatsim/member/flightplans?memberId=${HARDCODED_VATSIM_MEMBER_ID}`
				);
				if (flightplanRes.ok) {
					const flightplanData = await flightplanRes.json();
					recentFlightplans = flightplanData.items ?? [];
				}
			} else {
				recentFlightplans = [];
			}
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
		setInterval(loadStatus, 30000);
	});
</script>

<svelte:head>
	<title>elmoradar - Marvin</title>
	<meta
		name="description"
		content="Flugsimulation, VATSIM und zu viel Kaffee — elmoradar auf Twitch."
	/>
</svelte:head>

<BasicPage>
	<div class="px-1 sm:px-0">

		<!-- HERO -->
		<section class="pt-2 pb-8 sm:pb-10 border-b border-white/6">

			<!-- Twitch live banner -->
			{#if twitchLive}
				<a
					href="https://twitch.tv/elmoradar"
					target="_blank"
					class="flex items-center gap-2.5 mb-6 px-4 py-3 rounded-xl bg-red-600/10 border border-red-500/20 hover:bg-red-600/15 transition-colors group"
				>
					<span class="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
					<span class="text-sm text-red-400 font-medium shrink-0">Gerade live</span>
					{#if twitchViewers}
						<span class="text-sm text-white/40 shrink-0">· {twitchViewers}</span>
					{/if}
					{#if twitchTitle}
						<span class="text-sm text-white/30 truncate hidden sm:block">— {twitchTitle}</span>
					{/if}
					<span class="ml-auto text-red-500/60 text-xs group-hover:text-red-400 transition-colors shrink-0">Ansehen →</span>
				</a>
			{/if}

			<div class="flex gap-4 sm:gap-6 items-start">
				<img
					src={elmoFace}
					alt="Elmo"
					class="h-16 sm:h-20 rounded-2xl shrink-0 ring-1 ring-white/10"
				/>
				<div class="flex-1 min-w-0">
					<h1 class="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-3">elmoradar</h1>

					<p class="text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-xl mb-4 sm:mb-5">
						Flugsimulation auf VATSIM, zu viel Kaffee und ein Homesetup, das langsam außer Kontrolle
						gerät. Ich streame auf Twitch — und manchmal klappt sogar die Landung.
					</p>

					<div class="flex flex-wrap gap-2 sm:gap-3 text-sm">
						<a
							href="https://twitch.tv/elmoradar"
							target="_blank"
							class="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-white/6 hover:bg-white/10 border border-white/8 text-white transition-colors"
						>
							<Radio size={14} class="text-red-400" />
							Twitch
						</a>
						<a
							href={discordLink}
							target="_blank"
							class="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/6 text-white/60 hover:text-white transition-colors"
						>
							Discord
						</a>
						<a
							href="/hardware"
							class="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/6 text-white/60 hover:text-white transition-colors"
						>
							Setup
						</a>
						<a
							href="/vatsim"
							class="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/6 text-white/60 hover:text-white transition-colors"
						>
							VATSIM
						</a>
					</div>
				</div>
			</div>

			<!-- VATSIM live strip -->
			{#if vatsimConnected}
				<div class="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 rounded-xl bg-green-500/6 border border-green-500/20 text-sm">
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
							<p class="text-xs text-white/35 mt-0.5">Alle vergangenen Streams ungeschnitten — hier der letzte Stream:</p>
						</div>
						{#if vodsVideo}
							<div class="rounded-xl overflow-hidden border border-white/[0.07] bg-white/2">
								<iframe
									title={vodsVideo.title || 'YouTube VOD'}
									class="aspect-video w-full block"
									src={vodsVideo.embedUrl}
									allowfullscreen
								></iframe>
								{#if vodsVideo.title}
									<div class="px-4 py-3">
										<p class="text-sm text-white/45 truncate">{vodsVideo.title}</p>
									</div>
								{/if}
							</div>
						{:else}
							<div class="aspect-video rounded-xl border border-white/[0.07] bg-white/2 flex items-center justify-center">
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
							<div class="rounded-xl overflow-hidden border border-white/[0.07] bg-white/2">
								<iframe
									title={mainVideo.title || 'YouTube Video'}
									class="aspect-video w-full block"
									src={mainVideo.embedUrl}
									allowfullscreen
								></iframe>
								{#if mainVideo.title}
									<div class="px-4 py-3">
										<p class="text-sm text-white/45 truncate">{mainVideo.title}</p>
									</div>
								{/if}
							</div>
						{:else}
							<div class="aspect-video rounded-xl border border-white/[0.07] bg-white/2 flex items-center justify-center">
								<span class="text-xs text-white/20">Wird geladen…</span>
							</div>
						{/if}
					</div>

				</div>
			</div>

			<!-- RIGHT: SIDEBAR -->
			<div class="space-y-9">

				<!-- STATS (desktop only — mobile shows strip above) -->
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

				<!-- HARDWARE LINK -->
				<div>
					<h3 class="text-xs text-white/30 uppercase tracking-widest mb-4">Hardware</h3>
					<p class="text-sm text-white/40 mb-3 leading-relaxed">
						Quad-Monitor-Setup, irgendwie gewachsen, nie geplant.
					</p>
					<a
						href="/hardware"
						class="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
					>
						Setup ansehen
						<span class="text-white/30">→</span>
					</a>
				</div>

			</div>
		</div>

		<!-- PARTNERS -->
		<section class="border-t border-white/6 py-10 sm:py-16">
			<div class="mb-7 sm:mb-10">
				<h2 class="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">Partner & Sponsoren</h2>
				<p class="text-sm text-white/45 max-w-lg">Diese Unternehmen machen elmoradar möglich — von Navdaten über Airports bis hin zu Spielen.</p>
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
