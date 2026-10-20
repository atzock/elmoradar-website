<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { i18n, LANGS } from '$lib/i18n/index.js';
	import { localePath, stripLang } from '$lib/i18n/config.js';

	const { children } = $props();

	// Remember the language for the next visit (read by hooks.server.ts when "/" is opened).
	$effect(() => {
		document.cookie = `lang=${i18n.lang}; path=/; max-age=31536000; samesite=lax`;
	});

	const rest = $derived(stripLang(page.url.pathname));
</script>

<svelte:head>
	<link rel="canonical" href={page.url.origin + page.url.pathname} />
	{#each LANGS as l}
		<link rel="alternate" hreflang={l} href={page.url.origin + localePath(l, rest)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={page.url.origin + localePath('de', rest)} />
	<meta property="og:locale" content={i18n.lang === 'de' ? 'de_DE' : 'en_GB'} />
</svelte:head>

{@render children()}
