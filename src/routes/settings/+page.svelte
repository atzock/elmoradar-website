<script lang="ts">
	const addons = [
		"HPG H145",
		"HPG H145 Action Pack",
		"H145 Soundpack",
		"Mission Script"
	];

	const hardware = [
		"WinWing / Ctrl Stick",
		"Thrustmaster Quadrant (Collective)"
	];

	const platforms = [
		{
			name: "Virtual Air Rescue",
			desc: "Einsätze mit Dispatcher & Roleplay",
			url: "https://virtualairrescue.com/"
		},
		{
			name: "VATSIM",
			desc: "Live ATC + andere Flugzeuge/Helikopter",
			url: "https://vatsim.net/"
		},
		{
			name: "ChasePlane",
			desc: "Cinematic Views & Kamera",
			url: "https://parallel42.com/products/chaseplane?srsltid=AfmBOoqBR5xMvRtWLFTvojmuo-C9R5RWdGKoN_hml7Pb8rNsPcJj01KM"
		}
	];
</script>

<div class="min-h-screen bg-[#04070c] text-white relative overflow-hidden">
    
	<!-- Background Glow -->
	<div class="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div class="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
        <div class="radar-sweep"></div>
    </div>

	<!-- Content -->
	<div class="relative max-w-6xl mx-auto px-6 py-20">

		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-5xl font-bold bg-linear-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
				H145 Helikopter Setup
			</h1>
			<p class="mt-4 text-white/60">
				Mein komplettes Setup für realistische Rettungs- und SAR-Einsätze im MSFS
			</p>
		</div>

		<!-- GRID -->
		<div class="grid md:grid-cols-2 gap-8">

			<!-- Addons -->
			<div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-red-500/40 transition">
				<p class="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Aircraft & Addons</p>
				<h2 class="text-xl font-semibold mb-4">H145 Setup</h2>

				<ul class="space-y-2">
					{#each addons as addon}
						<li class="flex items-center gap-3">
							<div class="w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.6)]"></div>
							{addon}
						</li>
					{/each}
				</ul>
			</div>

			<!-- Hardware -->
			<div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500/40 transition">
				<p class="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Hardware</p>
				<h2 class="text-xl font-semibold mb-4">Controls</h2>

				<ul class="space-y-2">
					{#each hardware as item}
						<li class="flex items-center gap-3">
							<div class="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(0,150,255,0.6)]"></div>
							{item}
						</li>
					{/each}
				</ul>

				<p class="mt-4 text-sm text-white/50">
					Settings sind im Discord unter <span class="text-white">💻｜equipment-n-settings</span> angepinnt
				</p>
			</div>

			<!-- Platforms -->
			<div class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-purple-500/40 transition md:col-span-2">
				<p class="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Mission & Multiplayer</p>
				<h2 class="text-xl font-semibold mb-4">Tools & Plattformen</h2>

				<div class="grid md:grid-cols-3 gap-4">
					{#each platforms as tool}
						<a href={tool.url} target="_blank"
							class="block p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-red-400/40 hover:-translate-y-1 transition">
							
							<p class="font-semibold">{tool.name}</p>
							<p class="text-sm text-white/50 mt-1">{tool.desc}</p>
						</a>
					{/each}
				</div>
			</div>

		</div>

		<!-- INFO BOX -->
		<div class="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
			<p class="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Hinweise</p>

			<div class="grid md:grid-cols-2 gap-6 text-sm text-white/70">
				<p>
					Diese Konfiguration ist speziell auf realistische H145 Einsätze ausgelegt, inklusive SAR, MedEvac und Roleplay Missionen.
				</p>
				<p>
					Für optimale Performance empfehle ich meine Grafiksettings (separate Seite), abgestimmt auf RTX 4070 + i7-12700K.
				</p>
			</div>
		</div>

	</div>
</div>

<style>
    .radar-sweep {
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 0, 0, 0.08) 20deg,
            transparent 60deg
        );
        animation: radarRotate 8s linear infinite;
    }

    @keyframes radarRotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>