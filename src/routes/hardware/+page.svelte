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
	import { glow } from '$lib/glow.js';

	import {
		peiker1,
		peiker2,
		pc1,
		pc2,
	} from '$lib/assets/index.js';

	import Cpu          from 'lucide-svelte/icons/cpu';
	import Gpu          from 'lucide-svelte/icons/gpu';
	import MemoryStick  from 'lucide-svelte/icons/memory-stick';
	import CircuitBoard from 'lucide-svelte/icons/circuit-board';
	import HardDrive    from 'lucide-svelte/icons/hard-drive';
	import Fan          from 'lucide-svelte/icons/fan';
	import Monitor      from 'lucide-svelte/icons/monitor';
	import Gamepad2     from 'lucide-svelte/icons/gamepad-2';
	import Mic          from 'lucide-svelte/icons/mic';
	import Keyboard     from 'lucide-svelte/icons/keyboard';
	import Mouse        from 'lucide-svelte/icons/mouse';
	import Headphones   from 'lucide-svelte/icons/headphones';
	import Plane        from 'lucide-svelte/icons/plane';
	import Joystick     from 'lucide-svelte/icons/joystick';
	import Gauge        from 'lucide-svelte/icons/gauge';
	import Settings     from 'lucide-svelte/icons/settings-2';
	import Zap          from 'lucide-svelte/icons/zap';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import Info from 'lucide-svelte/icons/info';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type Icon = any;

	// Replace with your actual Amazon affiliate tag
	const AMZN_TAG = 'elmoradar';
	function amzn(asin: string) {
		// return `https://www.amazon.de/dp/${asin}?tag=${AMZN_TAG}`;
		return `https://www.amazon.de/dp/${asin}`;
	}
	function amznSearch(q: string) {
		// return `https://www.amazon.de/s?k=${encodeURIComponent(q)}&tag=${AMZN_TAG}`;
		return `https://www.amazon.de/s?k=${encodeURIComponent(q)}`;
	}

	// Hero cards — CPU + GPU
	const featured = [
		{
			label: 'CPU',
			value: 'AMD Ryzen 7 7800X3D',
			note: '3D V-Cache macht MSFS deutlich flüssiger.',
			icon: Cpu,
			gradient: 'from-[#9147ff]/20 via-violet-500/10 to-transparent border-[#9147ff]/20',
			iconColor: 'text-[#b580ff] bg-[#9147ff]/15 border-[#9147ff]/20',
			url: amzn('B0BTZB7F88')
		},
		{
			label: 'GPU',
			value: 'NVIDIA RTX 5090 Zotac',
			note: 'Mit DLSS 4 + Multi Frame Generation sind sogar deutlich höhere FPS möglich.',
			icon: Gpu,
			gradient: 'from-green-500/20 via-emerald-500/10 to-transparent border-green-500/20',
			iconColor: 'text-green-400 bg-green-500/15 border-green-500/20',
			url: amznSearch('Zotac RTX 5090')
		}
	];

	// Spec list items — shown as a clean table, not individual cards
	const specs: { icon: Icon; iconColor: string; label: string; value: string; url?: string }[] = [
		{
			icon: MemoryStick,
			iconColor: 'text-blue-400',
			label: 'RAM',
			value: '64 GB DDR5 (4×16 GB)',
			url: amznSearch('64GB DDR5 Kit')
		},
		{
			icon: CircuitBoard,
			iconColor: 'text-violet-400',
			label: 'Mainboard',
			value: 'MSI B650 Gaming Plus',
			url: amzn('B0BG7D96MW')
		},
		{
			icon: HardDrive,
			iconColor: 'text-cyan-400',
			label: 'NVMe',
			value: '2 x Lexar 2 TB M.2',
			url: amznSearch('Lexar 2TB NVMe M.2')
		},
		{
			icon: HardDrive,
			iconColor: 'text-sky-400',
			label: 'SSD',
			value: 'Samsung 2 TB',
			url: amznSearch('Samsung 870 EVO 2TB')
		},
		{
			icon: Fan,
			iconColor: 'text-teal-400',
			label: 'Kühler',
			value: 'Thermalright Phantom Spirit 120SE',
			url: amznSearch('Thermalright Phantom Spirit 120 SE')
		}
	];

	// Desk — grouped to break monotony
	type DeskGroup = { heading: string; items: { icon: Icon; label: string; value: string; url?: string }[] };

	const deskGroups: DeskGroup[] = [
		{
			heading: 'Monitore',
			items: [
				{ icon: Monitor, label: 'Haupt',      value: '27" MSI MAG274QRF (1440p / 165 Hz)', url: amznSearch('MSI MAG274QRF') },
				{ icon: Monitor, label: '2. Monitor', value: '27" Acer (1080p)' },
				{ icon: Monitor, label: '3. Monitor', value: 'Samsung S22D300H (22", nicht mehr erhältlich)' },
				{ icon: Monitor, label: '4. Monitor', value: 'Acer (22")' }
			]
		},
		{
			heading: 'Audio & Streaming',
			items: [
				{ icon: Mic,     label: 'Mikrofon', value: 'Razer Siren V3 Chroma',        url: amznSearch('Razer Siren V3 Chroma') },
				{ icon: Mic,     label: 'Mic Arm',  value: 'Elgato Wave Mic Arm LP',       url: amznSearch('Elgato Wave Mic Arm LP') },
				{ icon: Gamepad2,label: 'Stream Deck', value: 'Elgato Stream Deck XL',    url: amzn('B07MFCJYQH') }
			]
		},
		{
			heading: 'Peripherie',
			items: [
				{ icon: Keyboard,  label: 'Tastatur', value: 'Roccat Horde AIMO',          url: amznSearch('Roccat Horde AIMO') },
				{ icon: Mouse,     label: 'Maus',     value: 'Roccat Kone AIMO',           url: amznSearch('Roccat Kone AIMO') },
				{ icon: Headphones,label: 'Headset',  value: 'Roccat Syn Pro Air Wireless',url: amznSearch('Roccat Syn Pro Air') }
			]
		}
	];

	// Flight sim hardware — the stars of the show
	const flightsim = [
		{
			label: 'Sidestick',
			value: 'WinCTRL URSA Minor L',
			note: 'Side-Stick-Format, spezifisch für Airliner gebaut. Kein Kompromiss.',
			icon: Joystick,
			gradient: 'from-sky-500/20 via-blue-500/10 to-transparent border-sky-500/25',
			iconColor: 'text-sky-300 bg-sky-500/20 border-sky-500/25',
			badge: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
			url: 'https://eu.winctrl.com/view/goods-details.html?id=556'
		},
		{
			label: 'Throttle',
			value: 'WinCTRL Throttle Pack',
			note: 'Throttle & Flap-Lever in einem — passt perfekt zum URSA Minor.',
			icon: Gauge,
			gradient: 'from-orange-500/20 via-amber-500/10 to-transparent border-orange-500/25',
			iconColor: 'text-orange-300 bg-orange-500/20 border-orange-500/25',
			badge: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
			url: 'https://eu.winctrl.com/view/goods-details.html?id=1665'
		},
		{
			label: 'Rudder',
			value: 'Logitech G Saitek Pro Flight',
			note: 'Bewährt und günstig. Rudder Pedals mit Bremse — tut was er soll.',
			icon: Plane,
			gradient: 'from-indigo-500/20 via-violet-500/10 to-transparent border-indigo-500/25',
			iconColor: 'text-indigo-300 bg-indigo-500/20 border-indigo-500/25',
			badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
			url: amznSearch('Logitech Saitek Pro Flight Rudder Pedals')
		}
	];

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

	const msfsSettings = [
		{
			title: 'Allgemein',
			accent: 'border-t-blue-500/50',
			items: [
				{ label: 'Auflösung',          value: '2560×1440' },
				{ label: 'Anti-Aliasing',       value: 'TAA' },
				{ label: 'Render Scaling',      value: '100' },
				{ label: 'DLSS Frame Gen',      value: 'An' },
				{ label: 'Max FPS',             value: '60' },
				{ label: 'NVIDIA Reflex',       value: 'An' }
			]
		},
		{
			title: 'Traffic & Umgebung',
			accent: 'border-t-green-500/50',
			items: [
				{ label: 'Flugzeug-Traffic',   value: 'Aus' },
				{ label: 'Bodenfahrzeuge',     value: 'Mittel' },
				{ label: 'Straßenverkehr',     value: 'Hoch' },
				{ label: 'Schiffe',            value: 'Ultra' },
				{ label: 'Fauna',              value: 'Niedrig' }
			]
		},
		{
			title: 'Grafik',
			accent: 'border-t-violet-500/50',
			note: 'Terrain LOD & Object LOD: Diese Werte sind irrelevant, da sie automatisch durch AutoFPS gesteuert werden.',
			items: [
				{ label: 'Terrain LOD',  value: 'Dynamic (170 → 300)' },
				{ label: 'Object LOD',   value: '140' },
				{ label: 'Gebäude',      value: 'Ultra' },
				{ label: 'Bäume',        value: 'Ultra' },
				{ label: 'Gras',         value: 'Ultra' },
				{ label: 'Wolken',       value: 'Ultra' },
				{ label: 'Texturen',     value: 'Ultra' }
			]
		},
		{
			title: 'AutoFPS',
			accent: 'border-t-orange-500/50',
			note: 'AutoFPS passt den Terrain LOD dynamisch je nach Flughöhe an — weniger Detail am Boden für Performance, mehr in der Luft für Optik.',
			items: [
				{ label: 'Modus',              value: 'Auto TLOD' },
				{ label: 'TLOD am Boden',      value: '170' },
				{ label: 'TLOD Reiseflug',     value: '300' },
				{ label: 'OLOD Basis',         value: '140' },
				{ label: 'OLOD ab 10.000 ft',  value: '130' }
			]
		}
	];
</script>

<svelte:head>
	<title>Hardware & Settings – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-4">

		<!-- ── HEADER ────────────────────────────────────────────── -->
		<section class="relative pt-8 pb-12 border-b border-white/[0.07] overflow-hidden">
			<div class="relative max-w-2xl">
				<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
					Hardware<span class="text-white/20"> & </span><span class="bg-linear-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">Settings</span>
				</h1>
				<p class="text-white/50 text-base leading-relaxed mb-4">
					Das Setup, das sich über Jahre angesammelt hat. Nichts davon war geplant - CPU hier, GPU
					dort, irgendwann stand ein vierter Monitor auf dem Schreibtisch. Jetzt läuft's.
				</p>
				<!-- <p class="text-white/25 text-sm">
					Affiliate-Links zu Amazon - kostet euch nichts extra, hilft mir beim Weiterfliegen.
				</p> -->
			</div>
		</section>

		<!-- ── RECHNER ───────────────────────────────────────────── -->
		<section class="py-12 border-b border-white/[0.07]">
			<h2 class="text-sm font-semibold text-white/60 mb-1">Rechner</h2>
			<p class="text-xs text-white/30 mb-8">Der Kern von allem.</p>

			<!-- CPU + GPU hero -->
			<div class="grid sm:grid-cols-2 gap-4 mb-6">
				{#each featured as item}
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						class="glow-card group relative rounded-2xl block hover:scale-[1.01] transition-transform"
						use:glow
					>
						<span class="glow-border" aria-hidden="true"></span>
						<div class="overflow-hidden rounded-2xl border bg-linear-to-br {item.gradient} p-6">
							<div class="flex items-start gap-4">
								<div class="p-3.5 rounded-2xl border {item.iconColor} shrink-0">
									<item.icon size={22} />
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-center justify-between gap-2 mb-1">
										<span class="text-[10px] text-white/30 uppercase tracking-widest">{item.label}</span>
										<ArrowUpRight size={13} class="text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
									</div>
									<div class="text-lg font-bold text-white leading-tight mb-1">{item.value}</div>
									<div class="text-xs text-white/35 leading-snug">{item.note}</div>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>

			<!-- Remaining specs as a clean list -->
			<div class="rounded-xl border border-white/8 overflow-hidden divide-y divide-white/5">
				{#each specs as s}
					{#if s.url}
						<a
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors group"
						>
							<s.icon size={14} class="{s.iconColor} shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
							<span class="text-xs text-white/35 w-20 shrink-0">{s.label}</span>
							<span class="text-sm text-white/75 flex-1">{s.value}</span>
							<ExternalLink size={12} class="text-white/15 group-hover:text-white/40 transition-colors shrink-0" />
						</a>
					{:else}
						<div class="flex items-center gap-4 px-5 py-3.5">
							<s.icon size={14} class="{s.iconColor} shrink-0 opacity-60" />
							<span class="text-xs text-white/35 w-20 shrink-0">{s.label}</span>
							<span class="text-sm text-white/75 flex-1">{s.value}</span>
						</div>
					{/if}
				{/each}
			</div>

			<!-- PC photos -->
			<div class="grid grid-cols-2 gap-3 mt-5">
				<div class="rounded-xl overflow-hidden border border-white/8 aspect-video bg-white/3">
					<img src={pc1} alt="PC Setup – Ansicht 1" class="w-full h-full object-cover" />
				</div>
				<div class="rounded-xl overflow-hidden border border-white/8 aspect-video bg-white/3">
					<img src={pc2} alt="PC Setup – Ansicht 2" class="w-full h-full object-cover" />
				</div>
			</div>
		</section>

		<!-- ── SCHREIBTISCH ──────────────────────────────────────── -->
		<section class="py-12 border-b border-white/[0.07]">
			<h2 class="text-sm font-semibold text-white/60 mb-1">Schreibtisch</h2>
			<p class="text-xs text-white/30 mb-8">Was sonst noch so auf dem Tisch und drumherum steht.</p>

			<div class="grid sm:grid-cols-3 gap-4">
				{#each deskGroups as group}
					<div class="rounded-xl border border-white/8 overflow-hidden">
						<div class="px-4 py-3 border-b border-white/5 bg-white/2">
							<span class="text-[11px] text-white/40 uppercase tracking-widest">{group.heading}</span>
						</div>
						<div class="divide-y divide-white/5">
							{#each group.items as item}
								{#if item.url}
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors group"
									>
										<item.icon size={13} class="text-white/30 shrink-0 mt-0.5 group-hover:text-white/50 transition-colors" />
										<div class="min-w-0 flex-1">
											<div class="text-[10px] text-white/25 mb-0.5">{item.label}</div>
											<div class="text-sm text-white/75 leading-snug">{item.value}</div>
										</div>
										<ExternalLink size={11} class="text-white/10 group-hover:text-white/35 transition-colors shrink-0 mt-0.5" />
									</a>
								{:else}
									<div class="flex items-start gap-3 px-4 py-3">
										<item.icon size={13} class="text-white/30 shrink-0 mt-0.5" />
										<div class="min-w-0">
											<div class="text-[10px] text-white/25 mb-0.5">{item.label}</div>
											<div class="text-sm text-white/75 leading-snug">{item.value}</div>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- ── PEIKER MIKROFON ───────────────────────────────────── -->
		<section class="py-12 border-b border-white/[0.07]">
			<div class="flex items-center gap-2 mb-1">
				<Mic size={13} class="text-red-400/70" />
				<h2 class="text-sm font-semibold text-white/60">Peiker-Mikrofon</h2>
				<span class="ml-1 text-[10px] uppercase tracking-widest border rounded-md px-2 py-0.5 bg-red-500/10 text-red-300 border-red-500/25"
					>Häufig gefragt</span
				>
			</div>
			<p class="text-xs text-white/30 mb-8">Das Mikrofon, das am häufigsten im Chat auftaucht.</p>

			<div class="glow-card relative rounded-2xl" use:glow>
				<span class="glow-border" aria-hidden="true"></span>
				<div
					class="rounded-2xl border border-red-500/20 bg-linear-to-br from-red-500/10 via-red-500/5 to-transparent overflow-hidden"
				>
					<div class="flex flex-col lg:flex-row">
						<!-- Text content -->
						<div class="flex-1 p-6 sm:p-8">
							<div class="flex items-start gap-3 mb-5">
								<div class="p-3 rounded-xl border border-red-500/25 bg-red-500/15 shrink-0">
									<Mic size={20} class="text-red-300" />
								</div>
								<div>
									<h3 class="text-lg font-bold text-white leading-tight">Peiker ATC-Mikrofon</h3>
									<p class="text-xs text-red-300/70 mt-0.5 uppercase tracking-widest">
										Benutzerdefinierter USB-Umbau · Einzelstück
									</p>
								</div>
							</div>
							<p class="text-white/60 text-sm leading-relaxed mb-5">
								Ich lotse mit einem <span class="text-white/90 font-medium"
									>Peiker-Mikrofon (zwei Knöpfe)</span
								>, welches in dieser Ausführung (mit USB-Anschluss)
								<span class="text-white/90 font-medium">nicht käuflich erwerbbar ist</span>. Das
								Mikro wurde von mir auf eBay gekauft und von einem Bekannten an eine USB-Soundkarte
								gelötet, sodass das Mikro mit dem PC verbunden werden kann.
							</p>
							<div class="flex items-start gap-2 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
								<Info size={13} class="text-white/30 shrink-0 mt-0.5" />
								<p class="text-xs text-white/40 leading-relaxed">
									Das originale Peiker-Mikrofon ist ein professionelles ATC-Headset aus dem echten
									Luftfahrtbetrieb. Diese Modifikation ist ein Einzelstück — nicht käuflich.
								</p>
							</div>
						</div>
						<!-- Peiker images -->
						<div class="lg:w-72 xl:w-80 shrink-0 p-4 lg:p-6">
							<div class="flex gap-3 h-full">
								<div class="flex-1 rounded-xl overflow-hidden border border-white/8 min-h-44 lg:min-h-0">
									<img
										src={peiker1}
										alt="Peiker Mikrofon – Ansicht 1"
										class="w-full h-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ── FLUGSIMULATION ────────────────────────────────────── -->
		<section class="py-12 border-b border-white/[0.07]">
			<h2 class="text-sm font-semibold text-white/60 mb-1">Flugsimulation</h2>
			<p class="text-xs text-white/30 mb-8">Die Hardware zwischen mir und dem Himmel.</p>

			<div class="grid sm:grid-cols-3 gap-5">
				{#each flightsim as item}
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						class="glow-card group relative rounded-2xl block hover:scale-[1.01] transition-transform"
						use:glow
					>
						<span class="glow-border" aria-hidden="true"></span>
						<div class="overflow-hidden rounded-2xl border bg-linear-to-br {item.gradient} p-6 h-full">
							<div class="flex items-start justify-between mb-5">
								<div class="p-3 rounded-xl border {item.iconColor}">
									<item.icon size={20} />
								</div>
								<span class="text-[10px] uppercase tracking-widest border rounded-md px-2 py-1 {item.badge}">
									{item.label}
								</span>
							</div>
							<div class="text-base font-semibold text-white mb-2 leading-snug">{item.value}</div>
							<div class="text-xs text-white/40 leading-relaxed mb-4">{item.note}</div>
							<div class="flex items-center gap-1.5 text-[11px] text-white/20 group-hover:text-white/45 transition-colors">
								<ExternalLink size={11} />
								Zum Shop
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- ── MSFS SETTINGS ─────────────────────────────────────── -->
		<section class="py-12">
			<div class="flex items-start justify-between gap-4 mb-8">
				<div>
					<div class="flex items-center gap-2 mb-1">
						<Zap size={13} class="text-yellow-400/60" />
						<h2 class="text-sm font-semibold text-white/60">MSFS Settings</h2>
					</div>
					<p class="text-xs text-white/30 max-w-md leading-relaxed">
						Optimiert für VATSIM-Flüge auf der RTX 5090.
					</p>
				</div>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each msfsSettings as section}
					<div class="rounded-2xl border border-white/8 bg-white/2 overflow-hidden border-t-2 {section.accent}">
						<div class="px-5 pt-5 pb-4">
							<div class="flex items-center gap-2 mb-4">
								<Settings size={12} class="text-white/25" />
								<h3 class="text-[11px] text-white/40 uppercase tracking-widest">{section.title}</h3>
							</div>
							{#each section.items as item}
								<div class="flex justify-between items-center py-2.5 border-b border-white/5 last:border-b-0 text-sm gap-3">
									<span class="text-white/45">{item.label}</span>
									<span class="text-[11px] font-semibold px-2 py-0.5 rounded-md border shrink-0 {valueColor(item.value)}">
										{item.value}
									</span>
								</div>
							{/each}
						</div>
						{#if section.note}
							<div class="px-5 py-3 bg-white/2 border-t border-white/5 flex items-start gap-2">
								<Info size={12} class="text-white/20 shrink-0 mt-0.5" />
								<p class="text-xs text-white/25 leading-relaxed">{section.note}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
