<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
</script>

<svelte:head>
	<title>Impressum – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-6 max-w-2xl">

		<section class="pt-4 pb-12 border-b border-white/[0.07]">
			<h1 class="text-3xl font-bold tracking-tight mb-3">Impressum</h1>
			<p class="text-white/50 text-sm">Angaben gemäß § 5 TMG.</p>
		</section>

		<div class="py-10 space-y-10 text-sm text-white/60 leading-relaxed">

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-4">Anbieter</h2>
				<p>
					elmoradar – Marvin Schubert<br>
					c/o Online-Impressum #7296<br>
					Europaring 90<br>
					53757 Sankt Augustin<br>
					Deutschland
				</p>
			</div>

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-4">Kontakt</h2>
				<p class="mb-3">E-Mail:</p>
				<a href="mailto:elmoradar@gmail.com" class="text-white hover:text-red-400 transition-colors">
					elmoradar@gmail.com
				</a>
				<p class="mt-5">
					USt-IdNr.: <span class="text-white">DE341737088</span>
				</p>
			</div>

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-4">Inhaltlich verantwortlich</h2>
				<p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br>
				<span class="text-white">Marvin Schubert</span></p>
			</div>

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-4">Aufsichtsbehörde</h2>
				<p>Medienanstalt Berlin-Brandenburg<br>Sitz: Deutschland</p>
			</div>

		</div>

	</div>
</BasicPage>
