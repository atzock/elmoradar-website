<script lang="ts">
	import { fly } from 'svelte/transition';
	import { consent } from '$lib/stores/consent.js';
	import logo from '$lib/assets/logo.webp?url';
	import Cookie from 'lucide-svelte/icons/cookie';
	import { i18n } from '$lib/i18n/index.js';
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
				class="w-22 h-22 rounded-xl elmo-peek"
			/>
		</div>


		<!-- Banner body -->
		<div class="bg-raised border-t border-line">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
				<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">

					<!-- Icon + Text -->
					<div class="flex items-start gap-3 flex-1 min-w-0">
						<div class="rounded-md p-2 bg-white/4 border border-line shrink-0 mt-0.5">
							<Cookie size={14} class="text-fg-subtle" />
						</div>
						<div>
							<p class="text-sm font-display font-semibold text-white/70 mb-1">{i18n.t.cookie.title}</p>
							<p class="text-xs text-white/35 leading-relaxed max-w-lg">
								{i18n.t.cookie.text}
								<a
									href={i18n.href('/datenschutz')}
									class="text-white/45 hover:text-white/80 underline underline-offset-2 transition-colors ml-1"
								>
									{i18n.t.cookie.privacy}
								</a>
							</p>
						</div>
					</div>

					<!-- Buttons -->
					<div class="flex items-center gap-2 shrink-0 pl-9.5 sm:pl-0">
						<button
							onclick={() => consent.decline()}
							class="rounded-md px-4 py-2 text-xs font-display text-white/38 hover:text-white/65 bg-white/2 hover:bg-white/5 border border-line hover:border-line-strong transition-all"
						>
							{i18n.t.cookie.decline}
						</button>
						<button
							onclick={() => consent.accept()}
							class="rounded-md px-5 py-2 text-xs font-display font-semibold text-white bg-accent hover:bg-accent-hover hover:shadow-[0_0_28px_rgba(255,33,56,0.52)] transition-all"
						>
							{i18n.t.cookie.accept}
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
