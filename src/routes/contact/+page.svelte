<!-- also wie gesagt das Contact-form oder irgendeine Art und weise auf elmoradar@gmail.com hingewiesen für geschäftsanfragen hingewiesen wird -->
<script lang="ts">
	import {
		logo
	} from '$lib/assets/index.js';

    let mobileMenu = false;
</script>

<div class="min-h-screen bg-[#04070c] text-white overflow-x-hidden selection:bg-red-500/30 relative">

	<!-- BACKGROUND -->
	<div class="fixed inset-0 pointer-events-none">
		<div class="absolute inset-0">
			<div class="radar-sweep"></div>
		</div>

		<div
			class="absolute inset-0 opacity-[0.05]"
			style="
				background-image: 
					linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
					linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
				background-size: 80px 80px;
			"
		></div>

		<div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.12),transparent_30%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.08),transparent_30%)]"></div>
	</div>

	<!-- NAV -->
	<nav class="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05080e]/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-3">
				<img src={logo} alt="elmoradar logo" class="h-10 w-10 rounded-xl ring-1 ring-white/10" />
				<div>
					<div class="text-xs uppercase tracking-[0.28em] text-white/45">Air Ops</div>
					<div class="text-lg font-semibold">elmoradar</div>
				</div>
			</a>

			<div class="hidden md:flex gap-8 text-sm text-white/60">
				<a href="/" class="hover:text-white">Overview</a>
				<a href="/hardware" class="hover:text-white">Hardware</a>
				<a href="/vatsim" class="hover:text-white">Vatsim</a>
				<a href="/settings" class="transition hover:text-white">Settings</a>
			</div>

			<a
				href="https://twitch.tv/elmoradar"
				target="_blank"
				class="hidden md:inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
			>
				Open Stream
			</a>

			<button
				class="md:hidden h-11 w-11 rounded-xl border border-white/10 bg-white/5"
				onclick={() => (mobileMenu = !mobileMenu)}
			>
				☰
			</button>
		</div>
	</nav>
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