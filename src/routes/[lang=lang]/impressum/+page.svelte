<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { i18n } from '$lib/i18n/index.js';

	const t = $derived(i18n.t);
</script>

<svelte:head>
	<title>{t.imprint.title}</title>
</svelte:head>

<BasicPage>
	<div>

		<section class="page-hero">
			<div class="relative">
				<p class="eyebrow eyebrow-rule mb-4">{t.legal.eyebrow}</p>
				<h1 class="page-title mb-5">{t.imprint.heading}</h1>
				<p class="text-white/50 text-sm leading-relaxed">{t.imprint.intro}</p>
			</div>
		</section>

		<div class="max-w-2xl">

		{#if t.legal.notice}
			<p class="mt-8 border-l-2 border-accent pl-4 text-sm text-fg-muted">{t.legal.notice}</p>
		{/if}

		<div class="py-10 space-y-10 text-sm text-white/60 leading-relaxed">

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-wider mb-4">{t.imprint.provider}</h2>
				<p>
					elmoradar – Marvin Schubert<br>
					c/o Online-Impressum #7296<br>
					Europaring 90<br>
					53757 Sankt Augustin<br>
					{t.imprint.country}
				</p>
			</div>

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-wider mb-4">{t.imprint.contact}</h2>
				<p class="mb-3">{t.imprint.email}</p>
				<a href="mailto:elmoradar@gmail.com" class="text-white hover:text-accent-hover transition-colors">
					elmoradar@gmail.com
				</a>
				<p class="mt-5">
					{t.imprint.vat} <span class="text-white">DE341737088</span>
				</p>
			</div>

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-wider mb-4">{t.imprint.responsible}</h2>
				<p>{t.imprint.responsibleText}<br>
				<span class="text-white">Marvin Schubert</span></p>
			</div>

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-wider mb-4">{t.imprint.authority}</h2>
				<p>{t.imprint.authorityText}<br>{t.imprint.authoritySeat}</p>
			</div>

		</div>

	</div>
		</div>
</BasicPage>
