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

	let recentVideoUrl1 = $state('https://www.youtube.com/embed/ES-5Mbhwi1g');
	let recentVideoUrl2 = $state('https://www.youtube.com/embed/ES-5Mbhwi1g');

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
	];

	async function loadStatus() {
		const [twitchRes, vatsimRes] = await Promise.allSettled([
			fetch('/api/twitch/status'),
			fetch(`/api/vatsim/status?memberId=${HARDCODED_VATSIM_MEMBER_ID}`),
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
	<section id="top">
		<div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
			<div class="relative overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:p-10">
				<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_24%)]"></div>

				<div class="relative z-10">
					<div class="mb-6 flex flex-wrap items-center gap-4">
						<img
							src={elmoFace}
							alt="Elmo face"
							class="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
						/>
						<div>
							<p class="text-sm uppercase tracking-[0.35em] text-white/35">Offizielle Website</p>
							<h1 class="mt-1 text-5xl font-black tracking-tight md:text-7xl">
								<span class="bg-linear-to-r from-red-500 via-orange-300 to-red-600 bg-clip-text text-transparent">
									elmoradar
								</span>
							</h1>
						</div>
					</div>

					<p class="max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
						Heyyo, ich bin Marvin, 25 Jahre alt, und ich nehme euch überwiegend mit auf meine VATSIM Fluglotsen- und Pilotensessions. <br>Neben VATSIM studiere ich Rechtswissenschaften.
					</p>

					<div class="mt-6 flex flex-wrap gap-3">
						<span class="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-200">
							Fenix A319 / A320 / A321
						</span>
						<span class="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm text-orange-200">
							iniBuilds A350
						</span>
						<span class="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
							VATSIM C1
						</span>
					</div>

					<div class="mt-8 flex flex-wrap gap-4">
						<a
							href="https://twitch.tv/elmoradar"
							target="_blank"
							rel="noreferrer"
							class="rounded-full bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500"
						>
							Watch Live
						</a>
						<a
							href={discordLink}
							target="_blank"
							rel="noreferrer"
							class="rounded-full bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
						>
							Join Discord
						</a>
						<a
							href="https://youtube.com/@elmoradarVODs"
							target="_blank"
							rel="noreferrer"
							class="rounded-full border border-white/12 bg-white/5 px-6 py-3 font-semibold text-white/85 transition hover:border-red-500/40 hover:bg-red-500/10"
						>
							VOD Archive
						</a>
					</div>

					<div class="mt-10 grid gap-4 sm:grid-cols-3">
						<div class="rounded-2xl border border-white/10 bg-black/25 p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/35">Twitch</div>
							<div class="mt-2 flex items-center gap-2">
								<span class={`h-2.5 w-2.5 rounded-full ${twitchLive ? 'bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]' : 'bg-white/20'}`}></span>
								<div class="text-sm font-medium">{twitchTitle}</div>
							</div>
						</div>

						<div class="rounded-2xl border border-white/10 bg-black/25 p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/35">VATSIM</div>
							<div class="mt-2 text-sm font-medium">{vatsimConnected ? 'Connected' : 'Offline'}</div>
						</div>

						<div class="rounded-2xl border border-white/10 bg-black/25 p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/35">Current Route</div>
							<div class="mt-2 text-sm font-medium">{vatsimRoute}</div>
						</div>
					</div>
				</div>
			</div>

			<div class="grid gap-6">
				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<div class="mb-4 flex items-center justify-between">
						<div>
							<p class="text-xs uppercase tracking-[0.25em] text-white/35">Live Ops</p>
							<h2 class="mt-2 text-2xl font-semibold">Aktueller Status</h2>
						</div>
						<div class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
							{vatsimConnected ? 'ACTIVE' : 'STANDBY'}
						</div>
					</div>

					<div class="grid gap-3">
						<div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
							<span class="text-white/45">Callsign</span>
							<span class="font-medium">{vatsimCallsign}</span>
						</div>
						<div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
							<span class="text-white/45">Route</span>
							<span class="font-medium">{vatsimRoute}</span>
						</div>
						<div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
							<span class="text-white/45">Cruise</span>
							<span class="font-medium">{vatsimAltitude}</span>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<div class="mb-5">
						<p class="text-xs uppercase tracking-[0.25em] text-white/35">Flight Record</p>
						<h2 class="mt-2 text-2xl font-semibold">Pilot Profile</h2>
					</div>

					<div class="grid grid-cols-2 gap-4">
						{#each stats as s}
							<div class="rounded-2xl border border-white/10 bg-black/25 p-4">
								<div class="text-3xl font-bold text-red-400">{s.value}</div>
								<div class="mt-1 text-sm text-white/50">{s.label}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="setup" class="px-6 py-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-8">
				<p class="text-xs uppercase tracking-[0.25em] text-white/35">Studio</p>
				<h2 class="mt-2 text-3xl font-semibold">Streaming Setup</h2>
			</div>

			<div class="mb-8">
				<a href="/hardware" class="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/20">
					Zur Hardware
				</a>
			</div>

			<div class="grid gap-6 lg:grid-cols-2">
				
				<!-- SETUP IMAGE -->
				<div class="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/4">
					<img
						src={setupImage}
						alt="Streaming Setup"
						class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
					/>

					<!-- overlay -->
					<div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

					<div class="absolute bottom-4 left-4 right-4">
						<div class="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/40">
								Command Center
							</div>
							<div class="text-lg font-semibold">
								Dual Monitor + Streaming Setup
							</div>
						</div>
					</div>
				</div>

				<!-- FACE CAM IMAGE -->
				<div class="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/4">
					<img
						src={streamerImage}
						alt="Streamer"
						class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
					/>

					<!-- overlay -->
					<div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

					<div class="absolute bottom-4 left-4 right-4">
						<div class="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
							<div class="text-xs uppercase tracking-[0.25em] text-white/40">
								Operator
							</div>
							<div class="text-lg font-semibold">
								Live ATC & Pilot Sessions
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</section>
	
	<section id="partners" class="px-6 py-8 pb-20">
		<div class="mx-auto max-w-7xl">
			<div class="mb-8">
				<p class="text-xs uppercase tracking-[0.25em] text-white/35">Network</p>
				<h2 class="mt-2 text-3xl font-semibold">Partners & Airlines</h2>
			</div>

			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each partners as p}
					<a
						href={p.url}
						target="_blank"
						rel="noreferrer"
						class="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/4 p-6 transition hover:border-red-500/35 hover:-translate-y-1"
					>
						<div class="flex items-center gap-4">
							<div class="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
								<img src={p.logo} alt={p.name + ' logo'} class="h-12 w-12 rounded-full object-contain transition group-hover:scale-110" />
							</div>

							<div>
								<div class="text-lg font-semibold">{p.name}</div>
								<div class="text-sm text-white/45">Zum Partner</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section id="overview" class="px-6 py-8">
		<div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
			<div id="ops" class="grid gap-6">
				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<p class="text-xs uppercase tracking-[0.25em] text-white/35">Archive</p>
					<h2 class="mt-2 text-3xl font-semibold">Recent Flights</h2>

					<div class="mt-6 grid gap-4">
						<div class="overflow-hidden rounded-2xl border border-white/10">
							<iframe
								title="Recent flight 1"
								class="aspect-video w-full"
								src={recentVideoUrl1}
								allowfullscreen
							></iframe>
						</div>

						<div class="overflow-hidden rounded-2xl border border-white/10">
							<iframe
								title="Recent flight 2"
								class="aspect-video w-full"
								src={recentVideoUrl2}
								allowfullscreen
							></iframe>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</section>

	<footer class="border-t border-white/10 bg-black/30 px-6 py-8">
		<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-white/40 md:flex-row md:text-left">
			<div class="flex items-center gap-3">
				<img src={logo} alt="elmoradar logo" class="h-9 w-9 rounded-xl ring-1 ring-white/10" />
				<div>
					<div class="font-medium text-white/70">elmoradar</div>
					<div>Air Ops Center</div>
				</div>
			</div>

			<div>
				<div>Made by atzock</div>
				<div>© 2026 elmoradar. All rights reserved.</div>
			</div>
		</div>
	</footer>
</BasicPage>
<style>
	@keyframes dash {
		from {
			stroke-dashoffset: 0;
		}
		to {
			stroke-dashoffset: -220;
		}
	}

	@keyframes routeFloat {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.radar-sweep {
		position: absolute;
		width: 200%;
		height: 200%;
		top: -50%;
		left: -50%;
		background: conic-gradient(
			from 0deg,
			transparent 0deg,
			rgba(255, 0, 0, 0.08) 20deg,
			transparent 60deg
		);
		animation: radarRotate 8s linear infinite;
	}

	@keyframes radarRotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>