<script lang="ts">
	import { logo } from '$lib/assets/index.js';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';

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

<div class="min-h-screen bg-[#04070c] text-white overflow-x-hidden selection:bg-red-500/30 relative">

	<!-- BACKGROUND -->
	<div class="fixed inset-0 pointer-events-none">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.09),transparent_55%)]"></div>
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.04),transparent_50%)]"></div>
	</div>

	<!-- NAVBAR -->
	<nav class="fixed inset-x-0 top-0 z-50">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
			<div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl px-5 py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

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
						class="hidden md:inline-flex items-center gap-2 rounded-full bg-[#9147ff] px-4 py-2 text-sm font-semibold hover:bg-[#7d3bd6] shadow-[0_0_20px_rgba(145,71,255,0.35)] transition-colors"
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
									<span class="ml-auto h-1.5 w-1.5 rounded-full bg-[#9147ff]"></span>
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
							class="flex items-center justify-center gap-2 w-full rounded-xl bg-[#9147ff] py-3 text-sm font-semibold hover:bg-[#7d3bd6] transition-colors"
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

	<!-- GLOBAL FOOTER -->
	<footer class="relative z-10 border-t border-white/6 px-4">
		<div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
			<p class="text-xs text-white/20">
				&copy; {new Date().getFullYear()} elmoradar. Alle Rechte vorbehalten.
			</p>
			<a href="/impressum" class="text-xs text-white/20 hover:text-white/50 transition-colors">
				Impressum
			</a>
		</div>
	</footer>

</div>
