<script lang="ts">
	import { fly } from 'svelte/transition';
	import { consent } from '$lib/stores/consent';
	import logo from '$lib/assets/logo.webp?url';
	import Cookie from 'lucide-svelte/icons/cookie';
</script>

{#if $consent === 'pending'}
	<div
		class="fixed inset-x-0 bottom-0 z-[60]"
		transition:fly={{ y: 100, duration: 320 }}
	>
		<!-- Peeking Elmo: h-11 container clips to top-half only, image peeks up via animation -->
		<div class="absolute right-6 sm:right-10 bottom-full h-11 w-22 overflow-hidden pointer-events-none">
			<img
				src={logo}
				alt=""
				aria-hidden="true"
				class="w-22 h-22 rounded-2xl elmo-peek"
			/>
		</div>

		<!-- Hairline glow at banner top edge -->
		<div class="h-px bg-linear-to-r from-transparent via-red-500/20 to-transparent"></div>

		<!-- Banner body -->
		<div class="bg-[#060b12]/97 backdrop-blur-2xl">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
				<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">

					<!-- Icon + Text -->
					<div class="flex items-start gap-3 flex-1 min-w-0">
						<div class="p-2 rounded-lg bg-white/4 border border-white/6 shrink-0 mt-0.5">
							<Cookie size={14} class="text-white/35" />
						</div>
						<div>
							<p class="text-sm font-semibold text-white/70 mb-1">Cookies & externe Inhalte</p>
							<p class="text-xs text-white/35 leading-relaxed max-w-lg">
								YouTube-Embeds laden externe Inhalte und setzen Cookies erst nach deiner Zustimmung.
								<a
									href="/datenschutz"
									class="text-white/45 hover:text-white/80 underline underline-offset-2 transition-colors ml-1"
								>
									Datenschutzerklärung
								</a>
							</p>
						</div>
					</div>

					<!-- Buttons -->
					<div class="flex items-center gap-2 shrink-0 pl-9.5 sm:pl-0">
						<button
							onclick={() => consent.decline()}
							class="px-4 py-2 rounded-xl text-xs text-white/38 hover:text-white/65 bg-white/2 hover:bg-white/5 border border-white/8 hover:border-white/14 transition-all"
						>
							Nur notwendige
						</button>
						<button
							onclick={() => consent.accept()}
							class="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.32)] hover:shadow-[0_0_28px_rgba(239,68,68,0.52)] transition-all"
						>
							Akzeptieren
						</button>
					</div>

				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Image starts fully below the overflow-hidden container, springs up to half-visible */
	.elmo-peek {
		animation: elmo-peek 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
	}

	@keyframes elmo-peek {
		from { transform: translateY(100%); }
		to   { transform: translateY(0); }
	}
</style>
