<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import { Mail, Send } from "lucide-svelte";
</script>

<BasicPage>

	<main class="mx-auto max-w-5xl px-6 py-16">

		<!-- HERO -->
		<section class="mb-14">
			<h1 class="text-5xl font-black tracking-tight">
				Contact <span class="text-red-400">Ops</span>
			</h1>
			<p class="mt-4 text-white/60 max-w-2xl">
				Business inquiries, collaborations or general questions — feel free to reach out.
			</p>
		</section>

		<!-- CONTACT CARD -->
		<div class="grid md:grid-cols-2 gap-6">

			<!-- EMAIL -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

				<div class="flex items-center gap-3 mb-4">
					<Mail class="text-red-400" size={20} />
					<h2 class="text-lg font-semibold">Email Contact</h2>
				</div>

				<p class="text-sm text-white/50 mb-6">
					Direct contact for business-related topics, partnerships or inquiries.
				</p>

				<a
					href="mailto:elmoradar@gmail.com"
					class="block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-lg font-semibold text-red-400 hover:text-red-300 hover:border-red-500/30 transition"
				>
					elmoradar@gmail.com
				</a>

			</div>

			<!-- INFO -->
			<div class="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

				<div class="flex items-center gap-3 mb-4">
					<Send class="text-blue-400" size={20} />
					<h2 class="text-lg font-semibold">Information</h2>
				</div>

				<ul class="text-sm text-white/60 space-y-3">
					<li>• Response time usually within 24–48 hours</li>
					<li>• Please include relevant details in your request</li>
					<li>• Business & collaboration inquiries preferred via email</li>
				</ul>

			</div>

		</div>

	</main>

</BasicPage>