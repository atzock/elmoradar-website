<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { reveal } from '$lib/reveal.js';
	import { i18n } from '$lib/i18n/index.js';

	import {
		peiker1,
		peiker2,
		pc1,
		pc2,
		stick1,
		stick2,
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

	const t = $derived(i18n.t);

	// CPU + GPU highlight cards
	const featured = $derived([
		{
			label: 'CPU',
			value: 'AMD Ryzen 7 7800X3D',
			note: t.hardware.pc.cpuNote,
			icon: Cpu,
			url: 'https://amzn.to/3WRNbuf'
		},
		{
			label: 'GPU',
			value: 'NVIDIA RTX 5090 Zotac',
			note: t.hardware.pc.gpuNote,
			icon: Gpu,
			url: 'https://amzn.to/4lKR2n7'
		}
	]);

	// Spec list items — shown as a clean table, not individual cards
	const specs: { icon: Icon; iconColor: string; label: string; value: string; url?: string }[] = $derived([
		{
			icon: MemoryStick,
			iconColor: 'text-fg-muted',
			label: 'RAM',
			value: '64 GB DDR5 (4×16 GB)',
			url: 'https://amzn.to/3yN339b'
		},
		{
			icon: CircuitBoard,
			iconColor: 'text-fg-muted',
			label: 'Mainboard',
			value: 'MSI B650 Gaming Plus',
			url: 'https://amzn.to/3TiG9xJ'
		},
		{
			icon: HardDrive,
			iconColor: 'text-fg-muted',
			label: 'NVMe',
			value: '2 x Lexar 2 TB M.2',
			url: 'https://amzn.to/4cr09EU'
		},
		{
			icon: HardDrive,
			iconColor: 'text-fg-muted',
			label: 'SSD',
			value: 'Samsung 2 TB',
			url: 'https://amzn.to/4fEInAM'
		},
		{
			icon: Fan,
			iconColor: 'text-teal-400',
			label: t.hardware.pc.cooler,
			value: 'Thermalright Phantom Spirit 120SE',
			url: 'https://amzn.to/4qrU1TI'
		}
	]);

	// Desk — grouped to break monotony
	type DeskGroup = { heading: string; items: { icon: Icon; label: string; value: string; url?: string }[] };

	const deskGroups: DeskGroup[] = $derived([
		{
			heading: t.hardware.desk.monitors,
			items: [
				{ icon: Monitor, label: t.hardware.desk.main,     value: '27" MSI MAG274QRF (1440p / 165 Hz)', url: amznSearch('MSI MAG274QRF') },
				{ icon: Monitor, label: t.hardware.desk.monitor2, value: '27" Acer (1080p)' },
				{ icon: Monitor, label: t.hardware.desk.monitor3, value: t.hardware.desk.monitor3Value },
				{ icon: Monitor, label: t.hardware.desk.monitor4, value: 'Acer (22")' }
			]
		},
		{
			heading: t.hardware.desk.audio,
			items: [
				{ icon: Mic,      label: t.hardware.desk.microphone, value: 'Razer Siren V3 Chroma',  url: amznSearch('Razer Siren V3 Chroma') },
				{ icon: Mic,      label: t.hardware.desk.micArm,     value: 'Elgato Wave Mic Arm LP', url: amznSearch('Elgato Wave Mic Arm LP') },
				{ icon: Gamepad2, label: t.hardware.desk.streamDeck, value: 'Elgato Stream Deck XL',  url: amzn('B07MFCJYQH') }
			]
		},
		{
			heading: t.hardware.desk.peripherals,
			items: [
				{ icon: Keyboard,   label: t.hardware.desk.keyboard, value: 'Roccat Horde AIMO',           url: amznSearch('Roccat Horde AIMO') },
				{ icon: Mouse,      label: t.hardware.desk.mouse,    value: 'Roccat Kone AIMO',            url: amznSearch('Roccat Kone AIMO') },
				{ icon: Headphones, label: t.hardware.desk.headset,  value: 'Roccat Syn Pro Air Wireless', url: amznSearch('Roccat Syn Pro Air') }
			]
		}
	]);

	// Flight sim hardware — the stars of the show
	const flightsim = $derived([
		{
			label: t.hardware.flightsim.throttle,
			value: 'WinCTRL Throttle Pack',
			note: t.hardware.flightsim.throttleNote,
			icon: Gauge,
			url: 'https://eu.winctrl.com/view/goods-details.html?id=1665'
		},
		{
			label: t.hardware.flightsim.rudder,
			value: 'Logitech G Saitek Pro Flight',
			note: t.hardware.flightsim.rudderNote,
			icon: Plane,
			url: amznSearch('Logitech Saitek Pro Flight Rudder Pedals')
		}
	]);

	function valueColor(v: string): string {
		const k = v.toLowerCase();
		if (t.msfs.valueHigh.includes(k)) return 'text-fg bg-raised border-line-strong';
		if (t.msfs.valueOff.includes(k)) return 'text-red-400/80 bg-red-500/8 border-red-500/15';
		return 'text-fg-muted bg-line border-line';
	}

	const navItems = $derived([
		{ id: 'rechner', label: t.hardware.nav.pc },
		{ id: 'schreibtisch', label: t.hardware.nav.desk },
		{ id: 'peiker', label: t.hardware.nav.peiker },
		{ id: 'flugsimulation', label: t.hardware.nav.flightsim },
		{ id: 'msfs', label: t.hardware.nav.msfs }
	]);
</script>

<svelte:head>
	<title>{t.hardware.title}</title>
</svelte:head>

<BasicPage>
	<div>

		<!-- ── HEADER ────────────────────────────────────────────── -->
		<section class="page-hero">
			<div class="relative max-w-2xl">
				<p class="eyebrow eyebrow-rule mb-4">{t.hardware.eyebrow}</p>
				<h1 class="page-title mb-5">{t.hardware.titleLead} <em>{t.hardware.titleEm}</em></h1>
				<p class="text-white/50 text-base max-w-xl leading-relaxed mb-4">{t.hardware.intro}</p>
				<!-- <p class="text-white/25 text-sm">
					Affiliate-Links zu Amazon - kostet euch nichts extra, hilft mir beim Weiterfliegen.
				</p> -->
			</div>
		</section>

		<!-- ── SUBCHAPTER NAV ───────────────────────────────────── -->
		<nav class="sticky top-14 z-40 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-bg/90 backdrop-blur border-b border-line overflow-x-auto" aria-label={t.hardware.navLabel}>
			<ul class="flex gap-6 whitespace-nowrap text-sm">
				{#each navItems as item}
					<li>
						<a href="#{item.id}" class="block py-3 text-fg-muted hover:text-fg border-b-2 border-transparent hover:border-accent transition-colors">{item.label}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- ── RECHNER ───────────────────────────────────────────── -->
		<section id="rechner" class="reveal py-14 scroll-mt-28" use:reveal>
			<p class="eyebrow eyebrow-rule mb-3">{t.hardware.pc.eyebrow}</p>
			<h2 class="section-title mb-2">{t.hardware.pc.heading}</h2>
			<p class="text-sm text-fg-muted mb-8 max-w-prose">{t.hardware.pc.sub}</p>

			<div class="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">
				<!-- Photos -->
				<div class="grid gap-3">
					<div class="overflow-hidden rounded-lg border border-line bg-surface aspect-[4/3]">
						<img src={pc1} alt={t.hardware.pc.photo1Alt} class="w-full h-full object-cover zoom-img" />
					</div>
					<div class="overflow-hidden rounded-lg border border-line bg-surface aspect-[16/7]">
						<img src={pc2} alt={t.hardware.pc.photo2Alt} class="w-full h-full object-cover zoom-img" />
					</div>
				</div>

				<!-- Specs -->
				<div>
					<div class="grid gap-3 mb-6">
						{#each featured as item, i}
							<a
								href={item.url}
								target="_blank"
								rel="noopener noreferrer"
								class="group block rounded-lg border p-5 transition-colors hover:border-accent/60 {i === 1 ? 'bg-accent-soft border-accent-deep' : 'bg-surface border-line'}"
							>
								<div class="flex items-center justify-between mb-3">
									<span class="flex items-center gap-2 eyebrow {i === 1 ? '!text-accent-hover' : ''}"><item.icon size={14} />{item.label}</span>
									<ArrowUpRight size={14} class="text-fg-subtle group-hover:text-accent-hover transition-colors" />
								</div>
								<div class="text-xl font-semibold tracking-tight leading-tight mb-1.5">{item.value}</div>
								<div class="text-sm text-fg-muted leading-snug">{item.note}</div>
							</a>
						{/each}
					</div>

					<dl class="border-t border-line">
						{#each specs as s}
							<svelte:element
								this={s.url ? 'a' : 'div'}
								href={s.url}
								target={s.url ? '_blank' : undefined}
								rel={s.url ? 'noopener noreferrer' : undefined}
								class="group flex items-center gap-4 py-3 border-b border-line {s.url ? 'hover:bg-raised/60 transition-colors -mx-2 px-2 rounded-sm' : ''}"
							>
								<s.icon size={14} class="text-fg-subtle shrink-0" />
								<dt class="eyebrow w-20 shrink-0">{s.label}</dt>
								<dd class="text-sm flex-1">{s.value}</dd>
								{#if s.url}<ExternalLink size={12} class="text-fg-subtle group-hover:text-accent-hover transition-colors shrink-0" />{/if}
							</svelte:element>
						{/each}
					</dl>
				</div>
			</div>
		</section>

		<!-- ── SCHREIBTISCH ──────────────────────────────────────── -->
		<section id="schreibtisch" class="reveal band py-14 scroll-mt-28" use:reveal>
			<p class="eyebrow eyebrow-rule mb-3">{t.hardware.desk.eyebrow}</p>
			<h2 class="section-title mb-2">{t.hardware.desk.heading}</h2>
			<p class="text-sm text-fg-muted mb-8 max-w-prose">{t.hardware.desk.sub}</p>

			<div class="grid sm:grid-cols-3 gap-x-10 gap-y-10">
				{#each deskGroups as group}
					<div>
						<h3 class="eyebrow !text-fg mb-2 pb-3 border-b border-accent-deep">{group.heading}</h3>
						<ul>
							{#each group.items as item}
								<li class="border-b border-line">
									<svelte:element
										this={item.url ? 'a' : 'div'}
										href={item.url}
										target={item.url ? '_blank' : undefined}
										rel={item.url ? 'noopener noreferrer' : undefined}
										class="group flex items-start gap-3 py-3 {item.url ? 'hover:text-accent-hover transition-colors' : ''}"
									>
										<item.icon size={14} class="text-fg-subtle shrink-0 mt-1" />
										<div class="min-w-0 flex-1">
											<div class="text-xs text-fg-subtle mb-0.5">{item.label}</div>
											<div class="text-sm leading-snug">{item.value}</div>
										</div>
										{#if item.url}<ExternalLink size={11} class="text-fg-subtle group-hover:text-accent-hover shrink-0 mt-1.5" />{/if}
									</svelte:element>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		<!-- ── PEIKER MIKROFON ───────────────────────────────────── -->
		<section id="peiker" class="reveal py-14 scroll-mt-28" use:reveal>
			<div class="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-center">
				<div class="grid grid-cols-2 gap-3">
					<div class="overflow-hidden rounded-lg border border-line bg-surface aspect-[3/4]">
						<img src={peiker1} alt={t.hardware.peiker.alt1} class="w-full h-full object-cover zoom-img" />
					</div>
					<div class="overflow-hidden rounded-lg border border-line bg-surface aspect-[3/4] mt-8">
						<img src={peiker2} alt={t.hardware.peiker.alt2} class="w-full h-full object-cover zoom-img" />
					</div>
				</div>
				<div>
					<p class="eyebrow eyebrow-rule mb-3">{t.hardware.peiker.eyebrow}</p>
					<h2 class="page-title !text-3xl sm:!text-4xl mb-4">{t.hardware.peiker.titleLead} <em>{t.hardware.peiker.titleEm}</em></h2>
					<p class="eyebrow !text-accent-hover mb-5">{t.hardware.peiker.subtitle}</p>
					<p class="text-fg-muted leading-relaxed mb-5">{t.hardware.peiker.p1a}<strong class="text-fg font-medium">{t.hardware.peiker.p1b}</strong>{t.hardware.peiker.p1c}<strong class="text-fg font-medium">{t.hardware.peiker.p1d}</strong>{t.hardware.peiker.p1e}</p>
					<div class="border-l-2 border-accent pl-4 py-1">
						<p class="text-sm text-fg-muted leading-relaxed">{t.hardware.peiker.note}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ── FLUGSIMULATION ────────────────────────────────────── -->
		<section id="flugsimulation" class="reveal band py-14 scroll-mt-28" use:reveal>
			<p class="eyebrow eyebrow-rule mb-3">{t.hardware.flightsim.eyebrow}</p>
			<h2 class="section-title mb-2">{t.hardware.flightsim.heading}</h2>
			<p class="text-sm text-fg-muted mb-8 max-w-prose">{t.hardware.flightsim.sub}</p>

			<!-- MOZA AB6 featured -->
			<a
				href="https://eu.mozaracing.com/products/ab6-bundle/?ref=elmoradar"
				target="_blank"
				rel="noopener noreferrer"
				class="group grid lg:grid-cols-[1fr_1.2fr] rounded-lg border border-accent-deep bg-accent-soft overflow-hidden transition-colors hover:border-accent/70 mb-6"
			>
				<div class="p-6 sm:p-8 flex flex-col justify-center">
					<div class="flex items-center gap-2 mb-4">
						<Joystick size={16} class="text-accent-hover" />
						<span class="eyebrow !text-accent-hover">{t.hardware.flightsim.mozaBadge}</span>
					</div>
					<h3 class="text-2xl font-semibold tracking-tight mb-3">MOZA AB6 Flight Simulator Bundle</h3>
					<p class="text-fg-muted leading-relaxed mb-5">{t.hardware.flightsim.mozaText}</p>
					<span class="inline-flex items-center gap-1.5 text-sm text-accent-hover"><ExternalLink size={13} />{t.common.toShop}</span>
				</div>
				<div class="grid grid-cols-2 gap-px bg-accent-deep/40">
					<div class="overflow-hidden min-h-56 bg-surface"><img src={stick1} alt={t.hardware.flightsim.mozaAlt1} class="w-full h-full object-cover zoom-img" /></div>
					<div class="overflow-hidden min-h-56 bg-surface"><img src={stick2} alt={t.hardware.flightsim.mozaAlt2} class="w-full h-full object-cover zoom-img" /></div>
				</div>
			</a>

			<ul class="grid sm:grid-cols-2 gap-x-10">
				{#each flightsim as item}
					<li class="border-t border-line">
						<a href={item.url} target="_blank" rel="noopener noreferrer" class="group flex items-start gap-4 py-5">
							<item.icon size={18} class="text-fg-subtle mt-1 shrink-0" />
							<div class="flex-1 min-w-0">
								<div class="eyebrow mb-1">{item.label}</div>
								<div class="font-medium mb-1 group-hover:text-accent-hover transition-colors">{item.value}</div>
								<p class="text-sm text-fg-muted leading-relaxed">{item.note}</p>
							</div>
							<ExternalLink size={13} class="text-fg-subtle group-hover:text-accent-hover transition-colors shrink-0 mt-1" />
						</a>
					</li>
				{/each}
			</ul>
		</section>

		<!-- ── MSFS SETTINGS ─────────────────────────────────────── -->
		<section id="msfs" class="reveal py-14 scroll-mt-28" use:reveal>
			<div class="flex items-start justify-between gap-4 mb-8">
				<div>
					<p class="eyebrow eyebrow-rule mb-3">{t.msfs.eyebrow}</p>
					<h2 class="section-title mb-2">{t.msfs.heading}</h2>
					<p class="text-sm text-fg-muted max-w-md leading-relaxed">
						{t.msfs.sub}
					</p>
				</div>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each t.msfs.sections as section}
					<div class="rounded-lg border border-line bg-surface overflow-hidden border-t-2 border-t-accent-deep">
						<div class="px-5 pt-5 pb-4">
							<div class="flex items-center gap-2 mb-4">
								<Settings size={12} class="text-fg-subtle" />
								<h3 class="text-[11px] font-mono text-fg-subtle uppercase tracking-wider">{section.title}</h3>
							</div>
							{#each section.items as item}
								<div class="flex justify-between items-center py-2.5 border-b border-line last:border-b-0 text-sm gap-3">
									<span class="text-white/45">{item.label}</span>
									<span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border shrink-0 {valueColor(item.value)}">
										{item.value}
									</span>
								</div>
							{/each}
						</div>
						{#if section.note}
							<div class="px-5 py-3 bg-white/2 border-t border-line flex items-start gap-2">
								<Info size={12} class="text-fg-subtle shrink-0 mt-0.5" />
								<p class="text-xs text-white/25 leading-relaxed">{section.note}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

	</div>
</BasicPage>
