<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';

	import TowerControl from 'lucide-svelte/icons/tower-control';
	import Radar from 'lucide-svelte/icons/radar';
	import Globe from 'lucide-svelte/icons/globe';
	import BadgeCheck from 'lucide-svelte/icons/badge-check';

	import type { Component } from 'svelte';

	type Position = { callsign: string; airport: string; active: boolean };
	type Section = {
		title: string;
		icon: Component<{ size?: number; class?: string }>;
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
		{ callsign: 'EDMM_CTR', airport: 'München Radar', active: true }
	];

	const sections: Section[] = [
		{ title: 'Tower', icon: TowerControl, positions: tower },
		{ title: 'Approach', icon: Radar, note: 'Keine: EDDB, EDDM, EDDH', positions: approach },
		{ title: 'Center', icon: Globe, note: 'München: einzelne Sektoren eingeschränkt', positions: center }
	];

	const quickStats = [
		{ label: 'Flüge', value: '450+' },
		{ label: 'Flugstunden', value: '1.800+' },
		{ label: 'Airports', value: '75+' }
	];
</script>

<svelte:head>
	<title>VATSIM – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-6">

		<!-- HEADER -->
		<section class="pt-4 pb-12 border-b border-white/[0.07]">
			<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
				<div class="flex-1">
					<h1 class="text-3xl font-bold tracking-tight mb-3">VATSIM</h1>
					<p class="text-white/50 text-base max-w-lg">
						Tier 1 Endorsements für Deutschland — welche ATC-Positionen ich besetzen darf.
						Piloten fliege ich auch, aber ATC macht mehr Spaß.
					</p>

					<div class="flex flex-wrap gap-x-8 gap-y-2 mt-6">
						{#each quickStats as s}
							<div class="text-sm">
								<span class="text-white/35">{s.label} </span>
								<span class="font-semibold text-white">{s.value}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- RATING BADGE -->
				<div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-5 py-4 shrink-0 self-start">
					<BadgeCheck size={20} class="text-red-400" />
					<div>
						<div class="text-xs text-white/30 uppercase tracking-widest">ATC Rating</div>
						<div class="text-2xl font-bold leading-tight">C1</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ENDORSEMENT SECTIONS -->
		<div class="py-12 grid gap-12 lg:grid-cols-3">
			{#each sections as section}
				<div>
					<div class="flex items-center gap-2 mb-7">
						<section.icon size={14} class="text-white/35" />
						<h2 class="text-xs text-white/30 uppercase tracking-widest">{section.title}</h2>
					</div>

					<div>
						{#each section.positions as pos}
							<div class="flex items-center justify-between py-3 border-b border-white/[0.07] text-sm">
								<div class="flex items-center gap-2.5">
									<span class="h-1.5 w-1.5 rounded-full shrink-0 {pos.active ? 'bg-green-500' : 'bg-white/15'}"></span>
									<span class="font-mono {pos.active ? 'text-white/80' : 'text-white/25 line-through decoration-white/15'}">{pos.callsign}</span>
								</div>
								<span class="text-white/35 text-xs">{pos.airport}</span>
							</div>
						{/each}
					</div>

					{#if section.note}
						<p class="mt-4 text-xs text-white/25 leading-relaxed">{section.note}</p>
					{/if}
				</div>
			{/each}
		</div>

		<!-- NOTE -->
		<section class="border-t border-white/[0.07] py-8">
			<p class="text-sm text-white/30 max-w-lg leading-relaxed">
				Diese Übersicht basiert auf internen Tier 1 Endorsements und ist nicht öffentlich über VATSIM einsehbar.
				Stand kann sich durch Trainingsfortschritt ändern.
			</p>
		</section>

	</div>
</BasicPage>
