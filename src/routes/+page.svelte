<script lang="ts">
	import {
		logo,
		elmoFace,
		navigraph,
		aerosoft,
		orbx,
		nordfly,
		hec,
		munichairways
	} from '$lib/assets/index.js';
	import { onMount } from 'svelte';

	let mobileMenu = $state(false);

	let twitchLive = $state(false);
	let twitchViewers = $state<number | null>(null);
	let twitchTitle = $state('Offline');

	let vatsimConnected = $state(true);
	let vatsimCallsign = $state('N/A');
	let vatsimRoute = $state('EDDB → LOWW');
	let vatsimAltitude = $state('FL360');
	let vatsimMemberId = $state<number | null>(null);
	let onlinePilots = $state<number>(0);
	let onlineControllers = $state<number>(0);

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

	const hardware = [
		{ title: 'CPU', value: 'Ryzen 7 7800X3D', desc: '8C / 16T' },
		{ title: 'GPU', value: 'RTX 4070', desc: 'DLSS + Raytracing' },
		{ title: 'RAM', value: '64GB DDR5', desc: '4x16GB DDR5' },
		{ title: 'Storage', value: '2TB NVMe + 2TB SSD', desc: 'Fast scenery loading' },
		{ title: 'Cooling', value: 'Pure Rock 2', desc: 'Silent air cooling' },
		{ title: 'Mainboard', value: 'MSI B650', desc: 'AM5 platform' }
	];

	const partners = [
		{ name: 'Navigraph', url: 'https://navigraph.com', logo: navigraph },
		{ name: 'Aerosoft', url: 'https://aerosoft.com', logo: aerosoft },
		{ name: 'Orbx', url: 'https://orbxdirect.com', logo: orbx },
		{ name: 'Nordfly', url: 'https://www.nordfly-vag.com', logo: nordfly },
		{ name: 'Hermann Cargo', url: 'https://newsky.app/airline/HEC/info', logo: hec },
		{ name: 'Munich Airways', url: 'https://muenchen-airways.com', logo: munichairways }
	];

	const departures = [
		{ time: '18:05', flight: 'ELM101', route: 'Berlin → Vienna', status: 'BOARDING' },
		{ time: '19:20', flight: 'ELM248', route: 'Berlin → Zurich', status: 'ON TIME' },
		{ time: '20:00', flight: 'ELM814', route: 'Berlin → Amsterdam', status: 'FINAL FILED' },
		{ time: '21:10', flight: 'ELM672', route: 'Berlin → Copenhagen', status: 'PREPARING' },
		{ time: '22:35', flight: 'ELM999', route: 'Berlin → London', status: 'SCHEDULED' }
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
	<title>elmoradar — Air Ops Center</title>
	<meta
		name="description"
		content="Live aviation command center for elmoradar — VATSIM, hardware and community."
	/>
</svelte:head>

<div class="min-h-screen bg-[#04070c] text-white overflow-x-hidden selection:bg-red-500/30">
	<div class="fixed inset-0 pointer-events-none">
		<div class="absolute inset-0 pointer-events-none">
			<div class="radar-sweep"></div>
		</div>
	</div>

	<nav class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05080e]/80 backdrop-blur-xl">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="#top" class="flex items-center gap-3">
				<img src={logo} alt="elmoradar logo" class="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10" />
				<div>
					<div class="text-sm uppercase tracking-[0.28em] text-white/45">Air Ops</div>
					<div class="text-lg font-semibold">elmoradar</div>
				</div>
			</a>

			<div class="hidden items-center gap-8 text-sm text-white/60 md:flex">
				<a href="#overview" class="transition hover:text-white">Overview</a>
				<a href="#hardware" class="transition hover:text-white">Hardware</a>
				<a href="#partners" class="transition hover:text-white">Partners</a>
			</div>

			<div class="hidden md:flex items-center gap-3">
				<div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">
					<span class={`h-2.5 w-2.5 rounded-full ${twitchLive ? 'bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.95)]' : 'bg-white/25'}`}></span>
					<span class="text-white/75">
						{#if twitchLive}
							LIVE{#if twitchViewers !== null} · {twitchViewers} viewers{/if}
						{:else}
							TWITCH OFFLINE
						{/if}
					</span>
				</div>

				<a
					href="https://twitch.tv/elmoradar"
					target="_blank"
					rel="noreferrer"
					class="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-500"
				>
					Open Stream
				</a>
			</div>

			<button
				class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
				onclick={() => (mobileMenu = !mobileMenu)}
				aria-label="Toggle menu"
			>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
					<path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
				</svg>
			</button>
		</div>

		{#if mobileMenu}
			<div class="border-t border-white/10 bg-[#060a12]/95 px-6 py-5 md:hidden">
				<div class="flex flex-col gap-4 text-sm text-white/70">
					<a href="#overview" onclick={() => (mobileMenu = false)}>Overview</a>
					<a href="#hardware" onclick={() => (mobileMenu = false)}>Hardware</a>
					<a href="#partners" onclick={() => (mobileMenu = false)}>Partners</a>
				</div>
			</div>
		{/if}
	</nav>

	<section id="top" class="relative px-6 pt-32 pb-16 md:pt-36">
		<div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
			<div class="relative overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:p-10">
				<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_24%)]"></div>

				<div class="relative z-10">
					<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-red-300">
						<span class="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]"></span>
						Air Operations Center
					</div>

					<div class="mb-6 flex flex-wrap items-center gap-4">
						<img
							src={elmoFace}
							alt="Elmo face"
							class="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/10 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
						/>
						<div>
							<p class="text-sm uppercase tracking-[0.35em] text-white/35">Official Website</p>
							<h1 class="mt-1 text-5xl font-black tracking-tight md:text-7xl">
								<span class="bg-linear-to-r from-red-500 via-orange-300 to-red-600 bg-clip-text text-transparent">
									elmoradar
								</span>
							</h1>
						</div>
					</div>

					<p class="max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
						A live aviation dashboard for realistic ops in Microsoft Flight Simulator,
						VATSIM procedures, route planning, departures and community flights.
					</p>

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
							href="https://youtube.com/@elmoradarVODs"
							target="_blank"
							rel="noreferrer"
							class="rounded-full border border-white/12 bg-white/5 px-6 py-3 font-semibold text-white/85 transition hover:border-red-500/40 hover:bg-red-500/10"
						>
							Open VOD Archive
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
							<h2 class="mt-2 text-2xl font-semibold">Current Session</h2>
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

	<section id="overview" class="px-6 py-8">
		<div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
			<div id="ops" class="grid gap-6">
				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<p class="text-xs uppercase tracking-[0.25em] text-white/35">Network API</p>
					<h2 class="mt-2 text-3xl font-semibold">Live Network</h2>

					<div class="mt-6 grid grid-cols-2 gap-3">
						<div class="rounded-2xl border border-white/10 bg-black/25 p-4">
							<div class="text-xs uppercase tracking-[0.2em] text-white/45">Pilots</div>
							<div class="mt-2 text-2xl font-semibold text-red-300">{onlinePilots}</div>
						</div>
						<div class="rounded-2xl border border-white/10 bg-black/25 p-4">
							<div class="text-xs uppercase tracking-[0.2em] text-white/45">Controllers</div>
							<div class="mt-2 text-2xl font-semibold text-blue-300">{onlineControllers}</div>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<p class="text-xs uppercase tracking-[0.25em] text-white/35">Live Signal</p>
					<h2 class="mt-2 text-3xl font-semibold">Twitch Status</h2>

					<div class="mt-6 rounded-3xl border border-white/10 bg-black/30 p-5">
						<div class="flex items-center justify-between gap-4">
							<div class="flex items-center gap-3">
								<span class={`h-3 w-3 rounded-full ${twitchLive ? 'bg-red-500 shadow-[0_0_18px_rgba(239,68,68,1)]' : 'bg-white/20'}`}></span>
								<div>
									<div class="font-semibold">{twitchLive ? 'Currently live' : 'Currently offline'}</div>
									<div class="text-sm text-white/45">{twitchTitle}</div>
								</div>
							</div>
							{#if twitchViewers !== null}
								<div class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
									{twitchViewers} viewers
								</div>
							{/if}
						</div>

						<a
							href="https://twitch.tv/elmoradar"
							target="_blank"
							rel="noreferrer"
							class="mt-5 inline-flex rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-purple-500"
						>
							Open Twitch
						</a>
					</div>
				</div>

				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<p class="text-xs uppercase tracking-[0.25em] text-white/35">Core API</p>
					<h2 class="mt-2 text-3xl font-semibold">Recent Flightplans</h2>

					<div class="mt-6 grid gap-3">
						{#if recentFlightplans.length > 0}
							{#each recentFlightplans.slice(0, 4) as fp}
								<div class="rounded-2xl border border-white/10 bg-black/25 p-4">
									<div class="text-sm font-semibold">{fp.callsign}</div>
									<div class="mt-1 text-sm text-white/60">{fp.dep ?? '????'} → {fp.arr ?? '????'} · {fp.aircraft ?? 'N/A'}</div>
								</div>
							{/each}
						{:else}
							<div class="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/60">
								No recent flightplans available yet.
							</div>
						{/if}
					</div>
				</div>

				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<p class="text-xs uppercase tracking-[0.25em] text-white/35">Profile</p>
					<h2 class="mt-2 text-3xl font-semibold">About the Pilot</h2>

					<p class="mt-5 leading-7 text-white/65">
						elmoradar focuses on realistic airline ops, VATSIM procedures, approach work,
						European routes and long-haul sessions with a strong aviation-first identity.
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
				</div>

				<div class="overflow-hidden rounded-4xl border border-white/10 bg-white/4 p-6">
					<p class="text-xs uppercase tracking-[0.25em] text-white/35">Archive</p>
					<h2 class="mt-2 text-3xl font-semibold">Recent Flights</h2>

					<div class="mt-6 grid gap-4">
						<div class="overflow-hidden rounded-2xl border border-white/10">
							<iframe
								title="Recent flight 1"
								class="aspect-video w-full"
								src="https://www.youtube.com/embed/O-wnGXWXwY0"
								allowfullscreen
							></iframe>
						</div>

						<div class="overflow-hidden rounded-2xl border border-white/10">
							<iframe
								title="Recent flight 2"
								class="aspect-video w-full"
								src="https://www.youtube.com/embed/-ZV9TUgVJto"
								allowfullscreen
							></iframe>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</section>

	<section id="hardware" class="px-6 py-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-8">
				<p class="text-xs uppercase tracking-[0.25em] text-white/35">System Profile</p>
				<h2 class="mt-2 text-3xl font-semibold">Flight Deck Hardware</h2>
			</div>

			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each hardware as h}
					<div class="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/4 p-6 transition hover:border-red-500/35 hover:bg-white/6">
						<div class="mb-6 flex items-center justify-between">
							<div class="text-xs uppercase tracking-[0.25em] text-white/35">{h.title}</div>
							<div class="h-10 w-10 rounded-xl border border-white/10 bg-black/25"></div>
						</div>

						<div class="text-2xl font-semibold">{h.value}</div>
						<div class="mt-2 text-white/50">{h.desc}</div>

						<div class="mt-6 h-px w-full bg-linear-to-r from-red-500/0 via-red-500/40 to-red-500/0"></div>
					</div>
				{/each}
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
								<div class="text-sm text-white/45">Open Partner</div>
							</div>
						</div>
					</a>
				{/each}
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
				<div>© 2025 elmoradar. All rights reserved.</div>
			</div>
		</div>
	</footer>
</div>

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