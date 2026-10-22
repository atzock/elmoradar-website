<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { reveal } from '$lib/reveal.js';
	import { i18n } from '$lib/i18n/index.js';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Plane from 'lucide-svelte/icons/plane';
	import e55p from '$lib/assets/addons/e55p.png?url';

	const t = $derived(i18n.t);

	let failedImgs = $state(new Set<string>());

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
		},
		{
			name: 'Synaptic A220',
			dev: 'Synaptic Simulations / iniBuilds',
			type: 'Narrowbody',
			url: 'https://inibuilds.com/products/synaptic-a220-msfs',
			img: 'https://inibuilds.com/cdn/shop/files/FlightSimulator2024_zllMj6h3tq_4472x.png?v=1784834581'
		},
		{
			name: 'Citation Sovereign+',
			dev: 'Skyward Simulations',
			type: 'Business Jet',
			url: 'https://orbxdirect.com/product/skyward-citation-msfs2024',
			img: 'https://cdn.orbxdirect.com/products/2372/6a189e7271914-400x225.jpg'
		},
		{
			name: 'A340-600',
			dev: 'Aerosoft / ToLiss',
			type: 'Widebody',
			url: 'https://www.aerosoft.com/de/shop/flight/microsoft-flight-simulator/msfs-2020/msfs-flugzeuge/4763/aerosoft-aircraft-a340-600-pro',
			img: 'https://aerosoft-shop.com/shop-rd/bilder/screenshots/msfs/aerosoft-aircraft-a340-600-pro/01.jpg'
		},
		{
			name: 'Phenom E55P',
			dev: 'FS Reborn',
			type: 'Business Jet',
			url: 'https://www.fsreborn.com/fsr300e-for-microsoft-flight-simulator',
			img: e55p
		}
	];

	type Addon = {
		name: string;
		url: string;
		accent: string;
	};

	const addons: Addon[] = [
		{
			name: 'GSX Pro',
			url: 'https://www.fsdreamteam.com/products_gsxpro.html',
			accent: 'bg-surface border-line'
		},
		{
			name: 'ChasePlane',
			url: 'https://parallel42.com/products/chaseplane',
			accent: 'bg-surface border-line'
		},
		{
			name: 'AutoFPS',
			url: 'https://github.com/ResetXPDR/MSFS2020_AutoFPS',
			accent: 'bg-surface border-line'
		},
		{
			name: 'Navigraph',
			url: 'https://navigraph.com',
			accent: 'bg-surface border-line'
		},
		{
			name: 'Lido Charts',
			url: 'https://planner.flightsimulator.com/',
			accent: 'bg-surface border-line'
		},
		{
			name: 'flightsim.to',
			url: 'https://flightsim.to',
			accent: 'bg-surface border-line'
		},
		{
			name: 'Any2GSX',
			url: 'https://github.com/Fragtality/Any2GSX-Plugins',
			accent: 'bg-surface border-line'
		},
		{
			name: 'SkyTrails',
			url: 'https://parallel42.com/products/skytrails',
				accent: 'bg-surface border-line'
			},
			{
				name: 'GateStaticInjector for VATSIM',
				url: 'https://flightsim.to/addon/108678/gatestaticinjector-for-vatsim',
				accent: 'bg-surface border-line'
			}
	];

	const typeColors: Record<string, string> = {
		Narrowbody: 'text-fg-muted border-line bg-line',
		Widebody:   'text-fg-muted border-line bg-line',
		Helicopter: 'text-fg-muted border-line bg-line',
		'Business Jet': 'text-teal-200 border-teal-400/50 bg-teal-900/80'
	};
</script>

<svelte:head>
	<title>{t.addons.title}</title>
</svelte:head>

<BasicPage>
	<div>

		<!-- HEADER -->
		<section class="page-hero">
			<div class="relative max-w-2xl">
				<p class="eyebrow eyebrow-rule mb-4">{t.addons.eyebrow}</p>
				<h1 class="page-title mb-5">{t.addons.titleLead} <em>{t.addons.titleEm}</em></h1>
				<p class="text-white/50 text-base leading-relaxed">{t.addons.intro}</p>
			</div>
		</section>

		<!-- FLEET -->
		<section class="reveal py-12 border-b border-line" use:reveal>
			<div class="flex items-baseline justify-between gap-4 mb-8">
				<div>
					<h2 class="section-title mb-1">{t.addons.fleetHeading}</h2>
					<p class="text-xs font-mono text-fg-subtle">{t.addons.fleetHint}</p>
				</div>
			</div>

			<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-3 sm:gap-4">
				{#each fleet as plane, i}
					<a
						href={plane.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative rounded-md block {i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}"
					>
						<div class="rounded-md overflow-hidden border bg-surface h-full flex flex-col transition-colors group-hover:border-accent/60 {i === 0 ? 'border-accent-deep' : 'border-line'}">
							<div class="aspect-video overflow-hidden bg-raised relative {i === 0 ? 'lg:aspect-auto lg:flex-1 lg:min-h-64' : 'shrink-0'}">
								{#if failedImgs.has(plane.name)}
									<div class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-fg-subtle"><Plane size={28} /><span class="text-xs">{t.addons.imgMissing}</span></div>
								{:else}
								<img
									onerror={() => (failedImgs = new Set(failedImgs).add(plane.name))}
									src={plane.img}
									alt={plane.name}
									loading="lazy"
									class="w-full h-full object-cover zoom-img {i === 0 ? 'lg:absolute lg:inset-0' : ''}"
								/>
								{/if}
								<span class="absolute top-2 right-2 text-[10px] font-mono uppercase tracking-wider border rounded px-2 py-0.5 backdrop-blur-sm {typeColors[plane.type] ?? 'text-white/30 border-white/10 bg-black/40'}">
									{plane.type}
								</span>
							</div>
							<div class="px-3 py-3 flex items-end justify-between gap-2 flex-1">
								<div class="min-w-0">
									{#if i === 0}<div class="eyebrow eyebrow-rule mb-2">{t.addons.main}</div>{/if}
									<div class="font-medium text-white/90 leading-snug {i === 0 ? 'text-xl tracking-tight' : 'text-sm'}">{plane.name}</div>
									<div class="text-xs text-white/35 mt-0.5">{plane.dev}</div>
								</div>
								<ExternalLink size={12} class="shrink-0 text-fg-subtle group-hover:text-accent-hover transition-colors mb-0.5" />
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- SOFTWARE ADDONS -->
		<section class="reveal py-12" use:reveal>
			<h2 class="section-title mb-1">{t.addons.toolsHeading}</h2>
			<p class="text-xs font-mono text-fg-subtle mb-8">{t.addons.toolsHint}</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
				{#each addons as addon}
					<a
						href={addon.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group relative rounded-lg block transition-transform"
					>
						<div class="rounded-lg flex flex-col border border-line bg-surface p-5 h-full transition-colors group-hover:border-accent/50 group-hover:bg-raised">
							<div class="flex items-start justify-between gap-2 mb-3">
								<div>
									<p class="font-display font-semibold text-white/90 group-hover:text-white transition-colors">{addon.name}</p>
									<p class="text-[11px] font-mono uppercase tracking-wider text-white/30 mt-0.5">{t.addons.tools[addon.name].category}</p>
								</div>
								<ExternalLink size={14} class="shrink-0 text-white/20 group-hover:text-white/50 transition-colors mt-0.5" />
							</div>
							<p class="text-sm text-white/45 leading-relaxed group-hover:text-white/60 transition-colors">{t.addons.tools[addon.name].desc}</p>
						</div>
					</a>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
