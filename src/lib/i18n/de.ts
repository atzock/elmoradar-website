/**
 * German dictionary — the source of truth for the key structure.
 * `en.ts` is typed against `Dict`, so a missing or extra key is a type error.
 * Product names, aircraft names, ICAO codes and video titles are NOT translated
 * and live in the page data, not here.
 */
export const de = {
	meta: {
		siteName: 'elmoradar'
	},
	nav: {
		label: 'Hauptnavigation',
		home: 'Übersicht',
		hardware: 'Hardware & Settings',
		addons: 'Meine Addons',
		vatsim: 'VATSIM',
		videos: 'Videos',
		contact: 'Kontakt',
		stream: 'Stream',
		openStream: 'Stream öffnen',
		openMenu: 'Menü öffnen',
		closeMenu: 'Menü schließen'
	},
	lang: {
		group: 'Sprache',
		de: 'DE',
		en: 'EN',
		switchToDe: 'Sprache auf Deutsch umstellen',
		switchToEn: 'Switch language to English'
	},
	footer: {
		rights: 'Alle Rechte vorbehalten.',
		imprint: 'Impressum',
		privacy: 'Datenschutzerklärung'
	},
	cookie: {
		title: 'Cookies & externe Inhalte',
		text: 'YouTube-Embeds laden externe Inhalte und setzen Cookies erst nach deiner Zustimmung.',
		privacy: 'Datenschutzerklärung',
		decline: 'Nur notwendige',
		accept: 'Akzeptieren'
	},
	common: {
		loading: 'Wird geladen…',
		viewAll: 'Alle ansehen',
		embedOff: 'Einbettung deaktiviert.',
		embedOffHint: 'Cookies müssen akzeptiert werden.',
		embedEnable: 'Einbettungen aktivieren',
		watchOnYoutube: 'Auf YouTube ansehen →',
		toShop: 'Zum Shop'
	},
	home: {
		title: 'elmoradar – VATSIM ATC & Pilot · Flugsimulation & Streaming',
		description: 'Flugsimulation, VATSIM und zu viel Kaffee - elmoradar auf Twitch.',
		ogDescription:
			'Flugsimulation auf VATSIM, zu viel Kaffee und ein Homesetup, das langsam außer Kontrolle gerät. Streame auf Twitch.',
		liveNow: 'Gerade live',
		watch: 'Ansehen →',
		eyebrow: 'VATSIM ATC & Pilot · Streamer',
		lead: 'Flugsimulation auf einem Level, bei dem Kaffee kein Genuss mehr ist. Er ist eine Notwendigkeit. Ich fliege fast täglich auf VATSIM, lotse gelegentlich als Controller und versuche, meine RTX 5090 nicht zu langweilen.',
		body: 'Hier findest du mein komplettes Setup, alle Addons die ich täglich nutze sowie meine Grafikeinstellungen für Microsoft Flight Simulator 2024. Schau gerne auf dem Stream vorbei. Meistens täglich ab ~19 Uhr.',
		toStream: 'Zum Stream',
		portraitAlt: 'Behind the Stream – elmoradar Setup',
		portraitCaption: 'Behind the Stream',
		inAir: 'In der Luft',
		stats: {
			hours: 'Flugstunden',
			flights: 'VATSIM-Flüge',
			airports: 'Airports',
			rating: 'VATSIM Rating'
		},
		videos: {
			heading: 'Videos',
			vodsDesc: 'Alle vergangenen Streams ungeschnitten. Hier der letzte Stream:',
			mainName: 'elmoradar Hauptkanal',
			mainDesc: 'Highlights aus den Streams. Hier das neueste Video:',
			vodTitleFallback: 'YouTube VOD',
			mainTitleFallback: 'YouTube Video'
		},
		side: {
			numbers: 'Zahlen',
			network: 'VATSIM Netzwerk',
			pilots: 'Piloten online',
			controllers: 'Controller',
			lastFlight: 'Letzter Flug',
			lastAtc: 'Letzte ATC Session',
			minutes: 'min',
			addons: 'Meine Addons',
			addonsText: '14 Flieger, 8 Tools. Alles täglich im Einsatz.',
			addonsLink: 'Addons ansehen'
		},
		hangar: {
			heading: 'Im Hangar',
			sub: 'Die Flieger, die meistens zum Einsatz kommen.',
			main: 'Hauptflieger',
			all: 'Alle Flieger & Addons',
			allMobile: 'Alle Flieger & Addons ansehen'
		},
		partners: {
			heading: 'Partner & Sponsoren',
			sub: 'Diese Unternehmen machen elmoradar möglich. Von Navdaten über Airports bis hin zu Spielen.',
			blurbs: {
				Navigraph: 'Charts & AIRAC-Daten',
				Aerosoft: 'Flugzeuge & Addons',
				Orbx: 'Szenerien & Flughäfen',
				iniBuilds: 'Flugzeuge & Szenerien',
				GamesPlanet: 'Spiele & Keys',
				'MOZA Racing': 'Sim-Racing- & Flight-Hardware',
				'Tobii Gaming': 'Eye-Tracking-Hardware'
			} as Record<string, string>
		}
	},
	hardware: {
		title: 'Hardware & Settings – elmoradar',
		eyebrow: 'Setup',
		titleLead: 'Hardware &',
		titleEm: 'Settings',
		intro:
			"Das Setup, das sich über Jahre angesammelt hat. Nichts davon war geplant - CPU hier, GPU dort, irgendwann stand ein vierter Monitor auf dem Schreibtisch. Jetzt läuft's.",
		navLabel: 'Seitenabschnitte',
		nav: {
			pc: 'Rechner',
			desk: 'Schreibtisch',
			peiker: 'Peiker-Mikrofon',
			flightsim: 'Flugsimulation',
			msfs: 'MSFS Settings'
		},
		pc: {
			eyebrow: '01 · Rechner',
			heading: 'Der Kern von allem',
			sub: 'CPU, GPU und alles, was dazwischen hängt.',
			cpuNote: '3D V-Cache macht MSFS deutlich flüssiger.',
			gpuNote: 'Mit DLSS 4 + Multi Frame Generation sind sogar deutlich höhere FPS möglich.',
			photo1Alt: 'Innenansicht des PCs mit Thermalright-Kühler und Zotac RTX 5090',
			photo2Alt: 'Zweite Ansicht des PCs mit RGB-Lüftern',
			cooler: 'Kühler'
		},
		desk: {
			eyebrow: '02 · Schreibtisch',
			heading: 'Drumherum',
			sub: 'Was sonst noch so auf dem Tisch und drumherum steht.',
			monitors: 'Monitore',
			audio: 'Audio & Streaming',
			peripherals: 'Peripherie',
			main: 'Haupt',
			monitor2: '2. Monitor',
			monitor3: '3. Monitor',
			monitor3Value: 'Samsung S22D300H (22", nicht mehr erhältlich)',
			monitor4: '4. Monitor',
			microphone: 'Mikrofon',
			micArm: 'Mic Arm',
			streamDeck: 'Stream Deck',
			keyboard: 'Tastatur',
			mouse: 'Maus',
			headset: 'Headset'
		},
		peiker: {
			eyebrow: '03 · Häufig gefragt',
			titleLead: 'Peiker',
			titleEm: 'ATC-Mikrofon',
			subtitle: 'Benutzerdefinierter USB-Umbau · Einzelstück',
			alt1: 'Peiker ATC-Mikrofon mit USB-Umbau, Ansicht 1',
			alt2: 'Peiker ATC-Mikrofon mit USB-Umbau, Ansicht 2',
			p1a: 'Ich lotse mit einem ',
			p1b: 'Peiker-Mikrofon (zwei Knöpfe)',
			p1c: ', welches in dieser Ausführung (mit USB-Anschluss) ',
			p1d: 'nicht käuflich erwerbbar ist',
			p1e: '. Das Mikro wurde von mir auf eBay gekauft und von einem Bekannten an eine USB-Soundkarte gelötet, sodass das Mikro mit dem PC verbunden werden kann.',
			note: 'Das originale Peiker-Mikrofon ist ein professionelles ATC-Headset aus dem echten Luftfahrtbetrieb. Diese Modifikation ist ein Einzelstück und nicht käuflich.'
		},
		flightsim: {
			eyebrow: '04 · Flugsimulation',
			heading: 'Zwischen mir und dem Himmel',
			sub: 'Die Hardware, mit der ich fliege.',
			mozaBadge: 'Neu · Mein neuer Sidestick',
			mozaText:
				'Direct-Drive-Basis statt klassischem Joystick, mit deutlich feinerem, kraftrückmeldendem Force-Feedback. Löst den bisherigen Sidestick als mein Haupt-Eingabegerät für Airliner ab.',
			sticksHeading: 'Sticks auf der AB6 Base',
			mhgLabel: 'Helikopter & vielseitige Flugsteuerung',
			mhgNote: 'Mein Stick für Helikopter und weitere Fluggeräte, bei denen er sinnvoll ist.',
			ma3fLabel: 'Airbus & Airliner',
			ma3fNote: 'Airbus-Flüge im Microsoft Flight Simulator.',
			mozaAlt1: 'MOZA AB6 – Ansicht 1',
			mozaAlt2: 'MOZA AB6 – Ansicht 2',
			throttle: 'Throttle',
			throttleNote: 'Throttle & Flap-Lever in einem, passt perfekt zum URSA Minor.',
			rudder: 'Rudder',
			rudderNote: 'Bewährt und günstig. Rudder Pedals mit Bremse, tut genau was sie soll.'
		}
	},
	msfs: {
		eyebrow: '05 · MSFS Settings',
		heading: 'Optimiert für VATSIM',
		sub: 'Optimiert für VATSIM-Flüge auf der RTX 5090.',
		pageEyebrow: 'Microsoft Flight Simulator 2024',
		pageIntro:
			'Meine aktuellen Einstellungen, optimiert für VATSIM-Betrieb und Streaming auf der RTX 5090. Nicht für jeden Rechner geeignet, aber als Referenz ganz nützlich.',
		title: 'MSFS Settings – elmoradar',
		// Values that get a highlight colour (compared case-insensitively)
		valueHigh: ['hoch'],
		valueOff: ['aus'],
		sections: [
			{
				title: 'Allgemein',
				items: [
					{ label: 'Auflösung', value: '2560×1440' },
					{ label: 'Anti-Aliasing', value: 'TAA' },
					{ label: 'Render Scaling', value: '100' },
					{ label: 'DLSS Frame Generation', value: 'An' },
					{ label: 'Max FPS', value: '60' },
					{ label: 'NVIDIA Reflex', value: 'An' }
				]
			},
			{
				title: 'Traffic & Umgebung',
				items: [
					{ label: 'Flugzeug-Traffic', value: 'Aus' },
					{ label: 'Bodenfahrzeuge', value: 'Mittel' },
					{ label: 'Straßenverkehr', value: 'Hoch' },
					{ label: 'Schiffe', value: 'Ultra' },
					{ label: 'Fauna', value: 'Niedrig' }
				]
			},
			{
				title: 'Grafik',
				note: 'Terrain LOD & Object LOD: Diese Werte sind irrelevant, da sie automatisch durch AutoFPS gesteuert werden.',
				items: [
					{ label: 'Terrain LOD', value: 'Dynamic (170 → 300)' },
					{ label: 'Object LOD', value: '140' },
					{ label: 'Gebäude', value: 'Ultra' },
					{ label: 'Bäume', value: 'Ultra' },
					{ label: 'Gras', value: 'Ultra' },
					{ label: 'Wolken', value: 'Ultra' },
					{ label: 'Texturen', value: 'Ultra' }
				]
			},
			{
				title: 'AutoFPS',
				note: 'AutoFPS passt den Terrain LOD dynamisch je nach Flughöhe an. Weniger Detail am Boden für Performance, mehr in der Luft für Optik.',
				items: [
					{ label: 'Modus', value: 'Auto TLOD' },
					{ label: 'TLOD am Boden', value: '170' },
					{ label: 'TLOD in Reiseflughöhe', value: '300' },
					{ label: 'OLOD Basis', value: '140' },
					{ label: 'OLOD ab 10.000 ft', value: '130' }
				]
			}
		] as { title: string; note?: string; items: { label: string; value: string }[] }[]
	},
	addons: {
		title: 'Meine Addons – elmoradar',
		eyebrow: 'Hangar & Tools',
		titleLead: 'Meine',
		titleEm: 'Addons',
		intro:
			'14 Flieger, acht Tools. Was im Hangar steht und was vor jedem Flug läuft, ist alles täglich im Einsatz, nichts davon ist Sponsoring.',
		fleetHeading: 'Flieger im Hangar',
		fleetHint: 'Klick auf einen Flieger öffnet die Produktseite des Entwicklers.',
		main: 'Hauptflieger',
		imgMissing: 'Bild nicht verfügbar',
		toolsHeading: 'Software & Tools',
		toolsHint: 'Läuft bei jedem Flug, entweder im Hintergrund oder als erstes vor dem Sim.',
		tools: {
			'GSX Pro': {
				category: 'Ground Services',
				desc: 'Realistische Bodenabfertigung, Boarding, Catering und Pushback. Auf VATSIM unverzichtbar.'
			},
			ChasePlane: {
				category: 'Kamera',
				desc: 'Cineastische Kamerafahrten, vollständig anpassbar. Replay sieht danach aus wie echte Footage.'
			},
			AutoFPS: {
				category: 'Performance',
				desc: 'Dynamischer LOD je nach Höhe: mehr Detail im Reiseflug, mehr FPS am Boden. Open Source.'
			},
			Navigraph: {
				category: 'Navigation',
				desc: 'Aktuelles AIRAC + Charts. Das erste, was ich nach einer MSFS-Installation installiere.'
			},
			'Lido Charts': {
				category: 'Charts',
				desc: 'Professionelle Lido-Flughafenkarten direkt im integrierten MSFS Flight Planner.'
			},
			'flightsim.to': {
				category: 'Freeware',
				desc: 'Liveries, GSX-Profile, Freeware-Sceneries: die wichtigste Community-Plattform überhaupt.'
			},
			Any2GSX: {
				category: 'GSX-Automation',
				desc: 'Löst GSX-Bodenabfertigung automatisch an jedem Airport aus, kein manuelles Anfordern mehr nötig. Open Source.'
			},
			SkyTrails: {
				category: 'Kondensstreifen',
				desc: 'Dynamische, wetterabhängige Kondensstreifen, sieht im Reiseflug einfach deutlich echter aus.'
			},
			'GateStaticInjector for VATSIM': {
				category: 'Geparkter Verkehr',
				desc: 'Kostenlose Begleit-App für MSFS 2024, die freie Gates mit geparkten Airlinern (FSLTL- und/oder AIG-Modelle) füllt und sie wieder entfernt, sobald Online-Verkehr den Stand braucht.'
			}
		} as Record<string, { category: string; desc: string }>
	},
	videos: {
		title: 'Videos & Playlists – elmoradar',
		eyebrow: 'VOD-Kanal',
		titleLead: 'Videos &',
		titleEm: 'Playlists',
		intro:
			'Alles, was auf dem VOD-Kanal nach Thema sortiert ist. Von langen VATSIM-Flügen über Rettungsflüge bis hin zu ATC-Sessions als Lotse.',
		latestHeading: 'Neueste Streams',
		latestFirst: 'Zuletzt hochgeladen',
		latestError: 'Videos konnten gerade nicht geladen werden. Schau direkt auf dem Kanal vorbei.',
		thumbConsent: 'Vorschaubild wird nach Zustimmung zu externen Inhalten geladen',
		thumbAlt: 'Vorschaubild',
		playlistsHeading: 'Playlists nach Thema',
		playlistOpen: 'Playlist ansehen',
		playlists: {
			vatsim: {
				name: 'VATSIM Flüge',
				desc: 'VATSIM-Flüge in voller Länge, unterschiedliche Airliner, unterschiedliche Strecken.'
			},
			rescue: {
				name: 'Rettungshelikopter',
				desc: 'Rettungsflüge und Heli-Einsätze abseits der Airliner-Routine.'
			},
			longhaul: {
				name: 'Overnight Longhauls',
				desc: 'Lange Nachtflüge, ruhiger Stream, meistens mehr Atmosphäre als Action.'
			},
			cities: {
				name: 'Cities: Skylines',
				desc: 'Städtebau zwischendurch, wenn der Sim mal Pause hat.'
			},
			atc: {
				name: 'Lotsen',
				desc: 'ATC-Sessions als Controller: Tower, Approach und Center auf VATSIM.'
			}
		} as Record<string, { name: string; desc: string }>,
		channelHeading: 'Alles auf einen Blick',
		channelText: 'Der komplette VOD-Kanal mit allen Streams ungeschnitten.',
		channelCta: 'Zum Kanal'
	},
	vatsim: {
		title: 'VATSIM – elmoradar',
		eyebrow: 'ATC & Pilot',
		intro:
			'Meine aktiven Endorsements im VATSIM-Netzwerk. Die aufgeführten Positionen zeigen, welche Station ich besetzen darf.',
		rating: 'ATC Rating',
		flights: 'Flüge',
		hours: 'Flugstunden',
		airports: 'Airports',
		heading: 'Meine Freigaben',
		tower: 'Tower',
		approach: 'Approach',
		center: 'Center',
		munichNote: 'München: einzelne Sektoren eingeschränkt',
		footnote: 'Stand kann sich durch Trainingsfortschritt ändern.',
		places: {
			Frankfurt: 'Frankfurt',
			Hamburg: 'Hamburg',
			Köln: 'Köln',
			Düsseldorf: 'Düsseldorf',
			München: 'München',
			Berlin: 'Berlin',
			'Langen Radar': 'Langen Radar',
			'Bremen Radar': 'Bremen Radar',
			'München Radar': 'München Radar',
			'Rhein Radar': 'Rhein Radar',
			Maastricht: 'Maastricht'
		} as Record<string, string>
	},
	contact: {
		title: 'Kontakt – elmoradar',
		eyebrow: 'Anfragen & Ideen',
		titleWord: 'Kontakt',
		intro:
			'Egal ob Business-Anfrage oder Stream-Idee, schreib einfach. Ich antworte in der Regel innerhalb von 24–48 Stunden.',
		topic: "Worum geht's?",
		categories: {
			business: { label: 'Business-Anfrage', hint: 'Kooperationen, Werbung, Sponsorings' },
			collab: { label: 'Kooperation', hint: 'Gemeinsame Streams, Projekte, Events' },
			'stream-idea': { label: 'Stream-Idee', hint: 'Ideen für Routen, Szenarien, Challenges' },
			question: { label: 'Allgemeine Frage', hint: 'Setup, VATSIM, Sim-Fragen etc.' },
			other: { label: 'Sonstiges', hint: 'Alles andere' }
		} as Record<string, { label: string; hint: string }>,
		subjectFallback: 'Kontakt',
		name: 'Name',
		namePlaceholder: 'Dein Name',
		email: 'E-Mail',
		emailPlaceholder: 'deine@mail.de',
		subject: 'Betreff',
		subjectPlaceholder: 'Worum geht es kurz gesagt?',
		message: 'Nachricht',
		messagePlaceholder: 'Was liegt an?',
		messageHint: 'Mindestens ein paar Sätze helfen mir weiter.',
		privacyNote: 'Deine Daten werden ausschließlich zur Beantwortung deiner Anfrage verwendet.',
		sending: 'Wird gesendet…',
		send: 'Absenden',
		sentTitle: 'Nachricht gesendet',
		sentText: "Ich hab's bekommen und melde mich bald. Danke!",
		another: 'Neue Nachricht schreiben',
		errUnknown: 'Unbekannter Fehler.',
		errConnection: 'Verbindungsfehler. Bitte direkt per Mail schreiben.',
		directMail: 'Direkte Mail',
		discord: 'Discord',
		honeypot: 'Website'
	},
	legal: {
		eyebrow: 'Rechtliches',
		notice: ''
	},
	imprint: {
		title: 'Impressum – elmoradar',
		heading: 'Impressum',
		intro:
			'Das hier angegebene Impressum gilt für alle Belange der Impressumspflicht nach §5 DDG, § 55 Abs.2 RStV & MStV §18 sowie für alle Social Media Auftritte. Erstellte Seiten können von verantwortlichen Personen bearbeitet werden; wir garantieren daher keine Vollständigkeit. Nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
		provider: 'Anbieter',
		country: 'Deutschland',
		contact: 'Kontakt',
		email: 'E-Mail:',
		vat: 'USt-IdNr.:',
		responsible: 'Inhaltlich verantwortlich',
		responsibleText: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:',
		authority: 'Aufsichtsbehörde',
		authorityText: 'Medienanstalt Berlin-Brandenburg',
		authoritySeat: 'Sitz: Deutschland'
	},
	privacy: {
		title: 'Datenschutzerklärung – elmoradar',
		description: 'Datenschutzerklärung für elmoradar.de',
		heading: 'Datenschutzerklärung',
		intro:
			'Transparenz darüber, welche Daten beim Besuch dieser Website verarbeitet werden und welche Rechte dir dabei zustehen.',
		updated: 'Stand: Mai 2026',
		toc: 'Inhalt',
		toc1: 'Überblick',
		toc2: 'Verantwortlicher',
		toc3: 'Hosting',
		toc4: 'Datenspeicherung',
		toc5: 'Kontaktaufnahme',
		toc6: 'Cookies',
		toc7: 'SSL/TLS',
		toc8: 'Ihre Rechte',
		toc9: 'Aufsichtsbehörde',
		toc10: 'Änderungen',
		s1Title: 'Datenschutz auf einen Blick',
		s1Text:
			'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen entnehmen Sie den folgenden Abschnitten.',
		s2Title: 'Verantwortlicher',
		s2Country: 'Deutschland',
		s3Title: 'Hosting',
		s3Own: 'Eigenes Hosting',
		s3Location: 'Server-Standort: Deutschland',
		s3Text:
			'Diese Website wird auf einem eigenen Server in Deutschland betrieben und verwaltet. Beim Besuch werden technische Daten wie IP-Adressen, Browserinformationen und Zugriffszeiten durch den Server erfasst, um die Website bereitzustellen und die Sicherheit zu gewährleisten. Eine Weitergabe dieser Daten an Dritte findet nicht statt.',
		s3Legal:
			'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und stabilen Bereitstellung). Da der Server in Deutschland betrieben wird, findet keine Übermittlung personenbezogener Daten in Drittländer statt.',
		s4Title: 'Erhebung und Speicherung personenbezogener Daten',
		s4Logs: 'Server-Log-Dateien',
		s4Intro:
			'Beim Aufruf dieser Website werden automatisch Informationen durch den Hostinganbieter erfasst und in sogenannten Server-Logfiles gespeichert:',
		logData: [
			'IP-Adresse',
			'Browsertyp und Browserversion',
			'verwendetes Betriebssystem',
			'Referrer URL',
			'Hostname des zugreifenden Rechners',
			'Uhrzeit der Serveranfrage'
		],
		s4Note:
			'Diese Daten dienen ausschließlich der technischen Bereitstellung und Sicherheit der Website. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
		s5Title: 'Kontaktaufnahme',
		s5Text:
			'Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten personenbezogenen Daten (z. B. Name, E-Mail-Adresse und Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung weitergegeben.',
		s5Legal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO.',
		s6Title: 'Cookies',
		s6Text:
			'Diese Website verwendet ausschließlich technisch notwendige Cookies, sofern erforderlich. Technisch notwendige Cookies dienen der fehlerfreien und sicheren Bereitstellung der Website.',
		s6Legal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
		s7Title: 'SSL- bzw. TLS-Verschlüsselung',
		s7Text:
			'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.',
		s7Note1: 'Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit ',
		s7Note2: ' beginnt.',
		s8Title: 'Ihre Rechte',
		s8Intro: 'Sie haben jederzeit das Recht auf:',
		rights: [
			'Auskunft über Ihre gespeicherten Daten',
			'Berichtigung unrichtiger Daten',
			'Löschung Ihrer Daten',
			'Einschränkung der Verarbeitung',
			'Datenübertragbarkeit',
			'Widerruf erteilter Einwilligungen',
			'Beschwerde bei einer Datenschutzaufsichtsbehörde'
		],
		s9Title: 'Beschwerderecht bei der zuständigen Aufsichtsbehörde',
		s9Text:
			'Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständig in Berlin:',
		s9Authority: 'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Berlin',
		s10Title: 'Änderungen dieser Datenschutzerklärung',
		s10Text:
			'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht.'
	},
	api: {
		contactTooMany: 'Zu viele Anfragen. Bitte warte ein paar Minuten.',
		contactInvalid: 'Ungültige Anfrage.',
		contactTooFast: 'Formular zu schnell ausgefüllt. Bitte nochmal versuchen.',
		contactMissing: 'Bitte alle Felder ausfüllen.',
		contactTooLong: 'Eingabe zu lang.',
		contactBadEmail: 'Ungültige E-Mail-Adresse.',
		contactNotConfigured: 'Mailversand nicht konfiguriert. Bitte direkt per Mail schreiben.',
		contactSendFailed: 'E-Mail konnte nicht gesendet werden. Bitte direkt per Mail schreiben.'
	}
};

export type Dict = typeof de;
