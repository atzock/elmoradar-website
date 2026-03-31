<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { TowerControl, Radar, Globe } from "lucide-svelte";

	const tower = [
		"EDDF_TWR – Frankfurt",
		"EDDH_TWR – Hamburg",
		"EDDK_TWR – Köln",
		"EDDL_TWR – Düsseldorf",
		"EDDM_TWR – München"
	];

	const approach = [
		"EDDF_APP – Frankfurt",
		"EDDK_APP – Köln",
		"EDDL_APP – Düsseldorf"
	];

	const center = [
		"EDGG_CTR – Langen Radar",
		"EDWW_CTR – Bremen Radar",
		"EDMM_CTR – München Radar (fast vollständig)"
	];
</script>

<BasicPage>

	<main class="mx-auto max-w-7xl px-6 py-16">

		<!-- HERO -->
		<section class="mb-14">
			<h1 class="text-5xl font-black tracking-tight">
				VATSIM <span class="text-red-400">Endorsements</span>
			</h1>
			<p class="mt-4 text-white/60 max-w-2xl">
				Overview of all available ATC positions and sector permissions across Germany.
			</p>
		</section>

		<!-- GRID -->
		<div class="grid lg:grid-cols-3 gap-6">

			<!-- TOWER -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<TowerControl class="text-red-400" size={20} />
					<h2 class="text-lg font-semibold">Tower</h2>
				</div>

				<p class="text-xs text-white/40 mb-4 uppercase tracking-[0.25em]">
					All major airports
				</p>

				<div class="space-y-3">
					{#each tower as item}
						<div class="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
							<span class="text-sm">{item}</span>
							<span class="text-green-400 text-xs">ACTIVE</span>
						</div>
					{/each}
				</div>

				<div class="mt-5 text-sm text-white/50">
					❌ Ausnahme: <span class="text-red-400">EDDB (Berlin)</span>
				</div>
			</div>

			<!-- APPROACH -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Radar class="text-blue-400" size={20} />
					<h2 class="text-lg font-semibold">Approach</h2>
				</div>

				<p class="text-xs text-white/40 mb-4 uppercase tracking-[0.25em]">
					Selected sectors
				</p>

				<div class="space-y-3">
					{#each approach as item}
						<div class="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
							<span class="text-sm">{item}</span>
							<span class="text-green-400 text-xs">ACTIVE</span>
						</div>
					{/each}
				</div>

				<div class="mt-5 text-sm text-white/50 space-y-1">
					<div>❌ EDDB (Berlin)</div>
					<div>❌ EDDM (München)</div>
					<div>❌ EDDH (Hamburg)</div>
				</div>
			</div>

			<!-- CENTER -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Globe class="text-orange-400" size={20} />
					<h2 class="text-lg font-semibold">Center</h2>
				</div>

				<p class="text-xs text-white/40 mb-4 uppercase tracking-[0.25em]">
					High altitude sectors
				</p>

				<div class="space-y-3">
					{#each center as item}
						<div class="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
							<span class="text-sm">{item}</span>
							<span class="text-green-400 text-xs">ACTIVE</span>
						</div>
					{/each}
				</div>

				<div class="mt-5 text-sm text-white/50">
					⚠️ München: einzelne Sektoren eingeschränkt (z. B. EDMM_STA_CTR)
				</div>
			</div>

		</div>

		<!-- EXTRA INFO -->
		<section class="mt-14">
			<div class="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
				<h3 class="text-lg font-semibold mb-3">Additional Notes</h3>

				<p class="text-white/60 text-sm leading-relaxed">
					This overview is based on internal Tier 1 endorsements and is not publicly accessible via VATSIM.
					The data reflects current operational permissions across German FIRs and may change depending on training progress or network requirements.
				</p>
			</div>
		</section>

	</main>

</BasicPage>