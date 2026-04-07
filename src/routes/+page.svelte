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

		if (youtubeRes.status === 'fulfilled' && youtubeRes.value.ok) {
			const data = await youtubeRes.value.json();
			recentVideos =
				Array.isArray(data.items) && data.items.length > 0
					? data.items.slice(0, 2)
					: recentVideos;
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
	<div class="px-2 sm:px-0">

		<!-- HERO -->
		<section class="pt-2 pb-10 border-b border-white/6">

			<!-- Twitch live banner -->
			{#if twitchLive}
				<a
					href="https://twitch.tv/elmoradar"
					target="_blank"
					class="flex items-center gap-3 mb-8 px-4 py-3 rounded-xl bg-red-600/10 border border-red-500/20 hover:bg-red-600/15 transition-colors group"
				>
					<span class="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
					<span class="text-sm text-red-400 font-medium">Gerade live auf Twitch</span>
					{#if twitchViewers}
						<span class="text-sm text-white/40">· {twitchViewers} Zuschauer</span>
					{/if}
					{#if twitchTitle}
						<span class="text-sm text-white/30 truncate hidden sm:block">— {twitchTitle}</span>
					{/if}
					<span class="ml-auto text-red-500/60 text-xs group-hover:text-red-400 transition-colors">Jetzt ansehen →</span>
				</a>
			{/if}

			<div class="flex flex-col sm:flex-row gap-6 items-start">
				<img
					src={elmoFace}
					alt="Elmo"
					class="h-20 rounded-2xl shrink-0 ring-1 ring-white/10"
				/>
				<div class="flex-1 min-w-0">
					<h1 class="text-3xl font-bold tracking-tight mb-3">elmoradar</h1>

					<p class="text-white/50 text-[15px] leading-relaxed max-w-xl mb-5">
						Flugsimulation auf VATSIM, zu viel Kaffee und ein Homesetup, das langsam außer Kontrolle
						gerät. Ich streame auf Twitch, rede dabei über Dinge, die kein Mensch braucht — und
						manchmal klappt sogar die Landung.
					</p>

					<div class="flex flex-wrap gap-3 text-sm">
						<a
							href="https://twitch.tv/elmoradar"
							target="_blank"
							class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/6 hover:bg-white/10 border border-white/8 text-white transition-colors"
						>
							<Radio size={14} class="text-red-400" />
							Twitch
						</a>
						<a
							href={discordLink}
							target="_blank"
							class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/6 text-white/60 hover:text-white transition-colors"
						>
							Discord
						</a>
						<a
							href="/hardware"
							class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/6 text-white/60 hover:text-white transition-colors"
						>
							Setup
						</a>
						<a
							href="/vatsim"
							class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/6 text-white/60 hover:text-white transition-colors"
						>
							VATSIM
						</a>
					</div>
				</div>
			</div>

			<!-- VATSIM live strip -->
			{#if vatsimConnected}
				<div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 rounded-xl bg-green-500/6 border border-green-500/20 text-sm">
					<span class="flex items-center gap-2 text-green-400/80">
						<span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
						<Plane size={13} />
						Gerade in der Luft
					</span>
					{#if vatsimCallsign}
						<span class="font-mono text-white/80 font-medium">{vatsimCallsign}</span>
					{/if}
					{#if vatsimRoute && vatsimRoute !== 'N/A'}
						<span class="text-white/40">{vatsimRoute}</span>
					{/if}
					{#if vatsimAltitude && vatsimAltitude !== 'N/A'}
						<span class="text-white/30">{vatsimAltitude}</span>
					{/if}
				</div>
			{/if}
		</section>

		<!-- MAIN GRID -->
		<div class="py-12 grid gap-12 lg:grid-cols-[1fr_240px]">

			<!-- LEFT: VIDEOS -->
			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-6">Letzte Flüge</h2>
				<div class="grid gap-6">
					{#each recentVideos as video}
						<div class="rounded-xl overflow-hidden border border-white/[0.07] bg-white/2">
							<iframe
								title={video.title || 'YouTube Video'}
								class="aspect-video w-full block"
								src={video.embedUrl}
								allowfullscreen
							></iframe>
							{#if video.title}
								<div class="px-4 py-3">
									<p class="text-sm text-white/45 truncate">{video.title}</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- RECENT FLIGHT PLANS -->
				{#if recentFlightplans.length > 0}
					<div class="mt-10">
						<h2 class="text-xs text-white/30 uppercase tracking-widest mb-5">Letzte Flugpläne</h2>
						<div class="rounded-xl border border-white/[0.07] overflow-hidden">
							{#each recentFlightplans.slice(0, 5) as fp, i}
								<div class="flex items-center gap-4 px-4 py-3 text-sm {i > 0 ? 'border-t border-white/5' : ''}">
									<span class="font-mono text-white/70 font-medium w-24 shrink-0">{fp.callsign}</span>
									{#if fp.dep && fp.arr}
										<span class="text-white/40">{fp.dep} → {fp.arr}</span>
									{/if}
									{#if fp.aircraft}
										<span class="ml-auto text-white/25 text-xs shrink-0">{fp.aircraft}</span>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- RIGHT: SIDEBAR -->
			<div class="space-y-9">

				<!-- STATS -->
				<div>
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
						Dual-Monitor-Setup, irgendwie gewachsen, nie geplant.
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
		<section class="border-t border-white/6 py-10">
			<p class="text-xs text-white/20 uppercase tracking-widest mb-7">Partner & Sponsoren</p>
			<div class="flex flex-wrap gap-8 items-center">
				{#each partners as p}
					<a
						href={p.url}
						target="_blank"
						rel="noopener noreferrer"
						class="opacity-30 hover:opacity-60 transition-opacity"
					>
						<img src={p.logo} alt={p.name} class="h-6" />
					</a>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
