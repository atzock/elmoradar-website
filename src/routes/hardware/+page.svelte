<!--
PC:
    AMD Ryzen 7 7800X3D · MSI B650 Gaming Plus · NVIDIA RTX 5090 Zotac
    64 GB DDR5 · Lexar 2 TB M.2 · Samsung 2 TB SSD · Thermalright Phantom Spirit 120SE
Desk:
    4× Monitor · Elgato Stream Deck XL · Razer Siren V3 Chroma
    Roccat Horde AIMO · Roccat Kone AIMO · Roccat Syn Pro Air · Elgato Wave Mic Arm LP
FlightSim:
    WinWing URSA Minor Airline L · WinCTRL Throttle Pack · Logitech G Saitek Rudder Pedals
-->

<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';

	import Cpu        from 'lucide-svelte/icons/cpu';
	import Gpu        from 'lucide-svelte/icons/gpu';
	import MemoryStick from 'lucide-svelte/icons/memory-stick';
	import CircuitBoard from 'lucide-svelte/icons/circuit-board';
	import HardDrive  from 'lucide-svelte/icons/hard-drive';
	import Fan        from 'lucide-svelte/icons/fan';
	import Monitor    from 'lucide-svelte/icons/monitor';
	import Gamepad2   from 'lucide-svelte/icons/gamepad-2';
	import Mic        from 'lucide-svelte/icons/mic';
	import Keyboard   from 'lucide-svelte/icons/keyboard';
	import Mouse      from 'lucide-svelte/icons/mouse';
	import Headphones from 'lucide-svelte/icons/headphones';
	import Plane      from 'lucide-svelte/icons/plane';
	import Joystick   from 'lucide-svelte/icons/joystick';
	import Gauge      from 'lucide-svelte/icons/gauge';
	import Settings   from 'lucide-svelte/icons/settings-2';
	import Zap        from 'lucide-svelte/icons/zap';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type Icon = any;

	type ColoredItem = {
		label: string;
		value: string;
		icon: Icon;
		gradient: string;
		iconColor: string;
	};

	const featured: ColoredItem[] = [
		{
			label: 'CPU',
			value: 'AMD Ryzen 7 7800X3D',
			icon: Cpu,
			gradient: 'from-red-500/20 via-orange-500/10 to-transparent border-red-500/20',
			iconColor: 'text-red-400 bg-red-500/15 border-red-500/20'
		},
		{
			label: 'GPU',
			value: 'NVIDIA RTX 5090 Zotac',
			icon: Gpu,
			gradient: 'from-green-500/20 via-emerald-500/10 to-transparent border-green-500/20',
			iconColor: 'text-green-400 bg-green-500/15 border-green-500/20'
		}
	];

	const pcComponents: ColoredItem[] = [
		{
			label: 'RAM',
			value: '64 GB DDR5 (4×16 GB)',
			icon: MemoryStick,
			gradient: 'from-blue-500/15 to-transparent border-blue-500/15',
			iconColor: 'text-blue-400 bg-blue-500/15 border-blue-500/20'
		},
		{
			label: 'Mainboard',
			value: 'MSI B650 Gaming Plus',
			icon: CircuitBoard,
			gradient: 'from-violet-500/15 to-transparent border-violet-500/15',
			iconColor: 'text-violet-400 bg-violet-500/15 border-violet-500/20'
		},
		{
			label: 'NVMe',
			value: 'Lexar 2 TB M.2',
			icon: HardDrive,
			gradient: 'from-cyan-500/15 to-transparent border-cyan-500/15',
			iconColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20'
		},
		{
			label: 'SSD',
			value: 'Samsung 2 TB',
			icon: HardDrive,
			gradient: 'from-sky-500/15 to-transparent border-sky-500/15',
			iconColor: 'text-sky-400 bg-sky-500/15 border-sky-500/20'
		},
		{
			label: 'Kühler',
			value: 'Thermalright Phantom Spirit 120SE',
			icon: Fan,
			gradient: 'from-teal-500/15 to-transparent border-teal-500/15',
			iconColor: 'text-teal-400 bg-teal-500/15 border-teal-500/20'
		}
	];

	const desk: ColoredItem[] = [
		{
			label: '4× Monitor',
			value: '27" Acer + 27" MSI + 24" Samsung + 24" Acer',
			icon: Monitor,
			gradient: 'from-indigo-500/15 to-transparent border-indigo-500/15',
			iconColor: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/20'
		},
		{
			label: 'Stream Deck',
			value: 'Elgato Stream Deck XL',
			icon: Gamepad2,
			gradient: 'from-amber-500/15 to-transparent border-amber-500/15',
			iconColor: 'text-amber-400 bg-amber-500/15 border-amber-500/20'
		},
		{
			label: 'Mikrofon',
			value: 'Razer Siren V3 Chroma',
			icon: Mic,
			gradient: 'from-green-500/15 to-transparent border-green-500/15',
			iconColor: 'text-green-400 bg-green-500/15 border-green-500/20'
		},
		{
			label: 'Mic Arm',
			value: 'Elgato Wave Mic Arm LP',
			icon: Mic,
			gradient: 'from-amber-500/15 to-transparent border-amber-500/15',
			iconColor: 'text-amber-400 bg-amber-500/15 border-amber-500/20'
		},
		{
			label: 'Tastatur',
			value: 'Roccat Horde AIMO',
			icon: Keyboard,
			gradient: 'from-cyan-500/15 to-transparent border-cyan-500/15',
			iconColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20'
		},
		{
			label: 'Maus',
			value: 'Roccat Kone AIMO',
			icon: Mouse,
			gradient: 'from-cyan-500/15 to-transparent border-cyan-500/15',
			iconColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20'
		},
		{
			label: 'Headset',
			value: 'Roccat Syn Pro Air Wireless',
			icon: Headphones,
			gradient: 'from-purple-500/15 to-transparent border-purple-500/15',
			iconColor: 'text-purple-400 bg-purple-500/15 border-purple-500/20'
		}
	];

	type SimItem = {
		label: string;
		value: string;
		sub: string;
		icon: Icon;
		gradient: string;
		iconColor: string;
		badge: string;
	};

	const flightsim: SimItem[] = [
		{
			label: 'Sidestick',
			value: 'WinWing URSA Minor Airline L',
			sub: 'Präziser Side-Stick für Airliner',
			icon: Joystick,
			gradient: 'from-sky-500/20 via-blue-500/10 to-transparent border-sky-500/25',
			iconColor: 'text-sky-300 bg-sky-500/20 border-sky-500/25',
			badge: 'bg-sky-500/15 text-sky-300 border-sky-500/25'
		},
		{
			label: 'Throttle + Flaps',
			value: 'WinCTRL Throttle Pack',
			sub: 'Throttle & Flaps in einem Pack',
			icon: Gauge,
			gradient: 'from-orange-500/20 via-amber-500/10 to-transparent border-orange-500/25',
			iconColor: 'text-orange-300 bg-orange-500/20 border-orange-500/25',
			badge: 'bg-orange-500/15 text-orange-300 border-orange-500/25'
		},
		{
			label: 'Rudder Pedals',
			value: 'Logitech G Saitek Pro Flight',
			sub: 'Rudder Pedals mit Bremsachse',
			icon: Plane,
			gradient: 'from-indigo-500/20 via-violet-500/10 to-transparent border-indigo-500/25',
			iconColor: 'text-indigo-300 bg-indigo-500/20 border-indigo-500/25',
			badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25'
		}
	];

	// Settings value color coding
	function valueColor(v: string): string {
		switch (v) {
			case 'Ultra':   return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
			case 'Hoch':    return 'text-green-400 bg-green-500/10 border-green-500/20';
			case 'Mittel':  return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
			case 'Niedrig': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
			case 'Aus':     return 'text-red-400/80 bg-red-500/8 border-red-500/15';
			case 'An':      return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
			default:        return 'text-white/70 bg-white/5 border-white/10';
		}
	}

	const general = [
		{ label: 'Auflösung', value: '2560×1440' },
		{ label: 'Anti-Aliasing', value: 'TAA' },
		{ label: 'Render Scaling', value: '100' },
		{ label: 'DLSS Frame Generation', value: 'An' },
		{ label: 'Max FPS', value: '60' },
		{ label: 'NVIDIA Reflex', value: 'An' }
	];

	const traffic = [
		{ label: 'Flugzeug-Traffic', value: 'Aus' },
		{ label: 'Bodenfahrzeuge', value: 'Mittel' },
		{ label: 'Straßenverkehr', value: 'Hoch' },
		{ label: 'Schiffe', value: 'Ultra' },
		{ label: 'Fauna', value: 'Niedrig' }
	];

	const graphics = [
		{ label: 'Terrain LOD', value: 'Dynamic (170 → 300)' },
		{ label: 'Object LOD', value: '140' },
		{ label: 'Gebäude', value: 'Ultra' },
		{ label: 'Bäume', value: 'Ultra' },
		{ label: 'Gras', value: 'Ultra' },
		{ label: 'Wolken', value: 'Ultra' },
		{ label: 'Texturen', value: 'Ultra' }
	];

	const autofps = [
		{ label: 'Modus', value: 'Auto TLOD' },
		{ label: 'TLOD am Boden', value: '170' },
		{ label: 'TLOD Reiseflug', value: '300' },
		{ label: 'OLOD Basis', value: '140' },
		{ label: 'OLOD ab 10.000 ft', value: '130' }
	];

	type Section = {
		title: string;
		note?: string;
		accent: string;
		items: { label: string; value: string }[];
	};

	const msfsSettings: Section[] = [
		{
			title: 'Allgemein',
			accent: 'border-t-blue-500/50',
			items: general
		},
		{
			title: 'Traffic & Umgebung',
			accent: 'border-t-green-500/50',
			items: traffic
		},
		{
			title: 'Grafik',
			accent: 'border-t-violet-500/50',
			items: graphics
		},
		{
			title: 'AutoFPS',
			accent: 'border-t-orange-500/50',
			note: 'AutoFPS passt den Terrain LOD dynamisch je nach Flughöhe an — weniger Detail am Boden für Performance, mehr in der Luft für Optik.',
			items: autofps
		}
	];
</script>

<svelte:head>
	<title>Hardware & Settings – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-6">

		<!-- ── HEADER ─────────────────────────────────────────────── -->
		<section class="relative pt-6 pb-14 border-b border-white/[0.07] overflow-hidden">
			<!-- Background glow blobs -->
			<div class="pointer-events-none absolute inset-0">
				<div class="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-red-500/8 blur-3xl"></div>
				<div class="absolute top-0 right-0 w-56 h-56 rounded-full bg-blue-500/8 blur-3xl"></div>
			</div>
			<div class="relative">
				<div class="flex items-center gap-2 mb-4">
					<span class="text-[10px] uppercase tracking-[0.3em] text-white/30">elmoradar</span>
					<span class="h-px flex-1 max-w-[40px] bg-white/10"></span>
					<span class="text-[10px] uppercase tracking-[0.3em] text-white/15">v2025</span>
				</div>
				<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
					Hardware
					<span class="text-white/20">&</span>
					<span class="bg-gradient-to-r from-red-400 via-orange-300 to-amber-300 bg-clip-text text-transparent">Settings</span>
				</h1>
				<p class="text-white/45 text-base max-w-lg leading-relaxed">
					Das Setup, das sich über Jahre angesammelt hat — und die MSFS-Einstellungen, die dabei entstanden sind.
					Nichts geplant, alles irgendwie passiert.
				</p>
			</div>
		</section>

		<!-- ── RECHNER ────────────────────────────────────────────── -->
		<section class="py-14 border-b border-white/[0.07]">
			<div class="flex items-center gap-3 mb-8">
				<div class="h-px flex-1 max-w-8 bg-white/10"></div>
				<h2 class="text-[11px] text-white/35 uppercase tracking-[0.25em]">Rechner</h2>
				<div class="h-px flex-1 bg-white/5"></div>
			</div>

			<!-- CPU + GPU Hero -->
			<div class="grid sm:grid-cols-2 gap-4 mb-8">
				{#each featured as item}
					<div class="relative overflow-hidden rounded-2xl border bg-gradient-to-br {item.gradient} p-6">
						<div class="absolute top-3 right-4 text-[9px] uppercase tracking-[0.3em] text-white/15">{item.label}</div>
						<div class="flex items-center gap-4">
							<div class="p-3.5 rounded-2xl border {item.iconColor} shrink-0">
								<item.icon size={24} />
							</div>
							<div>
								<div class="text-xs text-white/35 mb-1 uppercase tracking-widest">{item.label}</div>
								<div class="text-lg font-bold text-white leading-tight">{item.value}</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Rest PC as colored cards grid -->
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
				{#each pcComponents as item}
					<div class="group relative overflow-hidden rounded-xl border bg-gradient-to-b {item.gradient} px-4 py-4 hover:scale-[1.02] transition-transform">
						<div class="p-2 rounded-lg border {item.iconColor} inline-flex mb-3">
							<item.icon size={14} />
						</div>
						<div class="text-[10px] text-white/30 uppercase tracking-wider mb-1">{item.label}</div>
						<div class="text-sm text-white/85 font-medium leading-snug">{item.value}</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ── SCHREIBTISCH ───────────────────────────────────────── -->
		<section class="py-14 border-b border-white/[0.07]">
			<div class="flex items-center gap-3 mb-8">
				<div class="h-px flex-1 max-w-8 bg-white/10"></div>
				<h2 class="text-[11px] text-white/35 uppercase tracking-[0.25em]">Schreibtisch</h2>
				<div class="h-px flex-1 bg-white/5"></div>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
				{#each desk as item}
					<div class="group relative overflow-hidden rounded-xl border bg-gradient-to-b {item.gradient} px-4 py-4 hover:scale-[1.02] transition-transform">
						<div class="p-2 rounded-lg border {item.iconColor} inline-flex mb-3">
							<item.icon size={14} />
						</div>
						<div class="text-[10px] text-white/30 uppercase tracking-wider mb-1">{item.label}</div>
						<div class="text-sm text-white/85 font-medium leading-snug">{item.value}</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ── FLUGSIMULATION ─────────────────────────────────────── -->
		<section class="py-14 border-b border-white/[0.07]">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-px flex-1 max-w-8 bg-white/10"></div>
				<h2 class="text-[11px] text-white/35 uppercase tracking-[0.25em]">Flugsimulation</h2>
				<div class="h-px flex-1 bg-white/5"></div>
			</div>
			<p class="text-white/35 text-sm mb-8 pl-1">Die Hardware, die zwischen mir und dem Himmel steht.</p>

			<div class="grid sm:grid-cols-3 gap-5">
				{#each flightsim as item}
					<div class="relative overflow-hidden rounded-2xl border bg-gradient-to-br {item.gradient} p-6 group hover:scale-[1.01] transition-transform">
						<div class="flex items-start justify-between mb-4">
							<div class="p-3 rounded-xl border {item.iconColor}">
								<item.icon size={20} />
							</div>
							<span class="text-[10px] uppercase tracking-widest border rounded-md px-2 py-1 {item.badge}">
								{item.label}
							</span>
						</div>
						<div class="text-base font-semibold text-white mb-1 leading-snug">{item.value}</div>
						<div class="text-xs text-white/35">{item.sub}</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ── MSFS SETTINGS ──────────────────────────────────────── -->
		<section class="py-14">
			<div class="flex items-center gap-3 mb-3">
				<div class="h-px flex-1 max-w-8 bg-white/10"></div>
				<div class="flex items-center gap-2">
					<Zap size={12} class="text-yellow-400/60" />
					<h2 class="text-[11px] text-white/35 uppercase tracking-[0.25em]">MSFS Settings</h2>
				</div>
				<div class="h-px flex-1 bg-white/5"></div>
			</div>
			<p class="text-white/35 text-sm mb-10 pl-1 max-w-md">
				Optimiert für VATSIM und Streaming auf der RTX 5090. Als Referenz — nicht blind kopieren.
			</p>

			<div class="grid gap-5 sm:grid-cols-2">
				{#each msfsSettings as section}
					<div class="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden border-t-2 {section.accent}">
						<div class="px-5 pt-5 pb-4">
							<div class="flex items-center gap-2 mb-4">
								<Settings size={12} class="text-white/25" />
								<h3 class="text-[11px] text-white/40 uppercase tracking-widest">{section.title}</h3>
							</div>
							<div class="space-y-0">
								{#each section.items as item}
									<div class="flex justify-between items-center py-2.5 border-b border-white/5 last:border-b-0 text-sm gap-3">
										<span class="text-white/45 shrink-0">{item.label}</span>
										<span class="text-[11px] font-semibold px-2 py-0.5 rounded-md border {valueColor(item.value)} shrink-0">
											{item.value}
										</span>
									</div>
								{/each}
							</div>
						</div>
						{#if section.note}
							<div class="px-5 py-3 bg-white/[0.02] border-t border-white/5">
								<p class="text-xs text-white/25 leading-relaxed">{section.note}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
