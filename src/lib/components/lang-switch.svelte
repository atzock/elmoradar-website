<script lang="ts">
	import { i18n, LANGS, type Lang } from '$lib/i18n/index.js';

	let { class: className = '', onselect }: { class?: string; onselect?: () => void } = $props();

	const label = (l: Lang) => (l === 'de' ? i18n.t.lang.switchToDe : i18n.t.lang.switchToEn);
</script>

<div role="group" aria-label={i18n.t.lang.group} class="items-center rounded-md border border-line bg-surface p-0.5 {className}">
	{#each LANGS as l}
		{@const active = i18n.lang === l}
		<a
			href={i18n.switchHref(l)}
			hreflang={l}
			lang={l}
			rel="alternate"
			aria-label={label(l)}
			aria-current={active ? 'true' : undefined}
			data-sveltekit-noscroll
			onclick={onselect}
			class="min-w-9 px-2.5 py-1 text-center text-xs font-medium tracking-wide rounded-[5px] transition-colors duration-150
				{active ? 'bg-accent-soft text-accent-hover shadow-[inset_0_-2px_0_var(--color-accent)]' : 'text-fg-muted hover:text-fg'}"
		>
			{i18n.t.lang[l]}
		</a>
	{/each}
</div>
