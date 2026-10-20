<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { i18n } from '$lib/i18n/index.js';

	const t = $derived(i18n.t);
</script>

<svelte:head>
	<title>{t.msfs.title}</title>
</svelte:head>

<BasicPage>
	<div>

		<section class="page-hero">
			<div class="relative max-w-2xl">
				<p class="eyebrow eyebrow-rule mb-4">{t.msfs.pageEyebrow}</p>
				<h1 class="page-title mb-5">MSFS <em>Settings</em></h1>
				<p class="text-white/50 text-base leading-relaxed">{t.msfs.pageIntro}</p>
			</div>
		</section>

		<div class="py-12 grid gap-12 sm:grid-cols-2">
			{#each t.msfs.sections as section}
				<div>
					<h2 class="text-xs text-white/30 uppercase tracking-wider mb-6">{section.title}</h2>
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
