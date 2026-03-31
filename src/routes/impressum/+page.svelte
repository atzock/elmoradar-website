<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { FileText, Mail, Shield, User } from "lucide-svelte";
</script>

<BasicPage>

	<main class="mx-auto max-w-5xl px-6 py-16">

		<!-- HERO -->
		<section class="mb-14">
			<h1 class="text-5xl font-black tracking-tight">
				<span class="text-red-400">Impressum</span>
			</h1>
			<p class="mt-4 text-white/60 max-w-2xl">
				Angaben gemäß § 5 TMG sowie weitere rechtliche Informationen.
			</p>
		</section>

		<!-- GRID -->
		<div class="grid md:grid-cols-2 gap-6">

			<!-- ANBIETER -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<FileText class="text-red-400" size={20} />
					<h2 class="text-lg font-semibold">Anbieter</h2>
				</div>

				<p class="text-white/70 leading-relaxed text-sm">
					elmoradar – Marvin Schubert<br><br>

					c/o Online-Impressum #7296<br>
					Europaring 90<br>
					53757 Sankt Augustin<br>
					Deutschland
				</p>
			</div>

			<!-- KONTAKT -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Mail class="text-blue-400" size={20} />
					<h2 class="text-lg font-semibold">Kontakt</h2>
				</div>

				<p class="text-white/70 text-sm mb-4">
					E-Mail:
				</p>

				<a
					href="mailto:elmoradar@gmail.com"
					class="inline-block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-red-400 hover:text-red-300 hover:border-red-500/30 transition"
				>
					elmoradar@gmail.com
				</a>

				<p class="mt-6 text-white/70 text-sm">
					USt-IdNr:<br>
					<span class="text-white">DE341737088</span>
				</p>
			</div>

			<!-- VERANTWORTLICH -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<User class="text-yellow-400" size={20} />
					<h2 class="text-lg font-semibold">Inhaltlich verantwortlich</h2>
				</div>

				<p class="text-white/70 text-sm leading-relaxed">
					Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br>
					<span class="text-white">Marvin Schubert</span>
				</p>
			</div>

			<!-- AUFSICHT -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
				<div class="flex items-center gap-3 mb-4">
					<Shield class="text-green-400" size={20} />
					<h2 class="text-lg font-semibold">Aufsichtsbehörde</h2>
				</div>

				<p class="text-white/70 text-sm leading-relaxed">
					Medienanstalt Berlin-Brandenburg<br>
					Sitz: Deutschland
				</p>
			</div>

		</div>

	</main>

</BasicPage>