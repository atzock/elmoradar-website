<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';

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
		{ label: 'TLOD in Reiseflughöhe', value: '300' },
		{ label: 'OLOD Basis', value: '140' },
		{ label: 'OLOD ab 10.000 ft', value: '130' }
	];

	type Section = { title: string; note?: string; items: { label: string; value: string }[] };

	const sections: Section[] = [
		{ title: 'Allgemein', items: general },
		{ title: 'Traffic & Umgebung', items: traffic },
		{ title: 'Grafik', items: graphics },
		{
			title: 'AutoFPS',
			note: 'AutoFPS passt den Terrain LOD dynamisch je nach Flughöhe an — weniger Detail am Boden für Performance, mehr in der Luft für Optik.',
			items: autofps
		}
	];
</script>

<svelte:head>
	<title>MSFS Settings – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-6">

		<section class="pt-4 pb-12 border-b border-white/[0.07]">
			<h1 class="text-3xl font-bold tracking-tight mb-3">MSFS Settings</h1>
			<p class="text-white/50 text-base max-w-lg">
				Meine aktuellen Einstellungen — optimiert für VATSIM-Betrieb und Streaming auf der RTX 5090.
				Nicht für jeden Rechner geeignet, aber als Referenz ganz nützlich.
			</p>
		</section>

		<div class="py-12 grid gap-12 sm:grid-cols-2">
			{#each sections as section}
				<div>
					<h2 class="text-xs text-white/30 uppercase tracking-widest mb-6">{section.title}</h2>
					<div class="space-y-0">
						{#each section.items as item}
							<div class="flex justify-between py-3 border-b border-white/[0.07] text-sm">
								<span class="text-white/45">{item.label}</span>
								<span class="font-medium">{item.value}</span>
							</div>
						{/each}
					</div>
					{#if section.note}
						<p class="mt-5 text-xs text-white/30 leading-relaxed">{section.note}</p>
					{/if}
				</div>
			{/each}
		</div>

	</div>
</BasicPage>
