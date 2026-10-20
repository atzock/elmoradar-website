<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { reveal } from '$lib/reveal.js';
	import { i18n } from '$lib/i18n/index.js';

	import TowerControl from 'lucide-svelte/icons/tower-control';
	import Radar from 'lucide-svelte/icons/radar';
	import Globe from 'lucide-svelte/icons/globe';
	import BadgeCheck from 'lucide-svelte/icons/badge-check';

	const t = $derived(i18n.t);

	type Position = { callsign: string; airport: string; active: boolean };
	type Section = {
		title: string;
		icon: typeof TowerControl;
		note?: string;
		positions: Position[];
	};

	const tower: Position[] = [
		{ callsign: 'EDDF_TWR', airport: 'Frankfurt', active: true },
		{ callsign: 'EDDH_TWR', airport: 'Hamburg', active: true },
		{ callsign: 'EDDK_TWR', airport: 'Köln', active: true },
		{ callsign: 'EDDL_TWR', airport: 'Düsseldorf', active: true },
		{ callsign: 'EDDM_TWR', airport: 'München', active: true },
		{ callsign: 'EDDB_TWR', airport: 'Berlin', active: false }
	];

	const approach: Position[] = [
		{ callsign: 'EDDF_APP', airport: 'Frankfurt', active: true },
		{ callsign: 'EDDK_APP', airport: 'Köln', active: true },
		{ callsign: 'EDDL_APP', airport: 'Düsseldorf', active: true },
		{ callsign: 'EDDB_APP', airport: 'Berlin', active: false },
		{ callsign: 'EDDM_APP', airport: 'München', active: false },
		{ callsign: 'EDDH_APP', airport: 'Hamburg', active: false }
	];

	const center: Position[] = [
		{ callsign: 'EDGG_CTR', airport: 'Langen Radar', active: true },
		{ callsign: 'EDWW_CTR', airport: 'Bremen Radar', active: true },
		{ callsign: 'EDMM_CTR', airport: 'München Radar', active: true },
		{ callsign: 'EDUU_CTR', airport: 'Rhein Radar', active: true },
		{ callsign: 'EDYY_CTR', airport: 'Maastricht', active: true }
	];

	const sections: Section[] = $derived([
		{ title: t.vatsim.tower, icon: TowerControl, positions: tower },
		{ title: t.vatsim.approach, icon: Radar, positions: approach },
		{ title: t.vatsim.center, icon: Globe, note: t.vatsim.munichNote, positions: center }
	]);

	const quickStats = $derived([
		{ label: t.vatsim.flights, value: '450+' },
		{ label: t.vatsim.hours, value: '1.800+' },
		{ label: t.vatsim.airports, value: '75+' }
	]);
</script>

<svelte:head>
	<title>{t.vatsim.title}</title>
</svelte:head>

<BasicPage>
	<div>

		<!-- HEADER -->
		<section class="page-hero">
			<div class="relative max-w-2xl mb-8">
				<p class="eyebrow eyebrow-rule mb-4">{t.vatsim.eyebrow}</p>
				<h1 class="page-title mb-5"><em>VATSIM</em></h1>
				<p class="text-white/50 text-base leading-relaxed">{t.vatsim.intro}</p>
			</div>
			<div class="flex flex-wrap items-center gap-4">
				<!-- RATING BADGE -->
				<div class="rounded-lg flex items-center gap-3 border border-accent-deep bg-accent-soft px-5 py-4 shrink-0">
					<BadgeCheck size={20} class="text-accent" />
					<div>
						<div class="text-xs font-mono text-fg-subtle uppercase tracking-wider">{t.vatsim.rating}</div>
						<div class="font-display text-2xl font-bold leading-tight">C1</div>
					</div>
				</div>
				<div class="flex flex-wrap gap-x-8 gap-y-2">
					{#each quickStats as s}
						<div class="text-sm">
							<span class="text-white/35">{s.label} </span>
							<span class="font-display font-semibold text-white">{s.value}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ENDORSEMENT SECTIONS -->
		<div class="reveal py-12" use:reveal>
		<h2 class="section-title mb-8">{t.vatsim.heading}</h2>
		<div class="grid gap-12 lg:grid-cols-3">
			{#each sections as section}
				<div>
					<div class="flex items-center gap-2 mb-7">
						<section.icon size={14} class="text-fg-subtle" />
						<h2 class="text-xs font-mono text-fg-subtle uppercase tracking-wider">{section.title}</h2>
					</div>

					<div>
						{#each section.positions as pos}
							<div class="flex items-center justify-between py-3 border-b border-line text-sm">
								<div class="flex items-center gap-2.5">
									<span class="h-1.5 w-1.5 rounded-full shrink-0 {pos.active ? 'bg-green-500' : 'bg-white/15'}"></span>
									<span class="font-mono {pos.active ? 'text-white/80' : 'text-white/25 line-through decoration-white/15'}">{pos.callsign}</span>
								</div>
								<span class="text-white/35 text-xs">{t.vatsim.places[pos.airport] ?? pos.airport}</span>
							</div>
						{/each}
					</div>

					{#if section.note}
						<p class="mt-4 text-xs text-white/25 leading-relaxed">{section.note}</p>
					{/if}
				</div>
			{/each}
		</div>
		</div>

		<!-- NOTE -->
		<section class="border-t border-line py-8">
			<p class="text-sm text-white/30 max-w-lg leading-relaxed">
				{t.vatsim.footnote}
			</p>
		</section>

	</div>
</BasicPage>
