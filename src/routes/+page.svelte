<script lang="ts">
	import {
		logo,
		elmoFace,
		navigraph,
		aerosoft,
		orbx,
		inibuilds,
		setupImage,
		streamerImage,
		gamesPlanet,
	} from '$lib/assets/index.js';
	import BasicPage from '$lib/components/basic-page.svelte';
	import { onMount } from 'svelte';

	let mobileMenu = $state(false);

	let discordLink = 'https://discord.gg/elmoradar'

	let twitchLive = $state(false);
	let twitchViewers = $state<number | null>(null);
	let twitchTitle = $state('');

	let vatsimConnected = $state(false);
	let vatsimCallsign = $state('');
	let vatsimRoute = $state('');
	let vatsimAltitude = $state('');
	let vatsimMemberId = $state<number | null>(null);
	let onlinePilots = $state<number>(0);
	let onlineControllers = $state<number>(0);

	type RecentVideoItem = {
		videoId: string;
		title: string;
		publishedAt: string;
		embedUrl: string;
		url: string;
	};

	let recentVideos = $state<RecentVideoItem[]>([
		{
			videoId: 'l0k5qLb5RJE',
			title: '',
			publishedAt: '',
			embedUrl: 'https://www.youtube.com/embed/l0k5qLb5RJE',
			url: 'https://www.youtube.com/watch?v=l0k5qLb5RJE'
		},
		{
			videoId: 'l0k5qLb5RJE',
			title: '',
			publishedAt: '',
			embedUrl: 'https://www.youtube.com/embed/l0k5qLb5RJE',
			url: 'https://www.youtube.com/watch?v=l0k5qLb5RJE'
		}
	]);

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
		{ value: '1.8K', label: 'Flugstunden' },
		{ value: '450+', label: 'VATSIM-Flüge' },
		{ value: '75+', label: 'Airports' },
		{ value: 'C1', label: 'VATSIM Rating' }
	];

	const partners = [
		{ name: 'Navigraph', url: 'https://navigraph.com', logo: navigraph },
		{ name: 'Aerosoft', url: 'https://aerosoft.com', logo: aerosoft },
		{ name: 'Orbx', url: 'https://orbxdirect.com', logo: orbx },
		{ name: 'iniBuilds', url: 'https://inibuilds.com/?ref=elmoradar', logo: inibuilds },
		{ name: 'GamesPlanet', url: 'https://de.gamesplanet.com/?ref=elmo', logo: gamesPlanet },
	];

	async function loadStatus() {
		const [twitchRes, vatsimRes, youtubeRes] = await Promise.allSettled([
			fetch('/api/twitch/status'),
			fetch(`/api/vatsim/status?memberId=${HARDCODED_VATSIM_MEMBER_ID}`),
			fetch('/api/youtube/videos?handle=elmoradarVODs')
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
			vatsimMemberId = data.memberId ?? HARDCODED_VATSIM_MEMBER_ID;
			onlinePilots = data.onlinePilots ?? 0;
			onlineControllers = data.onlineControllers ?? 0;

			if (HARDCODED_VATSIM_MEMBER_ID) {
				const flightplanRes = await fetch(`/api/vatsim/member/flightplans?memberId=${HARDCODED_VATSIM_MEMBER_ID}`);
				if (flightplanRes.ok) {
					const flightplanData = await flightplanRes.json();
					recentFlightplans = flightplanData.items ?? [];
				}
			} else {
				recentFlightplans = [];
			}
		}

		if (youtubeRes.status === 'fulfilled' && youtubeRes.value.ok) {
			const data = await youtubeRes.value.json();
			recentVideos = Array.isArray(data.items) && data.items.length > 0 ? data.items.slice(0, 2) : recentVideos;
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
	<div class="px-2 sm:px-6">

		<!-- HERO -->
		<section class="pt-4 pb-12 border-b border-white/[0.07]">
			<div class="flex flex-col sm:flex-row gap-6 items-start">
				<img
					src={elmoFace}
					alt="Elmo"
					class="h-16 rounded-2xl shrink-0"
				/>
				<div class="flex-1 min-w-0">
					<div class="flex flex-wrap items-center gap-3 mb-3">
						<h1 class="text-3xl font-bold tracking-tight">elmoradar</h1>

						{#if twitchLive}
							<a
								href="https://twitch.tv/elmoradar"
								target="_blank"
								class="flex items-center gap-1.5 bg-red-600 px-3 py-1 rounded-full text-xs font-semibold shrink-0 hover:bg-red-500 transition-colors"
							>
								<span class="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
								LIVE{twitchViewers ? ` · ${twitchViewers}` : ''}
							</a>
						{/if}
					</div>

					<p class="text-white/55 text-base leading-relaxed max-w-lg">
						Flugsimulation auf VATSIM, zu viel Kaffee und ein Homesetup, das langsam außer Kontrolle gerät. Ich streame auf Twitch, rede dabei über Dinge, die kein Mensch braucht — und manchmal klappt sogar die Landung.
					</p>

					<div class="flex gap-5 mt-5 text-sm">
						<a href="https://twitch.tv/elmoradar" target="_blank" class="text-white hover:text-red-400 transition-colors">Twitch</a>
						<a href={discordLink} target="_blank" class="text-white/45 hover:text-white transition-colors">Discord</a>
						<a href="/hardware" class="text-white/45 hover:text-white transition-colors">Setup</a>
						<a href="/vatsim" class="text-white/45 hover:text-white transition-colors">VATSIM</a>
					</div>
				</div>
			</div>
		</section>

		<!-- VATSIM LIVE STRIP -->
		{#if vatsimConnected}
			<section class="py-5 border-b border-white/[0.07]">
				<div class="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm">
					<span class="flex items-center gap-2 text-xs text-white/30 uppercase tracking-widest">
						<span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
						Gerade in der Luft
					</span>
					{#if vatsimCallsign}
						<span class="font-mono text-white/80">{vatsimCallsign}</span>
					{/if}
					{#if vatsimRoute && vatsimRoute !== 'N/A'}
						<span class="text-white/40">{vatsimRoute}</span>
					{/if}
					{#if vatsimAltitude && vatsimAltitude !== 'N/A'}
						<span class="text-white/30">{vatsimAltitude}</span>
					{/if}
				</div>
			</section>
		{/if}

		<!-- MAIN CONTENT -->
		<div class="py-12 grid gap-12 lg:grid-cols-[1fr_260px]">

			<!-- LEFT: VIDEOS -->
			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-7">Letzte Flüge</h2>
				<div class="grid gap-8">
					{#each recentVideos as video}
						<div>
							<div class="overflow-hidden rounded-xl">
								<iframe
									title={video.title || 'YouTube Video'}
									class="aspect-video w-full"
									src={video.embedUrl}
									allowfullscreen
								></iframe>
							</div>
							{#if video.title}
								<p class="mt-2 text-sm text-white/40">{video.title}</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- RIGHT: SIDEBAR -->
			<div class="space-y-10">

				<!-- STATS -->
				<div>
					<h3 class="text-xs text-white/30 uppercase tracking-widest mb-5">Zahlen</h3>
					<div class="space-y-3">
						{#each stats as s}
							<div class="flex justify-between text-sm">
								<span class="text-white/45">{s.label}</span>
								<span class="font-semibold text-white">{s.value}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- VATSIM NETWORK -->
				{#if onlinePilots > 0}
					<div>
						<h3 class="text-xs text-white/30 uppercase tracking-widest mb-5">VATSIM Netzwerk</h3>
						<div class="space-y-2 text-sm text-white/45">
							<div>{onlinePilots.toLocaleString('de')} Piloten online</div>
							<div>{onlineControllers.toLocaleString('de')} Controller online</div>
						</div>
					</div>
				{/if}

				<!-- SETUP LINK -->
				<div>
					<h3 class="text-xs text-white/30 uppercase tracking-widest mb-5">Hardware</h3>
					<p class="text-sm text-white/45 mb-3">Dual-Monitor-Setup, irgendwie gewachsen, nie geplant.</p>
					<a href="/hardware" class="text-sm text-white hover:text-red-400 transition-colors">
						Setup ansehen →
					</a>
				</div>

			</div>
		</div>

		<!-- PARTNERS -->
		<section class="border-t border-white/[0.07] py-10">
			<p class="text-xs text-white/25 uppercase tracking-widest mb-7">Partner & Sponsoren</p>
			<div class="flex flex-wrap gap-8 items-center">
				{#each partners as p}
					<a
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						class="opacity-35 hover:opacity-70 transition-opacity"
					>
						<img src={p.logo} alt={p.name} class="h-6" />
					</a>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
