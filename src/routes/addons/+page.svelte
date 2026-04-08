<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import ExternalLink from 'lucide-svelte/icons/external-link';

	const fleet = [
		{
			name: 'Fenix A320 / A319 / A321',
			dev: 'Fenix Simulations',
			type: 'Narrowbody',
			img: 'https://flyawaysimulation.com/media/images14/images/fenix-roadmap-a320neo-fs2020-fs2024-1.jpeg'
		},
		{
			name: 'ini A350-900',
			dev: 'iniBuilds',
			type: 'Widebody',
			img: 'https://inibuilds.com/cdn/shop/files/FlightSimulator2024_gibhJDge7T_b8c0b58b-eb0f-499b-9f94-776345917ec6.png?v=1741617134'
		},
		{
			name: 'ini A340-300',
			dev: 'iniBuilds',
			type: 'Widebody',
			img: 'https://inibuilds.com/cdn/shop/files/A340AirlinerMainStore.png?v=1759245373'
		},
		{
			name: 'ini A300-600',
			dev: 'iniBuilds',
			type: 'Widebody',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx4tPiRh0YEyPNdoiMB5Tc3Mh0OUZ-Qg3pDw&s'
		},
		{
			name: 'FSLabs A321neo',
			dev: 'Flight Sim Labs',
			type: 'Narrowbody',
			img: 'https://www.flightsimlabs.com/wp-content/uploads/slider/cache/10d5c8543459adafa4909bf1a09067c1/img-51.jpg'
		},
		{
			name: 'FBW A380',
			dev: 'FlyByWire Simulations',
			type: 'Widebody',
			img: 'https://flybywiresim.com/img/notam-images/a380x/a380x-a32nx.png'
		},
		{
			name: 'iFly 737-MAX',
			dev: 'iFly',
			type: 'Narrowbody',
			img: 'https://cruiselevel.de/wp-content/uploads/2024/10/AtariumMAX.png'
		},
		{
			name: 'HPG H145',
			dev: 'HPG Helicopters',
			type: 'Helicopter',
			img: 'https://www.hypeperformancegroup.com/cdn/shop/products/yes_1_1296x.jpg?v=1630111353'
		}
	];

	type Addon = {
		name: string;
		category: string;
		desc: string;
		url: string;
		accent: string;
		logo?: string;
	};

	const addons: Addon[] = [
		{
			name: 'GSX Pro',
			category: 'Ground Services',
			desc: 'Realistische Bodenabfertigung, Boarding, Catering und Pushback — unverzichtbar auf VATSIM.',
			url: 'https://www.fsdreamteam.com/products_gsxpro.html',
			accent: 'from-orange-500/15 to-orange-500/5 border-orange-500/20'
		},
		{
			name: 'ChasePlane',
			category: 'Kamera',
			desc: 'Cineastische Kamerafahrten und vollständig anpassbare Kameraperspektiven für jeden Moment.',
			url: 'https://chaseplane.com',
			accent: 'from-blue-500/15 to-blue-500/5 border-blue-500/20'
		},
		{
			name: 'AutoFPS',
			category: 'Performance',
			desc: 'Dynamische LOD-Anpassung je nach Flughöhe — mehr Detail in der Luft, mehr FPS am Boden.',
			url: 'https://github.com/ResetXPDR/MSFS2020_AutoFPS',
			accent: 'from-green-500/15 to-green-500/5 border-green-500/20'
		},
		{
			name: 'Navigraph',
			category: 'Navigation',
			desc: 'Aktuelles AIRAC und Charts — das Rückgrat jedes IFR-Fluges. AIRAC + Charts Bundle.',
			url: 'https://navigraph.com',
			accent: 'from-cyan-500/15 to-cyan-500/5 border-cyan-500/20'
		},
		{
			name: 'Lido Charts',
			category: 'Charts',
			desc: 'Professionelle Lido-Flughafenkarten direkt im MSFS Flight Planner integriert.',
			url: 'https://planner.flightsimulator.com/',
			accent: 'from-purple-500/15 to-purple-500/5 border-purple-500/20'
		},
		{
			name: 'flightsim.to',
			category: 'Freeware',
			desc: 'Die wichtigste Anlaufstelle für Liveries, GSX-Profile, Freeware-Sceneries und mehr.',
			url: 'https://flightsim.to',
			accent: 'from-red-500/15 to-red-500/5 border-red-500/20'
		}
	];

	const typeColors: Record<string, string> = {
		Narrowbody: 'text-sky-400/70 border-sky-500/20',
		Widebody: 'text-violet-400/70 border-violet-500/20',
		Helicopter: 'text-amber-400/70 border-amber-500/20'
	};
</script>

<svelte:head>
	<title>Meine Addons – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-6">

		<!-- HEADER -->
		<section class="pt-4 pb-12 border-b border-white/[0.07]">
			<h1 class="text-3xl font-bold tracking-tight mb-3">Meine Addons</h1>
			<p class="text-white/50 text-base max-w-lg">
				Die Flieger im Hangar und die Tools, ohne die MSFS nur halb so gut wäre.
				Alles davon täglich im Einsatz.
			</p>
		</section>

		<!-- FLEET -->
		<section class="py-12 border-b border-white/[0.07]">
			<h2 class="text-xs text-white/30 uppercase tracking-widest mb-2">Go-To Flieger</h2>
			<p class="text-white/40 text-sm mb-8">Die Add-ons, die meistens im Hangar stehen.</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each fleet as plane}
					<div class="rounded-xl overflow-hidden border border-white/[0.08] bg-white/2 group">
						<div class="aspect-video overflow-hidden bg-white/5 relative">
							<img
								src={plane.img}
								alt={plane.name}
								loading="lazy"
								class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
							/>
							<!-- Type badge overlaid on image -->
							<span class="absolute top-2 right-2 text-[10px] uppercase tracking-widest border rounded-md px-2 py-0.5 backdrop-blur-sm bg-black/40 {typeColors[plane.type] ?? 'text-white/30 border-white/10'}">
								{plane.type}
							</span>
						</div>
						<div class="px-3 py-3">
							<div class="text-sm font-medium text-white/90 leading-snug">{plane.name}</div>
							<div class="text-xs text-white/35 mt-0.5">{plane.dev}</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- SOFTWARE ADDONS -->
		<section class="py-12">
			<h2 class="text-xs text-white/30 uppercase tracking-widest mb-2">Software & Tools</h2>
			<p class="text-white/40 text-sm mb-8">Diese Tools laufen bei jedem Flug im Hintergrund oder davor.</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each addons as addon}
					<a
						href={addon.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative flex flex-col rounded-2xl border bg-gradient-to-br p-5 hover:scale-[1.01] transition-all duration-200 {addon.accent}"
					>
						<div class="flex items-start justify-between gap-2 mb-3">
							<div>
								<p class="font-semibold text-white/90 group-hover:text-white transition-colors">{addon.name}</p>
								<p class="text-[11px] uppercase tracking-widest text-white/30 mt-0.5">{addon.category}</p>
							</div>
							<ExternalLink size={14} class="shrink-0 text-white/20 group-hover:text-white/40 transition-colors mt-0.5" />
						</div>
						<p class="text-sm text-white/45 leading-relaxed group-hover:text-white/55 transition-colors">{addon.desc}</p>
					</a>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
