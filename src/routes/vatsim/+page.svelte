<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { reveal } from '$lib/reveal.js';

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
		{ callsign: 'EDMM_CTR', airport: 'München Radar', active: true },
		{ callsign: 'EDUU_CTR', airport: 'Rhein Radar', active: true },
		{ callsign: 'EDYY_CTR', airport: 'Maastricht', active: true }
	];

	const sections: Section[] = [
		{ title: 'Tower', icon: TowerControl, positions: tower },
		{ title: 'Approach', icon: Radar, positions: approach },
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
	<div>

		<!-- HEADER -->
		<section class="relative pt-8 pb-12 border-b border-signal-500/10 overflow-hidden">
			<div class="relative max-w-2xl mb-8">
				<h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-5">VATSIM</h1>
				<p class="text-white/50 text-base leading-relaxed">
					Meine aktiven Endorsements im VATSIM-Netzwerk. Die aufgeführten Positionen zeigen, welche Station ich besetzen darf.
				</p>
			</div>
			<div class="flex flex-wrap items-center gap-4">
				<!-- RATING BADGE -->
				<div class="hud-panel flex items-center gap-3 border border-signal-500/20 bg-white/3 px-5 py-4 shrink-0">
					<BadgeCheck size={20} class="text-signal-400" />
					<div>
						<div class="text-xs font-mono text-signal-500/60 uppercase tracking-widest">ATC Rating</div>
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
		<h2 class="font-display text-xl font-semibold text-white/70 mb-8">Meine Freigaben</h2>
		<div class="grid gap-12 lg:grid-cols-3">
			{#each sections as section}
				<div>
					<div class="flex items-center gap-2 mb-7">
						<section.icon size={14} class="text-signal-500/50" />
						<h2 class="text-xs font-mono text-signal-500/60 uppercase tracking-widest">{section.title}</h2>
					</div>

					<div>
						{#each section.positions as pos}
							<div class="flex items-center justify-between py-3 border-b border-signal-500/10 text-sm">
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
		</div>

		<!-- NOTE -->
		<section class="border-t border-signal-500/10 py-8">
			<p class="text-sm text-white/30 max-w-lg leading-relaxed">
				Stand kann sich durch Trainingsfortschritt ändern.
			</p>
		</section>

	</div>
</BasicPage>
