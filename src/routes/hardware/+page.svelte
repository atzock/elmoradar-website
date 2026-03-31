<!-- 
PC:
    AMD Ryzen 7 7800X3D, 8C/16T, 4.20-5.00GHz
    MSI B650 Gaming Plus
    NVIDIA RTX 5090 Zotac
    4x 16GB RAM
    Lexar M.2 2TB
    Samsung 2TB SSD
    ARCTIC P14 Pro Reverse A-RGB Gehäuse-Lüfter
    Thermalright Phantom Spirit 120SE ARGB CPU-Luftkühler,
---
Alles andere:
    4 Monitore (27 Zoll Acer, MSI & 24 Zoll Samsung, Acer)
    Roccat Horde AIMO Tastatur
    Roccat Kone AIMO Maus
    Razer Siren V3 Chroma
    Roccat Syn Pro Air Wireless Headset
    Elgato Wave Mic Arm LP
    Elgato Stream Deck XL
---
FlightSim:
    Thrustmaster TCA Officer Pack + Addon für Flaps und so
    WinCTRL URSA Minor Airline Joystick L
    Logitech G Saitek Pro Flight Rudder Pedals
-->

<!-- bei Hardware vlt auch meine Flight Hardware (WinWing throttle + flaps, WinWing sidestick URSA MINOR L) -->

<script lang="ts">
	import {
		logo
	} from '$lib/assets/index.js';
	import {
		Cpu,
		Gpu,
		MemoryStick,
		Database,
		Fan,
		Monitor,
		Mic,
		Keyboard,
		Mouse,
		Plane,
		Gamepad2
	} from "lucide-svelte";

	let mobileMenu = false;

	const pcSpecs = [
		{ label: 'CPU', value: 'Ryzen 7 7800X3D', icon: Cpu },
		{ label: 'GPU', value: 'RTX 5090 Zotac', icon: Gpu },
		{ label: 'RAM', value: '64GB (4x16GB)', icon: MemoryStick },
		{ label: 'Mainboard', value: 'MSI B650 Gaming Plus', icon: Database },
		{ label: 'Storage', value: '2TB NVMe + 2TB SSD', icon: Database },
		{ label: 'Cooling', value: 'Phantom Spirit 120SE', icon: Fan }
	];

	const setup = [
		{ label: '4 Monitors (27" + 27" + 24" + 24")', icon: Monitor },
		{ label: 'Stream Deck XL', icon: Gamepad2 },
		{ label: 'Razer Siren V3 Chroma', icon: Mic },
		{ label: 'Roccat Horde AIMO', icon: Keyboard },
		{ label: 'Roccat Kone AIMO', icon: Mouse },
		{ label: 'Elgato Mic Arm LP', icon: Mic }
	];

	const flightsim = [
		{ label: 'Thrustmaster TCA Officer Pack', icon: Plane },
		{ label: 'WinWing URSA Minor L', icon: Plane },
		{ label: 'Saitek Rudder Pedals', icon: Plane }
	];
</script>

<div class="min-h-screen bg-[#04070c] text-white overflow-x-hidden selection:bg-red-500/30 relative">

	<!-- BACKGROUND -->
	<div class="fixed inset-0 pointer-events-none">
		<div class="absolute inset-0">
			<div class="radar-sweep"></div>
		</div>

		<div
			class="absolute inset-0 opacity-[0.05]"
			style="
				background-image: 
					linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
					linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
				background-size: 80px 80px;
			"
		></div>

		<div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.12),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.08),transparent_30%)]"></div>
	</div>

	<!-- NAV -->
	<nav class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05080e]/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-3">
				<img src={logo} alt="elmoradar logo" class="h-10 w-10 rounded-xl ring-1 ring-white/10" />
				<div>
					<div class="text-xs uppercase tracking-[0.28em] text-white/45">Air Ops</div>
					<div class="text-lg font-semibold">elmoradar</div>
				</div>
			</a>

			<div class="hidden md:flex gap-8 text-sm text-white/60">
				<a href="/" class="hover:text-white">Overview</a>
				<a href="/hardware" class="hover:text-white">Hardware</a>
				<a href="/vatsim" class="hover:text-white">Vatsim</a>
				<a href="/settings" class="transition hover:text-white">Settings</a>
			</div>

			<a
				href="https://twitch.tv/elmoradar"
				target="_blank"
				class="hidden md:inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
			>
				Open Stream
			</a>

			<button
				class="md:hidden h-11 w-11 rounded-xl border border-white/10 bg-white/5"
				onclick={() => (mobileMenu = !mobileMenu)}
			>
				☰
			</button>
		</div>
	</nav>

	<!-- CONTENT -->
	<main class="relative mx-auto max-w-7xl px-6 pt-32 pb-16">

		<!-- HERO -->
		<section class="mb-14">
			<h1 class="text-5xl font-black tracking-tight">
				Hardware <span class="text-red-400">Hangar</span>
			</h1>
			<p class="mt-4 text-white/60 max-w-2xl">
				My full setup for gaming, streaming and flight simulation.
			</p>
		</section>

		<!-- PC -->
		<section class="mb-14">
			<h2 class="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
				Computer Hardware
			</h2>

			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{#each pcSpecs as item}
					<div class="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
						
						<div class="flex items-center gap-3">
							<div class="p-2 rounded-lg bg-white/5 border border-white/10">
								<svelte:component this={item.icon} size={18} class="text-red-400" />
							</div>

							<div class="text-xs uppercase tracking-[0.25em] text-white/40">
								{item.label}
							</div>
						</div>

						<div class="mt-3 text-lg font-semibold">
							{item.value}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- SETUP -->
		<section class="mb-14">
			<h2 class="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
				Desk Setup
			</h2>

			<div class="grid gap-4">
				{#each setup as item}
					<div class="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.06]">
						<svelte:component this={item.icon} size={18} class="text-white/60" />
						{item.label}
					</div>
				{/each}
			</div>
		</section>

		<!-- FLIGHTSIM -->
		<section>
			<h2 class="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
				Flight Simulation
			</h2>

			<div class="grid gap-4">
				{#each flightsim as item}
					<div class="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl transition hover:border-blue-400/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
						<svelte:component this={item.icon} size={18} class="text-blue-400" />
						{item.label}
					</div>
				{/each}
			</div>
		</section>

	</main>
</div>

<style>
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