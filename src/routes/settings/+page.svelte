<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { Monitor, Cpu, Sliders, Cloud } from "lucide-svelte";

	const general = [
		{ label: "Resolution", value: "2560x1440" },
		{ label: "Anti-Aliasing", value: "TAA" },
		{ label: "Render Scaling", value: "100" },
		{ label: "DLSS Frame Generation", value: "On" },
		{ label: "Max FPS", value: "60 FPS" },
		{ label: "NVIDIA Reflex", value: "On" }
	];

	const traffic = [
		{ label: "Aircraft Traffic", value: "Off" },
		{ label: "Ground Aircraft", value: "Off" },
		{ label: "Vehicles", value: "Medium" },
		{ label: "Road Traffic", value: "High" },
		{ label: "Ships", value: "Ultra" },
		{ label: "Fauna", value: "Low" }
	];

	const graphics = [
		{ label: "Terrain LOD", value: "Dynamic (170 → 300)" },
		{ label: "Object LOD", value: "140" },
		{ label: "Buildings", value: "Ultra" },
		{ label: "Trees", value: "Ultra" },
		{ label: "Grass", value: "Ultra" },
		{ label: "Clouds", value: "Ultra" },
		{ label: "Textures", value: "Ultra" }
	];

	const autofps = [
		{ label: "Mode", value: "Auto TLOD" },
		{ label: "TLOD Base", value: "170 @ Ground" },
		{ label: "TLOD Max", value: "300 @ High Altitude" },
		{ label: "OLOD Base", value: "140" },
		{ label: "OLOD Max", value: "130 → 10000ft" }
	];
</script>

<BasicPage>

	<main class="mx-auto max-w-7xl px-6 py-16">

		<!-- HERO -->
		<section class="mb-14">
			<h1 class="text-5xl font-black tracking-tight">
				MSFS <span class="text-red-400">Settings</span>
			</h1>
			<p class="mt-4 text-white/60 max-w-2xl">
				Optimized performance and visual settings for Microsoft Flight Simulator — tuned for smooth VATSIM operations and streaming.
			</p>
            <p class="mt-2 text-sm text-white/40 max-w-2xl">
                These settings are based on my personal experience and may not be optimal for everyone. Adjust them according to your hardware capabilities and preferences.
            </p>
		</section>

		<!-- GRID -->
		<div class="grid lg:grid-cols-2 gap-6">

			<!-- GENERAL -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Monitor class="text-blue-400" size={20} />
					<h2 class="text-lg font-semibold">General</h2>
				</div>

				<div class="space-y-3">
					{#each general as item}
						<div class="flex justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
							<span class="text-sm text-white/60">{item.label}</span>
							<span class="text-sm font-semibold">{item.value}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- TRAFFIC -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Sliders class="text-red-400" size={20} />
					<h2 class="text-lg font-semibold">Traffic & Environment</h2>
				</div>

				<div class="space-y-3">
					{#each traffic as item}
						<div class="flex justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
							<span class="text-sm text-white/60">{item.label}</span>
							<span class="text-sm font-semibold">{item.value}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- GRAPHICS -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Cloud class="text-purple-400" size={20} />
					<h2 class="text-lg font-semibold">Graphics</h2>
				</div>

				<div class="space-y-3">
					{#each graphics as item}
						<div class="flex justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
							<span class="text-sm text-white/60">{item.label}</span>
							<span class="text-sm font-semibold">{item.value}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- AUTO FPS -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Cpu class="text-green-400" size={20} />
					<h2 class="text-lg font-semibold">AutoFPS System</h2>
				</div>

				<div class="space-y-3 mb-4">
					{#each autofps as item}
						<div class="flex justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
							<span class="text-sm text-white/60">{item.label}</span>
							<span class="text-sm font-semibold">{item.value}</span>
						</div>
					{/each}
				</div>

				<div class="text-sm text-white/60 leading-relaxed">
					AutoFPS dynamically adjusts Terrain Level of Detail (TLOD) based on altitude.
					On the ground, lower values are used to improve performance.
					As altitude increases, TLOD is raised to render more terrain and maintain visual quality.
				</div>
			</div>

		</div>

	</main>

</BasicPage>