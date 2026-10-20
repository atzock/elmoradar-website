<script lang="ts">
	import type { Snippet } from 'svelte';
	import { logo } from '$lib/assets/index.js';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import CookieBanner from '$lib/components/cookie-banner.svelte';
	import LangSwitch from '$lib/components/lang-switch.svelte';
	import { i18n } from '$lib/i18n/index.js';
	import { stripLang } from '$lib/i18n/config.js';

	let { children }: { children?: Snippet } = $props();

	let mobileMenu = $state(false);

	const t = $derived(i18n.t);
	const navItems = $derived([
		{ name: t.nav.home, path: '/' },
		{ name: t.nav.hardware, path: '/hardware' },
		{ name: t.nav.addons, path: '/addons' },
		{ name: t.nav.vatsim, path: '/vatsim' },
		{ name: t.nav.videos, path: '/videos' },
		{ name: t.nav.contact, path: '/contact' }
	]);

	const isActive = (path: string) => {
		const here = stripLang(page.url.pathname);
		return path === '/' ? here === '/' : here.startsWith(path);
	};
</script>

<div class="min-h-screen bg-bg text-fg overflow-x-hidden selection:bg-accent-soft font-sans flex flex-col">
	<header class="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-accent">
		<nav class="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-6" aria-label={t.nav.label}>
			<a href={i18n.href()} class="flex items-center gap-2.5 shrink-0">
				<img src={logo} alt="" class="h-7 w-7 rounded-md" />
				<span class="font-semibold tracking-tight">elmoradar</span>
			</a>

			<div class="hidden lg:flex items-stretch gap-1 h-full">
				{#each navItems as item}
					<a
						href={i18n.href(item.path)}
						aria-current={isActive(item.path) ? 'page' : undefined}
						class="relative flex items-center whitespace-nowrap px-3 text-sm transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-accent after:origin-left after:transition-transform after:duration-200 motion-reduce:after:transition-none {isActive(item.path)
							? 'text-fg bg-gradient-to-t from-accent/12 to-transparent'
							: 'text-fg-muted hover:text-fg after:scale-x-0 hover:after:scale-x-100'}"
					>
						{item.name}
					</a>
				{/each}
			</div>

			<div class="flex items-center gap-2">
				<LangSwitch class="hidden lg:inline-flex" />
				<a href="https://twitch.tv/elmoradar" target="_blank" rel="noopener noreferrer" class="btn btn-primary hidden lg:inline-flex !py-1.5">
					<svg viewBox="0 0 24 24" class="w-3.5 h-3.5 fill-current" aria-hidden="true"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
					{t.nav.stream}
				</a>
				<button
					class="lg:hidden h-10 w-10 rounded-md border border-line bg-surface flex items-center justify-center text-fg-muted hover:text-fg transition-colors"
					onclick={() => (mobileMenu = !mobileMenu)}
					aria-label={mobileMenu ? t.nav.closeMenu : t.nav.openMenu}
					aria-expanded={mobileMenu}
				>
					{#if mobileMenu}<X size={18} />{:else}<Menu size={18} />{/if}
				</button>
			</div>
		</nav>

		{#if mobileMenu}
			<div transition:slide={{ duration: 150 }} class="lg:hidden border-t border-line bg-bg-2">
				<div class="px-4 py-2 flex flex-col">
					{#each navItems as item}
						<a
							href={i18n.href(item.path)}
							onclick={() => (mobileMenu = false)}
							aria-current={isActive(item.path) ? 'page' : undefined}
							class="flex items-center justify-between py-3 text-sm border-b border-line last:border-0 {isActive(item.path) ? 'text-fg' : 'text-fg-muted'}"
						>
							{item.name}
							{#if isActive(item.path)}<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>{/if}
						</a>
					{/each}
				</div>
				<div class="px-4 pb-4 grid gap-3">
					<LangSwitch class="flex w-full [&>a]:flex-1 [&>a]:py-2.5" onselect={() => (mobileMenu = false)} />
					<a href="https://twitch.tv/elmoradar" target="_blank" rel="noopener noreferrer" onclick={() => (mobileMenu = false)} class="btn btn-primary w-full">{t.nav.openStream}</a>
				</div>
			</div>
		{/if}
	</header>

	<main class="flex-1 pb-12">
		<div class="mx-auto max-w-6xl px-4 sm:px-6">
			{@render children?.()}
		</div>
	</main>

	<CookieBanner />

	<footer class="border-t border-line bg-bg-2">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
			<p class="text-xs text-fg-subtle">&copy; {new Date().getFullYear()} elmoradar. {t.footer.rights}</p>
			<div class="flex items-center gap-5">
				<a href={i18n.href('/impressum')} class="text-xs text-fg-muted hover:text-fg transition-colors">{t.footer.imprint}</a>
				<a href={i18n.href('/datenschutz')} class="text-xs text-fg-muted hover:text-fg transition-colors">{t.footer.privacy}</a>
			</div>
		</div>
	</footer>
</div>
