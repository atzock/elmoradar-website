<script lang="ts">
	import { logo } from '$lib/assets/index.js';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import CookieBanner from '$lib/components/cookie-banner.svelte';

	let { children } = $props();

	let mobileMenu = $state(false);

	const navItems = [
		{ name: 'Übersicht', href: '/' },
		{ name: 'Hardware & Settings', href: '/hardware' },
		{ name: 'Meine Addons', href: '/addons' },
		{ name: 'VATSIM', href: '/vatsim' },
		{ name: 'Kontakt', href: '/contact' }
	];
</script>

<div class="min-h-screen bg-[#0a0506] text-white overflow-x-hidden selection:bg-red-500/40 relative">

	<!-- ═══════════════════════════════════════════════════
	     BACKGROUND SYSTEM
	═══════════════════════════════════════════════════ -->
	<div class="bg-system" aria-hidden="true">

		<!-- Layer 1: Ambient red glow blobs -->
		<div class="bg-blob blob-alpha"></div>
		<div class="bg-blob blob-beta"></div>
		<div class="bg-blob blob-gamma"></div>

		<!-- Layer 2: Fine grid overlay -->
		<div class="bg-grid"></div>

		<!-- Layer 4: Radar sweep -->
		<div class="radar-sweep-origin">
			<div class="radar-sweep"></div>
		</div>

		<!-- Layer 5: Edge vignette -->
		<div class="bg-vignette"></div>

	</div>

	<!-- NAVBAR -->
	<nav class="fixed inset-x-0 top-0 z-50">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
			<div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl px-5 py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.6),0_1px_0_rgba(239,68,68,0.1)]">

				<!-- LOGO -->
				<a href="/" class="flex items-center gap-3 shrink-0">
					<img src={logo} alt="elmoradar logo" class="h-9 w-9 rounded-xl ring-1 ring-white/10" />
					<div>
						<div class="text-[10px] uppercase tracking-[0.35em] text-white/35 leading-none mb-1">VATSIM ATC & Pilot</div>
						<div class="text-base font-semibold tracking-wide leading-none">elmoradar</div>
					</div>
				</a>

				<!-- NAV DESKTOP -->
				<div class="hidden md:flex items-center gap-0.5">
					{#each navItems as item}
						<a
							href={item.href}
							class="px-3 py-2 rounded-lg text-sm transition-colors {page.url.pathname === item.href
								? 'text-white bg-white/8 font-medium'
								: 'text-white/50 hover:text-white hover:bg-white/5'}"
						>
							{item.name}
						</a>
					{/each}
				</div>

				<!-- CTA + MOBILE BUTTON -->
				<div class="flex items-center gap-2">
					<a
						href="https://twitch.tv/elmoradar"
						target="_blank"
						class="hidden md:inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-colors"
					>
						<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current shrink-0">
							<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
						</svg>
						Stream
					</a>
					<button
						class="md:hidden h-9 w-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/8 transition-colors"
						onclick={() => (mobileMenu = !mobileMenu)}
						aria-label="Menü öffnen"
					>
						{#if mobileMenu}
							<X size={17} />
						{:else}
							<Menu size={17} />
						{/if}
					</button>
				</div>
			</div>

			<!-- MOBILE MENU -->
			{#if mobileMenu}
				<div
					transition:slide={{ duration: 180 }}
					class="mt-2 rounded-2xl border border-white/10 bg-[#070c14] backdrop-blur-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.7)] md:hidden"
				>
					<div class="p-2.5 flex flex-col gap-0.5">
						{#each navItems as item}
							<a
								href={item.href}
								onclick={() => (mobileMenu = false)}
								class="flex items-center px-4 py-3 rounded-xl text-sm transition-colors {page.url.pathname === item.href
									? 'text-white bg-white/8 font-medium'
									: 'text-white/55 hover:text-white hover:bg-white/5'}"
							>
								{item.name}
								{#if page.url.pathname === item.href}
									<span class="ml-auto h-1.5 w-1.5 rounded-full bg-red-500"></span>
								{/if}
							</a>
						{/each}
					</div>
					<div class="px-2.5 pb-2.5">
						<div class="h-px bg-white/6 mb-2.5"></div>
						<a
							href="https://twitch.tv/elmoradar"
							target="_blank"
							onclick={() => (mobileMenu = false)}
							class="flex items-center justify-center gap-2 w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold hover:bg-purple-500 transition-colors"
						>
							<svg viewBox="0 0 24 24" class="w-4 h-4 fill-current shrink-0">
								<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
							</svg>
							Stream öffnen
						</a>
					</div>
				</div>
			{/if}
		</div>
	</nav>

	<!-- PAGE CONTENT -->
	<div class="relative z-10 pt-28 pb-8 px-4">
		<div class="mx-auto max-w-7xl">
			{@render children()}
		</div>
	</div>

	<CookieBanner />

	<!-- GLOBAL FOOTER -->
	<footer class="relative z-10 border-t border-white/6 px-4">
		<div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
			<p class="text-xs text-white/20">&copy; {new Date().getFullYear()} elmoradar. Alle Rechte vorbehalten.</p>
			<a href="/impressum" class="text-xs text-white/20 hover:text-white/50 transition-colors">Impressum</a>
			<a href="/datenschutz" class="text-xs text-white/20 hover:text-white/50 transition-colors">Datenschutzerklärung</a>
		</div>
	</footer>

</div>

<style>
	/* ─── Background system container ─────────────────── */
	.bg-system {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	/* ─── Ambient red glow blobs ───────────────────────── */
	.bg-blob {
		position: absolute;
		inset: 0;
	}

	/* Primary: large warm red bloom, top-left */
	.blob-alpha {
		background: radial-gradient(
			ellipse 80% 60% at -8% 5%,
			rgba(220, 38, 38, 0.16) 0%,
			transparent 62%
		);
	}

	/* Secondary: deep red, bottom-right counter-bloom */
	.blob-beta {
		background: radial-gradient(
			ellipse 65% 50% at 108% 95%,
			rgba(185, 28, 28, 0.11) 0%,
			transparent 58%
		);
	}

	/* Tertiary: faint top-center atmospheric halo */
	.blob-gamma {
		background: radial-gradient(
			ellipse 45% 30% at 50% -4%,
			rgba(239, 68, 68, 0.06) 0%,
			transparent 55%
		);
	}

	/* ─── Grid overlay ─────────────────────────────────── */
	.bg-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 0, 0, 0.022) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 0, 0, 0.022) 1px, transparent 1px);
		background-size: 60px 60px;
	}


	/* ─── Radar sweep ──────────────────────────────────── */
	/* Oversized square anchored to viewport center for rotation */
	.radar-sweep-origin {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 300vmax;
		height: 300vmax;
		transform: translate(-50%, -50%);
	}

	.radar-sweep {
		position: absolute;
		inset: 0;
		background: conic-gradient(
			from 0deg at 50% 50%,
			transparent 0deg,
			rgba(239, 68, 68, 0.065) 8deg,
			rgba(239, 68, 68, 0.038) 22deg,
			rgba(239, 68, 68, 0.012) 44deg,
			transparent 64deg
		);
		animation: radarSweep 12s linear infinite;
		will-change: transform;
		transform-origin: center center;
	}

	@keyframes radarSweep {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}

	@media (prefers-reduced-motion: reduce) {
		.radar-sweep { animation: none; }
	}

	/* ─── Edge vignette ────────────────────────────────── */
	.bg-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse 140% 120% at 50% 50%,
			transparent 28%,
			rgba(2, 4, 8, 0.78) 100%
		);
	}
</style>
