<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { glow } from '$lib/glow.js';
	import ExternalLink from 'lucide-svelte/icons/external-link';

	const fleet = [
		{
			name: 'Fenix A320 / A319 / A321',
			dev: 'Fenix Simulations',
			type: 'Narrowbody',
			url: 'https://fenixsim.com',
			img: 'https://flyawaysimulation.com/media/images14/images/fenix-roadmap-a320neo-fs2020-fs2024-1.jpeg'
		},
		{
			name: 'ini A350-900',
			dev: 'iniBuilds',
			type: 'Widebody',
			url: 'https://inibuilds.com/products/inibuilds-a350-airliner-msfs-2024?ref=elmoradar',
			img: 'https://inibuilds.com/cdn/shop/files/FlightSimulator2024_gibhJDge7T_b8c0b58b-eb0f-499b-9f94-776345917ec6.png?v=1741617134'
		},
		{
			name: 'ini A340-300',
			dev: 'iniBuilds',
			type: 'Widebody',
			url: 'https://inibuilds.com/products/inibuilds-a340-airliner-msfs-2024?ref=elmoradar',
			img: 'https://inibuilds.com/cdn/shop/files/A340AirlinerMainStore.png?v=1759245373'
		},
		{
			name: 'ini A300-600',
			dev: 'iniBuilds',
			type: 'Widebody',
			url: 'https://inibuilds.com/products/inibuilds-a300-600r-airliner-msfs-2024?_pos=7&_fid=9a7f043a8&_ss=c?ref=elmoradar',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx4tPiRh0YEyPNdoiMB5Tc3Mh0OUZ-Qg3pDw&s'
		},
		{
			name: 'FSLabs A321neo',
			dev: 'Flight Sim Labs',
			type: 'Narrowbody',
			url: 'https://www.flightsimlabs.com/index.php/a321neo/#buy321',
			img: 'https://www.flightsimlabs.com/wp-content/uploads/slider/cache/10d5c8543459adafa4909bf1a09067c1/img-51.jpg'
		},
		{
			name: 'FBW A380',
			dev: 'FlyByWire Simulations',
			type: 'Widebody',
			url: 'https://flybywiresim.com/',
			img: 'https://flybywiresim.com/img/notam-images/a380x/a380x-a32nx.png'
		},
		{
			name: 'iFly 737-MAX',
			dev: 'iFly',
			type: 'Narrowbody',
			url: 'https://www.flight1.com/products.asp?vid=flt1sf&pid=iflymax8',
			img: 'https://cruiselevel.de/wp-content/uploads/2024/10/AtariumMAX.png'
		},
		{
			name: 'HPG H145',
			dev: 'HPG Helicopters',
			type: 'Helicopter',
			url: 'https://www.hypeperformancegroup.com/products/xxxx',
			img: 'https://www.hypeperformancegroup.com/cdn/shop/products/yes_1_1296x.jpg?v=1630111353'
		},
		{
			name: 'MD-11',
			dev: 'TFDI Design',
			type: 'Widebody',
			url: 'https://tfdidesign.com/products/md11',
			img: 'https://tfdidesign.com/img/md11/1.1/top/1.webp'
		},
		{
			name: 'CRJ V2',
			dev: 'Aerosoft',
			type: 'Narrowbody',
			url: 'https://www.aerosoft.com/de/shop/flight/microsoft-flight-simulator/msfs-2020/msfs-flugzeuge/3303/aerosoft-aircraft-crj-v2',
			img: 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/msfs/aerosoft-aircraft-crj-v2/01.jpg'
		}
	];

	type Addon = {
		name: string;
		category: string;
		desc: string;
		url: string;
		accent: string;
	};

	const addons: Addon[] = [
		{
			name: 'GSX Pro',
			category: 'Ground Services',
			desc: 'Realistische Bodenabfertigung, Boarding, Catering und Pushback — auf VATSIM unverzichtbar.',
			url: 'https://www.fsdreamteam.com/products_gsxpro.html',
			accent: 'from-orange-500/15 to-orange-500/5 border-orange-500/20'
		},
		{
			name: 'ChasePlane',
			category: 'Kamera',
			desc: 'Cineastische Kamerafahrten, vollständig anpassbar. Replay sieht danach aus wie echte Footage.',
			url: 'https://parallel42.com/products/chaseplane',
			accent: 'from-blue-500/15 to-blue-500/5 border-blue-500/20'
		},
		{
			name: 'AutoFPS',
			category: 'Performance',
			desc: 'Dynamischer LOD je nach Höhe — mehr Detail im Reiseflug, mehr FPS am Boden. Open Source.',
			url: 'https://github.com/ResetXPDR/MSFS2020_AutoFPS',
			accent: 'from-green-500/15 to-green-500/5 border-green-500/20'
		},
		{
			name: 'Navigraph',
			category: 'Navigation',
			desc: 'Aktuelles AIRAC + Charts. Das erste, was ich nach einer MSFS-Installation installiere.',
			url: 'https://navigraph.com',
			accent: 'from-cyan-500/15 to-cyan-500/5 border-cyan-500/20'
		},
		{
			name: 'Lido Charts',
			category: 'Charts',
			desc: 'Professionelle Lido-Flughafenkarten direkt im integrierten MSFS Flight Planner.',
			url: 'https://planner.flightsimulator.com/',
			accent: 'from-purple-500/15 to-purple-500/5 border-purple-500/20'
		},
		{
			name: 'flightsim.to',
			category: 'Freeware',
			desc: 'Liveries, GSX-Profile, Freeware-Sceneries — die wichtigste Community-Plattform überhaupt.',
			url: 'https://flightsim.to',
			accent: 'from-red-500/15 to-red-500/5 border-red-500/20'
		},

	];

	const typeColors: Record<string, string> = {
		Narrowbody: 'text-sky-200 border-sky-400/50 bg-sky-900/80',
		Widebody:   'text-violet-200 border-violet-400/50 bg-violet-900/80',
		Helicopter: 'text-amber-200 border-amber-400/50 bg-amber-900/80'
	};
</script>

<svelte:head>
	<title>Meine Addons – elmoradar</title>
</svelte:head>

<BasicPage>
	<div>

		<!-- HEADER -->
		<section class="relative pt-8 pb-12 border-b border-white/[0.07] overflow-hidden">
			<div class="relative max-w-2xl">
				<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-5">Meine Addons</h1>
				<p class="text-white/50 text-base leading-relaxed">
					Acht Flieger, sechs Tools. Was im Hangar steht und was vor jedem Flug läuft — alles täglich
					im Einsatz, nichts davon ist Sponsoring.
				</p>
			</div>
		</section>

		<!-- FLEET -->
		<section class="py-12 border-b border-white/[0.07]">
			<div class="flex items-baseline justify-between gap-4 mb-8">
				<div>
					<h2 class="text-sm font-semibold text-white/60 mb-1">Flieger im Hangar</h2>
					<p class="text-xs text-white/30">Klick auf einen Flieger öffnet die Produktseite des Entwicklers.</p>
				</div>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				{#each fleet as plane}
					<a
						href={plane.url}
						target="_blank"
						rel="noopener noreferrer"
						class="glow-card group relative rounded-xl block"
						use:glow
					>
						<span class="glow-border" aria-hidden="true"></span>
						<div class="rounded-xl overflow-hidden border border-white/8 bg-white/2 h-full flex flex-col">
							<div class="aspect-video overflow-hidden bg-white/5 relative shrink-0">
								<img
									src={plane.img}
									alt={plane.name}
									loading="lazy"
									class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<span class="absolute top-2 right-2 text-[10px] uppercase tracking-widest border rounded px-2 py-0.5 backdrop-blur-sm {typeColors[plane.type] ?? 'text-white/30 border-white/10 bg-black/40'}">
									{plane.type}
								</span>
							</div>
							<div class="px-3 py-3 flex items-end justify-between gap-2 flex-1">
								<div class="min-w-0">
									<div class="text-sm font-medium text-white/90 leading-snug">{plane.name}</div>
									<div class="text-xs text-white/35 mt-0.5">{plane.dev}</div>
								</div>
								<ExternalLink size={12} class="shrink-0 text-white/15 group-hover:text-white/45 transition-colors mb-0.5" />
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- SOFTWARE ADDONS -->
		<section class="py-12">
			<h2 class="text-sm font-semibold text-white/60 mb-1">Software & Tools</h2>
			<p class="text-xs text-white/30 mb-8">Läuft bei jedem Flu, entweder im Hintergrund oder als erstes vor dem Sim.</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
				{#each addons as addon}
					<a
						href={addon.url}
						target="_blank"
						rel="noopener noreferrer"
						class="glow-card group relative rounded-2xl block hover:scale-[1.01] transition-transform"
						use:glow
					>
						<span class="glow-border" aria-hidden="true"></span>
						<div class="flex flex-col rounded-2xl border bg-linear-to-br p-5 h-full {addon.accent}">
							<div class="flex items-start justify-between gap-2 mb-3">
								<div>
									<p class="font-semibold text-white/90 group-hover:text-white transition-colors">{addon.name}</p>
									<p class="text-[11px] uppercase tracking-widest text-white/30 mt-0.5">{addon.category}</p>
								</div>
								<ExternalLink size={14} class="shrink-0 text-white/20 group-hover:text-white/50 transition-colors mt-0.5" />
							</div>
							<p class="text-sm text-white/45 leading-relaxed group-hover:text-white/60 transition-colors">{addon.desc}</p>
						</div>
					</a>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
