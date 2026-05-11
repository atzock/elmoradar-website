<script lang="ts">
	import BasicPage from '$lib/components/basic-page.svelte';
	import Shield from 'lucide-svelte/icons/shield';
	import Server from 'lucide-svelte/icons/server';
	import Mail from 'lucide-svelte/icons/mail';
	import Cookie from 'lucide-svelte/icons/cookie';
	import Lock from 'lucide-svelte/icons/lock';
	import UserCheck from 'lucide-svelte/icons/user-check';
	import AlertTriangle from 'lucide-svelte/icons/alert-triangle';
	import RefreshCw from 'lucide-svelte/icons/refresh-cw';
	import User from 'lucide-svelte/icons/user';

	const rights = [
		'Auskunft über Ihre gespeicherten Daten',
		'Berichtigung unrichtiger Daten',
		'Löschung Ihrer Daten',
		'Einschränkung der Verarbeitung',
		'Datenübertragbarkeit',
		'Widerruf erteilter Einwilligungen',
		'Beschwerde bei einer Datenschutzaufsichtsbehörde'
	];

	const logData = [
		'IP-Adresse',
		'Browsertyp und Browserversion',
		'verwendetes Betriebssystem',
		'Referrer URL',
		'Hostname des zugreifenden Rechners',
		'Uhrzeit der Serveranfrage'
	];

	const sections = [
		{ id: '1', label: 'Überblick' },
		{ id: '2', label: 'Verantwortlicher' },
		{ id: '3', label: 'Hosting' },
		{ id: '4', label: 'Datenspeicherung' },
		{ id: '5', label: 'Kontaktaufnahme' },
		{ id: '6', label: 'Cookies' },
		{ id: '7', label: 'SSL/TLS' },
		{ id: '8', label: 'Ihre Rechte' },
		{ id: '9', label: 'Aufsichtsbehörde' },
		{ id: '10', label: 'Änderungen' }
	];
</script>

<svelte:head>
	<title>Datenschutzerklärung – elmoradar</title>
	<meta name="description" content="Datenschutzerklärung für elmoradar.de" />
</svelte:head>

<BasicPage>
	<div class="max-w-3xl">

		<!-- HEADER -->
		<section class="relative pt-8 pb-12 border-b border-white/[0.07] overflow-hidden">
			<div class="relative">
			<div class="flex items-center gap-3 mb-4">
				<div class="p-2.5 rounded-xl bg-white/4 border border-white/8">
					<Shield size={20} class="text-white/50" />
				</div>
				<span class="text-xs text-white/30 uppercase tracking-widest">Rechtliches</span>
			</div>
			<h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-5">Datenschutzerklärung</h1>
			<p class="text-white/45 text-base leading-relaxed">
				Transparenz darüber, welche Daten beim Besuch dieser Website verarbeitet werden und welche Rechte dir dabei zustehen.
			</p>
			<p class="text-xs text-white/25 mt-4">Stand: Mai 2026</p>
			</div>
		</section>

		<!-- TOC -->
		<nav class="py-6 border-b border-white/[0.07]">
			<p class="text-xs text-white/25 uppercase tracking-widest mb-3">Inhalt</p>
			<div class="flex flex-wrap gap-2">
				{#each sections as s}
					<a
						href="#{s.id}"
						class="px-3 py-1.5 rounded-lg text-xs text-white/40 bg-white/3 border border-white/6 hover:bg-white/6 hover:text-white/70 hover:border-white/12 transition-all"
					>
						{s.id}. {s.label}
					</a>
				{/each}
			</div>
		</nav>

		<div class="py-10 space-y-10">

			<!-- 1. ÜBERBLICK -->
			<section id="1">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">01</span>
					<h2 class="text-base font-semibold text-white/80">Datenschutz auf einen Blick</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<p class="text-sm text-white/50 leading-relaxed">
						Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen entnehmen Sie den folgenden Abschnitten.
					</p>
				</div>
			</section>

			<!-- 2. VERANTWORTLICHER -->
			<section id="2">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">02</span>
					<h2 class="text-base font-semibold text-white/80">Verantwortlicher</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<User size={14} class="text-white/40" />
						</div>
						<div class="space-y-0.5 text-sm">
							<p class="text-white/70 font-medium">Marvin - c/o Online-Impressum #7296</p>
							<p class="text-white/35">Europaring 90</p>
							<p class="text-white/35">53757 St Augustin</p>
							<p class="text-white/35">Deutschland</p>
							<a href="mailto:elmoradar@gmail.com" class="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors mt-2">
								<Mail size={12} />
								elmoradar@gmail.com
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- 3. HOSTING -->
			<section id="3">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">03</span>
					<h2 class="text-base font-semibold text-white/80">Hosting</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<Server size={14} class="text-white/40" />
						</div>
						<div class="text-sm">
							<p class="text-white/60 font-medium mb-1">Eigenes Hosting</p>
							<p class="text-white/35 text-xs leading-relaxed">
								Server-Standort: Deutschland
							</p>
						</div>
					</div>
					<div class="h-px bg-white/6"></div>
					<p class="text-sm text-white/50 leading-relaxed">
						Diese Website wird auf einem eigenen Server in Deutschland betrieben und verwaltet. Beim Besuch werden technische Daten wie IP-Adressen, Browserinformationen und Zugriffszeiten durch den Server erfasst, um die Website bereitzustellen und die Sicherheit zu gewährleisten. Eine Weitergabe dieser Daten an Dritte findet nicht statt.
					</p>
					<p class="text-xs text-white/30 leading-relaxed">
						Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und stabilen Bereitstellung). Da der Server in Deutschland betrieben wird, findet keine Übermittlung personenbezogener Daten in Drittländer statt.
					</p>
				</div>
			</section>

			<!-- 4. DATENSPEICHERUNG -->
			<section id="4">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">04</span>
					<h2 class="text-base font-semibold text-white/80">Erhebung und Speicherung personenbezogener Daten</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-4">
					<div>
						<p class="text-sm font-medium text-white/60 mb-3">Server-Log-Dateien</p>
						<p class="text-sm text-white/45 leading-relaxed mb-4">
							Beim Aufruf dieser Website werden automatisch Informationen durch den Hostinganbieter erfasst und in sogenannten Server-Logfiles gespeichert:
						</p>
						<ul class="space-y-1.5">
							{#each logData as item}
								<li class="flex items-center gap-2.5 text-sm text-white/40">
									<span class="h-1 w-1 rounded-full bg-white/20 shrink-0"></span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
					<div class="h-px bg-white/6"></div>
					<p class="text-xs text-white/30 leading-relaxed">
						Diese Daten dienen ausschließlich der technischen Bereitstellung und Sicherheit der Website. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
					</p>
				</div>
			</section>

			<!-- 5. KONTAKTAUFNAHME -->
			<section id="5">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">05</span>
					<h2 class="text-base font-semibold text-white/80">Kontaktaufnahme</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<Mail size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">
							Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten personenbezogenen Daten (z. B. Name, E-Mail-Adresse und Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung weitergegeben.
						</p>
					</div>
					<p class="text-xs text-white/30 leading-relaxed">
						Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO.
					</p>
				</div>
			</section>

			<!-- 6. COOKIES -->
			<section id="6">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">06</span>
					<h2 class="text-base font-semibold text-white/80">Cookies</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<Cookie size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">
							Diese Website verwendet ausschließlich technisch notwendige Cookies, sofern erforderlich. Technisch notwendige Cookies dienen der fehlerfreien und sicheren Bereitstellung der Website.
						</p>
					</div>
					<p class="text-xs text-white/30">Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
				</div>
			</section>

			<!-- 7. SSL/TLS -->
			<section id="7">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">07</span>
					<h2 class="text-base font-semibold text-white/80">SSL- bzw. TLS-Verschlüsselung</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-green-500/8 border border-green-500/15 shrink-0 mt-0.5">
							<Lock size={14} class="text-green-400/70" />
						</div>
						<div class="space-y-1.5">
							<p class="text-sm text-white/50 leading-relaxed">
								Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
							</p>
							<p class="text-xs text-white/30">
								Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit <span class="font-mono text-green-400/60">https://</span> beginnt.
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- 8. RECHTE -->
			<section id="8">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">08</span>
					<h2 class="text-base font-semibold text-white/80">Ihre Rechte</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<UserCheck size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">
							Sie haben jederzeit das Recht auf:
						</p>
					</div>
					<div class="grid sm:grid-cols-2 gap-2 pl-1">
						{#each rights as right}
							<div class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/2 border border-white/5">
								<span class="h-1 w-1 rounded-full bg-white/25 shrink-0"></span>
								<span class="text-sm text-white/45">{right}</span>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- 9. AUFSICHTSBEHÖRDE -->
			<section id="9">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">09</span>
					<h2 class="text-base font-semibold text-white/80">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4 space-y-3">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<AlertTriangle size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">
							Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständig in Berlin:
						</p>
					</div>
					<div class="pl-1">
						<p class="text-sm text-white/60 font-medium mb-1">
							Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Berlin
						</p>
						<a
							href="https://www.datenschutz-berlin.de"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
						>
							www.datenschutz-berlin.de →
						</a>
					</div>
				</div>
			</section>

			<!-- 10. ÄNDERUNGEN -->
			<section id="10">
				<div class="flex items-center gap-2.5 mb-4">
					<span class="text-[10px] text-white/20 font-mono tabular-nums">10</span>
					<h2 class="text-base font-semibold text-white/80">Änderungen dieser Datenschutzerklärung</h2>
				</div>
				<div class="rounded-xl border border-white/[0.07] bg-white/2 px-5 py-4">
					<div class="flex items-start gap-3">
						<div class="p-2 rounded-lg bg-white/4 border border-white/8 shrink-0 mt-0.5">
							<RefreshCw size={14} class="text-white/40" />
						</div>
						<p class="text-sm text-white/50 leading-relaxed">
							Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht.
						</p>
					</div>
				</div>
			</section>

			<!-- FOOTER NOTE -->
			<div class="pt-4 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
				<p class="text-xs text-white/20">Stand: Mai 2026</p>
			</div>

		</div>
	</div>
</BasicPage>
