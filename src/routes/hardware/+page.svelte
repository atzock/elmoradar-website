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
	import BasicPage from '$lib/components/basic-page.svelte';

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

<BasicPage>

	<main class="mx-auto max-w-7xl px-6 py-16">

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

</BasicPage>