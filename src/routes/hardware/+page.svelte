<!--
PC:
    AMD Ryzen 7 7800X3D, 8C/16T, 4.20-5.00GHz
    MSI B650 Gaming Plus
    NVIDIA RTX 5090 Zotac
    4x 16GB RAM
    Lexar M.2 2TB
    Samsung 2TB SSD
    Thermalright Phantom Spirit 120SE ARGB CPU-Luftkühler
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
    WinWing URSA Minor Airline Joystick L
    Logitech G Saitek Pro Flight Rudder Pedals
-->

<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';

	import Cpu from 'lucide-svelte/icons/cpu';
	import Gpu from 'lucide-svelte/icons/gpu';
	import MemoryStick from 'lucide-svelte/icons/memory-stick';
	import CircuitBoard from 'lucide-svelte/icons/circuit-board';
	import HardDrive from 'lucide-svelte/icons/hard-drive';
	import Fan from 'lucide-svelte/icons/fan';
	import Monitor from 'lucide-svelte/icons/monitor';
	import Gamepad2 from 'lucide-svelte/icons/gamepad-2';
	import Mic from 'lucide-svelte/icons/mic';
	import Keyboard from 'lucide-svelte/icons/keyboard';
	import Mouse from 'lucide-svelte/icons/mouse';
	import Headphones from 'lucide-svelte/icons/headphones';
	import Plane from 'lucide-svelte/icons/plane';

	import type { Component } from 'svelte';

	type Item = { label: string; value: string; icon: Component<{ size?: number; class?: string }> };

	const featured: Item[] = [
		{ label: 'CPU', value: 'AMD Ryzen 7 7800X3D', icon: Cpu },
		{ label: 'GPU', value: 'NVIDIA RTX 5090 Zotac', icon: Gpu }
	];

	const pcRest: Item[] = [
		{ label: 'RAM', value: '64 GB DDR5 (4×16 GB)', icon: MemoryStick },
		{ label: 'Mainboard', value: 'MSI B650 Gaming Plus', icon: CircuitBoard },
		{ label: 'NVMe', value: 'Lexar 2 TB M.2', icon: HardDrive },
		{ label: 'SSD', value: 'Samsung 2 TB', icon: HardDrive },
		{ label: 'Kühler', value: 'Thermalright Phantom Spirit 120SE', icon: Fan }
	];

	const desk: Item[] = [
		{ label: '4× Monitor', value: '27" Acer + 27" MSI + 24" Samsung + 24" Acer', icon: Monitor },
		{ label: 'Stream Deck', value: 'Elgato Stream Deck XL', icon: Gamepad2 },
		{ label: 'Mikrofon', value: 'Razer Siren V3 Chroma', icon: Mic },
		{ label: 'Mic Arm', value: 'Elgato Wave Mic Arm LP', icon: Mic },
		{ label: 'Tastatur', value: 'Roccat Horde AIMO', icon: Keyboard },
		{ label: 'Maus', value: 'Roccat Kone AIMO', icon: Mouse },
		{ label: 'Headset', value: 'Roccat Syn Pro Air Wireless', icon: Headphones }
	];

	const flightsim: Item[] = [
		{ label: 'Throttle', value: 'Thrustmaster TCA Officer Pack Airbus Edition', icon: Plane },
		{ label: 'Add-on', value: 'Thrustmaster TCA Quadrant Add-on (Flaps & Co.)', icon: Plane },
		{ label: 'Sidestick', value: 'WinWing URSA Minor Airline L', icon: Plane },
		{ label: 'Pedale', value: 'Logitech G Saitek Pro Flight Rudder Pedals', icon: Plane }
	];
</script>

<svelte:head>
	<title>Hardware – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-6">

		<!-- HEADER -->
		<section class="pt-4 pb-12 border-b border-white/[0.07]">
			<h1 class="text-3xl font-bold tracking-tight mb-3">Hardware</h1>
			<p class="text-white/50 text-base max-w-lg">
				Das Setup, das sich über Jahre angesammelt hat. Nichts geplant, alles irgendwie passiert.
			</p>
		</section>

		<!-- PC: FEATURED (CPU + GPU) -->
		<section class="py-12 border-b border-white/[0.07]">
			<h2 class="text-xs text-white/30 uppercase tracking-widest mb-7">Rechner</h2>

			<div class="grid sm:grid-cols-2 gap-4 mb-8">
				{#each featured as item}
					<div class="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/3 p-5">
						<div class="mt-0.5 p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
							<item.icon size={20} class="text-red-400" />
						</div>
						<div>
							<div class="text-xs text-white/35 uppercase tracking-widest mb-1">{item.label}</div>
							<div class="font-semibold text-white">{item.value}</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="space-y-0 max-w-xl">
				{#each pcRest as item}
					<div class="flex items-center gap-3 py-3 border-b border-white/[0.07] text-sm">
						<item.icon size={14} class="text-white/25 shrink-0" />
						<span class="text-white/40 w-28 shrink-0">{item.label}</span>
						<span class="text-white/75">{item.value}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- DESK SETUP -->
		<section class="py-12 border-b border-white/[0.07]">
			<h2 class="text-xs text-white/30 uppercase tracking-widest mb-7">Schreibtisch</h2>

			<div class="grid sm:grid-cols-2 gap-x-12 gap-y-0 max-w-3xl">
				{#each desk as item}
					<div class="flex items-center gap-3 py-3 border-b border-white/[0.07] text-sm">
						<item.icon size={14} class="text-white/25 shrink-0" />
						<span class="text-white/40 w-24 shrink-0">{item.label}</span>
						<span class="text-white/75">{item.value}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- FLIGHT SIM -->
		<section class="py-12">
			<h2 class="text-xs text-white/30 uppercase tracking-widest mb-7">Flugsimulation</h2>

			<div class="grid sm:grid-cols-2 gap-4 max-w-3xl">
				{#each flightsim as item}
					<div class="flex items-start gap-3 rounded-xl border border-white/8 bg-white/2 px-4 py-3 text-sm">
						<item.icon size={14} class="text-white/30 shrink-0 mt-0.5" />
						<div>
							<div class="text-white/35 text-xs mb-0.5">{item.label}</div>
							<div class="text-white/75">{item.value}</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
