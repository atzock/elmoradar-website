<script lang="ts">
	import { logo } from '$lib/assets/index.js';

	let mobileMenu = false;

	const navItems = [
		{ name: 'Overview', href: '/' },
		{ name: 'Hardware', href: '/hardware' },
		{ name: 'Vatsim', href: '/vatsim' },
		{ name: 'MSFS Settings', href: '/settings' },
		{ name: 'Impressum', href: '/impressum' },
		{ name: 'Kontakt', href: '/contact' }
	];
</script>

<div class="min-h-screen bg-[#04070c] text-white overflow-x-hidden selection:bg-red-500/30 relative">

	<!-- BACKGROUND SYSTEM -->
	<div class="fixed inset-0 pointer-events-none">
		<!-- RADAR SWEEP -->
		<div class="absolute inset-0">
			<div class="radar-sweep"></div>
		</div>

		<!-- GRID -->
		<div
			class="absolute inset-0 opacity-[0.05]"
			style="
				background-image: 
					linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
					linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
				background-size: 80px 80px;
			"
		></div>

		<!-- LIGHT ZONES -->
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(239,68,68,0.12),transparent_35%),radial-gradient(circle_at_85%_70%,rgba(59,130,246,0.08),transparent_35%)]"></div>
	</div>

	<!-- NAVBAR -->
	<nav class="fixed inset-x-0 top-0 z-50">
		<div class="mx-auto max-w-7xl px-6 pt-4">
			<div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

				<!-- LOGO -->
				<a href="/" class="flex items-center gap-3">
					<img src={logo} alt="elmoradar logo" class="h-10 w-10 rounded-xl ring-1 ring-white/10" />
					<div>
						<div class="text-[10px] uppercase tracking-[0.35em] text-white/40">Air Ops</div>
						<div class="text-lg font-semibold tracking-wide">elmoradar</div>
					</div>
				</a>

				<!-- NAV DESKTOP -->
				<div class="hidden md:flex items-center gap-6 text-sm">
					{#each navItems as item}
						<a
							href={item.href}
							class="relative text-white/60 hover:text-white transition"
						>
							{item.name}

							<!-- hover underline glow -->
							<span class="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
						</a>
					{/each}
				</div>

				<!-- CTA -->
				<div class="hidden md:flex items-center gap-3">
					<a
						href="https://twitch.tv/elmoradar"
						target="_blank"
						class="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.45)] transition"
					>
						Open Stream
					</a>
				</div>

				<!-- MOBILE BUTTON -->
				<button
					class="md:hidden h-11 w-11 rounded-xl border border-white/10 bg-white/5 backdrop-blur"
					on:click={() => (mobileMenu = !mobileMenu)}
				>
					☰
				</button>
			</div>

			<!-- MOBILE MENU -->
			{#if mobileMenu}
				<div class="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
					<div class="flex flex-col gap-4 text-sm text-white/70">
						{#each navItems as item}
							<a href={item.href} class="hover:text-white transition">
								{item.name}
							</a>
						{/each}

						<a
							href="https://twitch.tv/elmoradar"
							target="_blank"
							class="mt-2 rounded-xl bg-red-600 px-4 py-2 text-center font-semibold hover:bg-red-500"
						>
							Open Stream
						</a>
					</div>
				</div>
			{/if}
		</div>
	</nav>

	<!-- PAGE CONTENT -->
	<div class="relative z-10 pt-32 px-4">
		<div class="mx-auto max-w-7xl">
			<slot />
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
		animation: radarRotate 10s linear infinite;
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