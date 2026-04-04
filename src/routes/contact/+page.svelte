<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
</script>

<svelte:head>
	<title>Kontakt – elmoradar</title>
</svelte:head>

<BasicPage>
	<div class="px-2 sm:px-6 max-w-2xl">

		<section class="pt-4 pb-12 border-b border-white/[0.07]">
			<h1 class="text-3xl font-bold tracking-tight mb-3">Kontakt</h1>
			<p class="text-white/50 text-base max-w-md">
				Kooperationen, Anfragen oder einfach kurz Hallo sagen — am schnellsten per Mail oder Discord.
			</p>
		</section>

		<div class="py-12 space-y-10">

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-5">E-Mail</h2>
				<a
					href="mailto:elmoradar@gmail.com"
					class="text-lg font-medium text-white hover:text-red-400 transition-colors"
				>
					elmoradar@gmail.com
				</a>
				<p class="mt-3 text-sm text-white/35">
					Antwortzeit in der Regel 24–48 Stunden. Bitte relevante Details direkt mitschicken.
				</p>
			</div>

			<div>
				<h2 class="text-xs text-white/30 uppercase tracking-widest mb-5">Discord</h2>
				<a
					href="https://discord.gg/elmoradar"
					target="_blank"
					rel="noopener noreferrer"
					class="text-lg font-medium text-white hover:text-red-400 transition-colors"
				>
					discord.gg/elmoradar
				</a>
				<p class="mt-3 text-sm text-white/35">
					Für alles, was nicht dringend ist — Community, Fragen, Smalltalk.
				</p>
			</div>

		</div>

	</div>
</BasicPage>
