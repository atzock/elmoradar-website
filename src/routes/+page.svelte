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
	let twitchTitle = $state('Offline');

	let vatsimConnected = $state(true);
	let vatsimCallsign = $state('N/A');
	let vatsimRoute = $state('N/A');
	let vatsimAltitude = $state('N/A');
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
			title: 'Recent flight 1',
			publishedAt: '',
			embedUrl: 'https://www.youtube.com/embed/l0k5qLb5RJE',
			url: 'https://www.youtube.com/watch?v=l0k5qLb5RJE'
		},
		{
			videoId: 'l0k5qLb5RJE',
			title: 'Recent flight 2',
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
		{ value: '1.8K', label: 'Flight Hours' },
		{ value: '450+', label: 'VATSIM Flights' },
		{ value: '75+', label: 'Airports Visited' },
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
			twitchTitle = data.title ?? 'Offline';
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
		content="Live aviation command center for elmoradar — VATSIM, hardware and community."
	/>
</svelte:head>

<BasicPage>
	<section class="px-6 py-10">
		<div class="mx-auto max-w-7xl">

			<!-- HEADER / IDENTITY -->
			<div class="mb-10 flex items-center justify-between">
				<div class="flex items-center gap-4">
					<img
						src={elmoFace}
						alt="Elmo"
						class="h-14 w-14 rounded-xl ring-1 ring-white/10"
					/>
					<div>
						<h1 class="text-3xl font-semibold tracking-tight">
							elmoradar
						</h1>
						<p class="text-sm text-white/40">
							Air Operations Center
						</p>
					</div>
				</div>

				<div class="flex gap-3">
					<a href="https://twitch.tv/elmoradar" target="_blank"
						class="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500">
						Live
					</a>
					<a href={discordLink} target="_blank"
						class="rounded-xl bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20">
						Discord
					</a>
				</div>
			</div>

			<!-- MAIN GRID -->
			<div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

				<!-- LEFT: CORE PANEL -->
				<div class="grid gap-6">

					<!-- STATUS BAR -->
					<div class="grid grid-cols-3 gap-4">
						<div class="rounded-2xl border border-white/10 bg-black/30 p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/40">
								Twitch
							</div>
							<div class="mt-2 flex items-center gap-2 text-sm">
								<span class={`h-2 w-2 rounded-full ${twitchLive ? 'bg-red-500' : 'bg-white/20'}`}></span>
								{twitchTitle}
							</div>
						</div>

						<div class="rounded-2xl border border-white/10 bg-black/30 p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/40">
								VATSIM
							</div>
							<div class="mt-2 text-sm">
								{vatsimConnected ? 'Connected' : 'Offline'}
							</div>
						</div>

						<div class="rounded-2xl border border-white/10 bg-black/30 p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/40">
								Route
							</div>
							<div class="mt-2 text-sm">
								{vatsimRoute}
							</div>
						</div>
					</div>

					<!-- LIVE OPS PANEL -->
					<div class="rounded-3xl border border-white/10 bg-white/5 p-6">
						<div class="mb-6 flex items-center justify-between">
							<h2 class="text-xl font-semibold">Live Operations</h2>
							<span class="text-xs text-white/40">
								{vatsimConnected ? 'ACTIVE' : 'STANDBY'}
							</span>
						</div>

						<div class="grid gap-3">
							<div class="flex justify-between text-sm">
								<span class="text-white/40">Callsign</span>
								<span>{vatsimCallsign}</span>
							</div>

							<div class="flex justify-between text-sm">
								<span class="text-white/40">Route</span>
								<span>{vatsimRoute}</span>
							</div>

							<div class="flex justify-between text-sm">
								<span class="text-white/40">Cruise</span>
								<span>{vatsimAltitude}</span>
							</div>
						</div>
					</div>

					<!-- VIDEOS -->
					<div class="rounded-3xl border border-white/10 bg-white/5 p-6">
						<h2 class="mb-4 text-xl font-semibold">Recent Flights</h2>

						<div class="grid gap-4">
							{#each recentVideos as video}
								<div class="overflow-hidden rounded-xl border border-white/10">
									<iframe
										title={video.title}
										class="aspect-video w-full"
										src={video.embedUrl}
										allowfullscreen
									></iframe>
								</div>
							{/each}
						</div>
					</div>

				</div>

				<!-- RIGHT: SIDE INFO -->
				<div class="grid gap-6">

					<!-- PROFILE -->
					<div class="rounded-3xl border border-white/10 bg-white/5 p-6">
						<h2 class="mb-4 text-xl font-semibold">Pilot Profile</h2>

						<div class="grid grid-cols-2 gap-4">
							{#each stats as s}
								<div class="rounded-xl border border-white/10 bg-black/30 p-4">
									<div class="text-lg font-semibold text-red-400">
										{s.value}
									</div>
									<div class="text-xs text-white/40">
										{s.label}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- SETUP -->
					<div class="rounded-3xl border border-white/10 bg-white/5 p-6">
						<h2 class="mb-4 text-xl font-semibold">Setup</h2>

						<div class="space-y-4 text-sm text-white/60">
							<p>Dual Monitor Streaming Setup</p>
							<p>ATC + Pilot Operations</p>

							<a href="/hardware"
								class="inline-block text-red-400 hover:underline">
								View Hardware →
							</a>
						</div>
					</div>

				</div>

			</div>
		</div>
	</section>
</BasicPage>