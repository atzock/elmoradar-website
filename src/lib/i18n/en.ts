import type { Dict } from './de.js';

export const en: Dict = {
	meta: {
		siteName: 'elmoradar'
	},
	nav: {
		label: 'Main navigation',
		home: 'Home',
		hardware: 'Hardware & Settings',
		addons: 'My Addons',
		vatsim: 'VATSIM',
		videos: 'Videos',
		contact: 'Contact',
		stream: 'Stream',
		openStream: 'Open stream',
		openMenu: 'Open menu',
		closeMenu: 'Close menu'
	},
	lang: {
		group: 'Language',
		de: 'DE',
		en: 'EN',
		switchToDe: 'Sprache auf Deutsch umstellen',
		switchToEn: 'Switch language to English'
	},
	footer: {
		rights: 'All rights reserved.',
		imprint: 'Legal notice (Impressum)',
		privacy: 'Privacy policy'
	},
	cookie: {
		title: 'Cookies & external content',
		text: 'YouTube embeds load external content and set cookies only after you give your consent.',
		privacy: 'Privacy policy',
		decline: 'Necessary only',
		accept: 'Accept'
	},
	common: {
		loading: 'Loading…',
		viewAll: 'View all',
		embedOff: 'Embed disabled.',
		embedOffHint: 'Cookies need to be accepted.',
		embedEnable: 'Enable embeds',
		watchOnYoutube: 'Watch on YouTube →',
		toShop: 'View in shop'
	},
	home: {
		title: 'elmoradar – VATSIM ATC & Pilot · Flight Simulation & Streaming',
		description: 'Flight simulation, VATSIM and way too much coffee – elmoradar on Twitch.',
		ogDescription:
			'Flight simulation on VATSIM, too much coffee and a home setup that is slowly getting out of hand. Streaming on Twitch.',
		liveNow: 'Live now',
		watch: 'Watch →',
		eyebrow: 'VATSIM ATC & Pilot · Streamer',
		lead: 'Flight simulation at a level where coffee is no longer a treat but a necessity. I fly on VATSIM almost daily, control as an ATC every now and then, and try not to bore my RTX 5090.',
		body: 'Here you will find my complete setup, all the addons I use every day and my graphics settings for Microsoft Flight Simulator 2024. Feel free to drop by the stream – usually daily from around 7 pm (CET).',
		toStream: 'Watch the stream',
		portraitAlt: 'Behind the Stream – elmoradar setup',
		portraitCaption: 'Behind the Stream',
		inAir: 'Airborne',
		stats: {
			hours: 'Flight hours',
			flights: 'VATSIM flights',
			airports: 'Airports',
			rating: 'VATSIM rating'
		},
		videos: {
			heading: 'Videos',
			vodsDesc: 'Every past stream, uncut. Here is the latest one:',
			mainName: 'elmoradar main channel',
			mainDesc: 'Highlights from the streams. Here is the newest video:',
			vodTitleFallback: 'YouTube VOD',
			mainTitleFallback: 'YouTube video'
		},
		side: {
			numbers: 'Numbers',
			network: 'VATSIM network',
			pilots: 'Pilots online',
			controllers: 'Controllers',
			lastFlight: 'Last flight',
			lastAtc: 'Last ATC session',
			minutes: 'min',
			addons: 'My addons',
			addonsText: '14 aircraft, 8 tools. All in daily use.',
			addonsLink: 'View addons'
		},
		hangar: {
			heading: 'In the hangar',
			sub: 'The aircraft I fly most often.',
			main: 'Main aircraft',
			all: 'All aircraft & addons',
			allMobile: 'View all aircraft & addons'
		},
		partners: {
			heading: 'Partners & sponsors',
			sub: 'These companies make elmoradar possible – from navdata and airports to games.',
			blurbs: {
				Navigraph: 'Charts & AIRAC data',
				Aerosoft: 'Aircraft & addons',
				Orbx: 'Scenery & airports',
				iniBuilds: 'Aircraft & scenery',
				GamesPlanet: 'Games & keys',
				'MOZA Racing': 'Sim racing & flight hardware',
				'Tobii Gaming': 'Eye-tracking hardware'
			}
		}
	},
	hardware: {
		title: 'Hardware & Settings – elmoradar',
		eyebrow: 'Setup',
		titleLead: 'Hardware &',
		titleEm: 'Settings',
		intro:
			"The setup that has piled up over the years. None of it was planned – a CPU here, a GPU there, and at some point a fourth monitor appeared on the desk. Now it works.",
		navLabel: 'Page sections',
		nav: {
			pc: 'PC',
			desk: 'Desk',
			peiker: 'Peiker microphone',
			flightsim: 'Flight sim gear',
			msfs: 'MSFS settings'
		},
		pc: {
			eyebrow: '01 · PC',
			heading: 'The core of it all',
			sub: 'CPU, GPU and everything in between.',
			cpuNote: '3D V-Cache makes MSFS noticeably smoother.',
			gpuNote: 'With DLSS 4 + Multi Frame Generation, even significantly higher FPS are possible.',
			photo1Alt: 'Inside the PC with Thermalright cooler and Zotac RTX 5090',
			photo2Alt: 'Second view of the PC with RGB fans',
			cooler: 'Cooler'
		},
		desk: {
			eyebrow: '02 · Desk',
			heading: 'Around the desk',
			sub: 'Everything else on and around the desk.',
			monitors: 'Monitors',
			audio: 'Audio & streaming',
			peripherals: 'Peripherals',
			main: 'Main',
			monitor2: '2nd monitor',
			monitor3: '3rd monitor',
			monitor3Value: 'Samsung S22D300H (22", no longer available)',
			monitor4: '4th monitor',
			microphone: 'Microphone',
			micArm: 'Mic arm',
			streamDeck: 'Stream Deck',
			keyboard: 'Keyboard',
			mouse: 'Mouse',
			headset: 'Headset'
		},
		peiker: {
			eyebrow: '03 · Frequently asked',
			titleLead: 'Peiker',
			titleEm: 'ATC microphone',
			subtitle: 'Custom USB conversion · One of a kind',
			alt1: 'Peiker ATC microphone with USB conversion, view 1',
			alt2: 'Peiker ATC microphone with USB conversion, view 2',
			p1a: 'I control with a ',
			p1b: 'Peiker microphone (two buttons)',
			p1c: ', which in this version (with a USB connection) ',
			p1d: 'is not available to buy',
			p1e: '. I bought the mic on eBay and a friend soldered it to a USB sound card so it can be connected to the PC.',
			note: 'The original Peiker microphone is a professional ATC headset from real-world aviation operations. This modification is a one-off and not for sale.'
		},
		flightsim: {
			eyebrow: '04 · Flight sim gear',
			heading: 'Between me and the sky',
			sub: 'The hardware I fly with.',
			mozaBadge: 'New · My new sidestick',
			mozaText:
				'A direct-drive base instead of a classic joystick, with much finer force feedback. It replaces my previous sidestick as my main input device for airliners.',
			sticksHeading: 'Sticks on the AB6 base',
			mhgLabel: 'Helicopters & versatile flight control',
			mhgNote: 'My stick for helicopters and other aircraft where it makes sense.',
			ma3fLabel: 'Airbus & airliners',
			ma3fNote: 'Airbus flights in Microsoft Flight Simulator.',
			mozaAlt1: 'MOZA AB6 – view 1',
			mozaAlt2: 'MOZA AB6 – view 2',
			throttle: 'Throttle',
			throttleNote: 'Throttle & flap lever in one, a perfect match for the URSA Minor.',
			rudder: 'Rudder',
			rudderNote: 'Tried and tested, and affordable. Rudder pedals with brakes that do exactly what they should.'
		}
	},
	msfs: {
		eyebrow: '05 · MSFS settings',
		heading: 'Tuned for VATSIM',
		sub: 'Tuned for VATSIM flights on the RTX 5090.',
		pageEyebrow: 'Microsoft Flight Simulator 2024',
		pageIntro:
			'My current settings, tuned for VATSIM operation and streaming on the RTX 5090. Not suitable for every PC, but a useful reference.',
		title: 'MSFS Settings – elmoradar',
		valueHigh: ['high'],
		valueOff: ['off'],
		sections: [
			{
				title: 'General',
				items: [
					{ label: 'Resolution', value: '2560×1440' },
					{ label: 'Anti-aliasing', value: 'TAA' },
					{ label: 'Render scaling', value: '100' },
					{ label: 'DLSS Frame Generation', value: 'On' },
					{ label: 'Max FPS', value: '60' },
					{ label: 'NVIDIA Reflex', value: 'On' }
				]
			},
			{
				title: 'Traffic & environment',
				items: [
					{ label: 'Aircraft traffic', value: 'Off' },
					{ label: 'Ground vehicles', value: 'Medium' },
					{ label: 'Road traffic', value: 'High' },
					{ label: 'Ships', value: 'Ultra' },
					{ label: 'Wildlife', value: 'Low' }
				]
			},
			{
				title: 'Graphics',
				note: 'Terrain LOD & Object LOD: these values are irrelevant, as they are controlled automatically by AutoFPS.',
				items: [
					{ label: 'Terrain LOD', value: 'Dynamic (170 → 300)' },
					{ label: 'Object LOD', value: '140' },
					{ label: 'Buildings', value: 'Ultra' },
					{ label: 'Trees', value: 'Ultra' },
					{ label: 'Grass', value: 'Ultra' },
					{ label: 'Clouds', value: 'Ultra' },
					{ label: 'Textures', value: 'Ultra' }
				]
			},
			{
				title: 'AutoFPS',
				note: 'AutoFPS adjusts Terrain LOD dynamically based on altitude: less detail on the ground for performance, more in the air for visuals.',
				items: [
					{ label: 'Mode', value: 'Auto TLOD' },
					{ label: 'TLOD on the ground', value: '170' },
					{ label: 'TLOD at cruise altitude', value: '300' },
					{ label: 'OLOD base', value: '140' },
					{ label: 'OLOD above 10,000 ft', value: '130' }
				]
			}
		]
	},
	addons: {
		title: 'My Addons – elmoradar',
		eyebrow: 'Hangar & Tools',
		titleLead: 'My',
		titleEm: 'Addons',
		intro:
			'14 aircraft, eight tools. Everything in the hangar and everything that runs before each flight is in daily use – none of it is sponsored.',
		fleetHeading: 'Aircraft in the hangar',
		fleetHint: "Click an aircraft to open the developer's product page.",
		main: 'Main aircraft',
		imgMissing: 'Image unavailable',
		toolsHeading: 'Software & tools',
		toolsHint: 'Runs on every flight, either in the background or first thing before the sim.',
		tools: {
			'GSX Pro': {
				category: 'Ground services',
				desc: 'Realistic ground handling, boarding, catering and pushback. Indispensable on VATSIM.'
			},
			ChasePlane: {
				category: 'Camera',
				desc: 'Cinematic camera movements, fully customisable. Replays end up looking like real footage.'
			},
			AutoFPS: {
				category: 'Performance',
				desc: 'Dynamic LOD by altitude: more detail at cruise, more FPS on the ground. Open source.'
			},
			Navigraph: {
				category: 'Navigation',
				desc: 'Current AIRAC + charts. The first thing I install after setting up MSFS.'
			},
			'Lido Charts': {
				category: 'Charts',
				desc: 'Professional Lido airport charts right inside the built-in MSFS flight planner.'
			},
			'flightsim.to': {
				category: 'Freeware',
				desc: 'Liveries, GSX profiles, freeware scenery: simply the most important community platform.'
			},
			Any2GSX: {
				category: 'GSX automation',
				desc: 'Triggers GSX ground handling automatically at every airport, so there is no more requesting services by hand. Open source.'
			},
			SkyTrails: {
				category: 'Contrails',
				desc: 'Dynamic, weather-dependent contrails – cruise simply looks far more realistic.'
			},
			'GateStaticInjector for VATSIM': {
				category: 'Parked traffic',
				desc: 'Free companion app for MSFS 2024 that fills unused airport stands with parked airliners (FSLTL and/or AIG models) and removes them again when online traffic needs the stand.'
			}
		}
	},
	videos: {
		title: 'Videos & Playlists – elmoradar',
		eyebrow: 'VOD channel',
		titleLead: 'Videos &',
		titleEm: 'Playlists',
		intro:
			'Everything on the VOD channel, sorted by topic. From long VATSIM flights and rescue missions to ATC sessions as a controller.',
		latestHeading: 'Latest streams',
		latestFirst: 'Latest upload',
		latestError: 'Videos could not be loaded right now. Have a look at the channel directly.',
		thumbConsent: 'The thumbnail loads once you consent to external content',
		thumbAlt: 'Thumbnail',
		playlistsHeading: 'Playlists by topic',
		playlistOpen: 'View playlist',
		playlists: {
			vatsim: {
				name: 'VATSIM Flights',
				desc: 'Full-length VATSIM flights, different airliners, different routes.'
			},
			rescue: {
				name: 'Rescue Helicopters',
				desc: 'Rescue flights and helicopter missions away from the airliner routine.'
			},
			longhaul: {
				name: 'Overnight Longhauls',
				desc: 'Long night flights, a calm stream, usually more atmosphere than action.'
			},
			cities: {
				name: 'Cities: Skylines',
				desc: 'City building in between, when the sim takes a break.'
			},
			atc: {
				name: 'Controlling',
				desc: 'ATC sessions as a controller: Tower, Approach and Center on VATSIM.'
			}
		},
		channelHeading: 'Everything at a glance',
		channelText: 'The complete VOD channel with every stream, uncut.',
		channelCta: 'Go to channel'
	},
	vatsim: {
		title: 'VATSIM – elmoradar',
		eyebrow: 'ATC & Pilot',
		intro:
			'My active endorsements on the VATSIM network. The positions listed show which stations I am allowed to staff.',
		rating: 'ATC rating',
		flights: 'Flights',
		hours: 'Flight hours',
		airports: 'Airports',
		heading: 'My endorsements',
		tower: 'Tower',
		approach: 'Approach',
		center: 'Center',
		munichNote: 'Munich: some sectors restricted',
		footnote: 'Status may change as training progresses.',
		places: {
			Frankfurt: 'Frankfurt',
			Hamburg: 'Hamburg',
			Köln: 'Cologne',
			Düsseldorf: 'Düsseldorf',
			München: 'Munich',
			Berlin: 'Berlin',
			'Langen Radar': 'Langen Radar',
			'Bremen Radar': 'Bremen Radar',
			'München Radar': 'Munich Radar',
			'Rhein Radar': 'Rhine Radar',
			Maastricht: 'Maastricht'
		}
	},
	contact: {
		title: 'Contact – elmoradar',
		eyebrow: 'Enquiries & ideas',
		titleWord: 'Contact',
		intro:
			'Whether it is a business enquiry or a stream idea, just write. I usually reply within 24–48 hours.',
		topic: 'What is it about?',
		categories: {
			business: { label: 'Business enquiry', hint: 'Partnerships, advertising, sponsorships' },
			collab: { label: 'Collaboration', hint: 'Joint streams, projects, events' },
			'stream-idea': { label: 'Stream idea', hint: 'Ideas for routes, scenarios, challenges' },
			question: { label: 'General question', hint: 'Setup, VATSIM, sim questions etc.' },
			other: { label: 'Other', hint: 'Anything else' }
		},
		subjectFallback: 'Contact',
		name: 'Name',
		namePlaceholder: 'Your name',
		email: 'Email',
		emailPlaceholder: 'you@mail.com',
		subject: 'Subject',
		subjectPlaceholder: 'What is it about, in a nutshell?',
		message: 'Message',
		messagePlaceholder: "What's on your mind?",
		messageHint: 'A few sentences will help me a lot.',
		privacyNote: 'Your data is used solely to answer your enquiry.',
		sending: 'Sending…',
		send: 'Send',
		sentTitle: 'Message sent',
		sentText: "I've got it and will get back to you soon. Thanks!",
		another: 'Write another message',
		errUnknown: 'Unknown error.',
		errConnection: 'Connection error. Please write to me directly by email.',
		directMail: 'Direct email',
		discord: 'Discord',
		honeypot: 'Website'
	},
	legal: {
		eyebrow: 'Legal',
		notice:
			'Courtesy translation. The German original is the authoritative version; this translation does not replace it and has not been reviewed by a lawyer.'
	},
	imprint: {
		title: 'Legal notice (Impressum) – elmoradar',
		heading: 'Legal notice (Impressum)',
		intro:
			'The legal notice given here applies to all matters subject to the imprint obligation under § 5 DDG, § 55 (2) RStV & § 18 MStV, as well as to all social media presences. Pages created may be edited by responsible persons; we therefore do not guarantee completeness. We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.',
		provider: 'Provider',
		country: 'Germany',
		contact: 'Contact',
		email: 'Email:',
		vat: 'VAT ID:',
		responsible: 'Responsible for content',
		responsibleText: 'Responsible for the content pursuant to § 55 (2) RStV:',
		authority: 'Supervisory authority',
		authorityText: 'Medienanstalt Berlin-Brandenburg',
		authoritySeat: 'Seat: Germany'
	},
	privacy: {
		title: 'Privacy policy – elmoradar',
		description: 'Privacy policy for elmoradar.de',
		heading: 'Privacy policy',
		intro:
			'Transparency about which data is processed when you visit this website and which rights you have in that regard.',
		updated: 'Last updated: May 2026',
		toc: 'Contents',
		toc1: 'Overview',
		toc2: 'Controller',
		toc3: 'Hosting',
		toc4: 'Data storage',
		toc5: 'Contact',
		toc6: 'Cookies',
		toc7: 'SSL/TLS',
		toc8: 'Your rights',
		toc9: 'Supervisory authority',
		toc10: 'Changes',
		s1Title: 'Data protection at a glance',
		s1Text:
			'The following notes give a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to identify you personally. For detailed information, please refer to the following sections.',
		s2Title: 'Controller',
		s2Country: 'Germany',
		s3Title: 'Hosting',
		s3Own: 'Self-hosted',
		s3Location: 'Server location: Germany',
		s3Text:
			'This website is operated and managed on our own server in Germany. When you visit, technical data such as IP addresses, browser information and access times are recorded by the server in order to provide the website and ensure its security. This data is not passed on to third parties.',
		s3Legal:
			'Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in a secure and stable provision of the website). Since the server is operated in Germany, no personal data is transferred to third countries.',
		s4Title: 'Collection and storage of personal data',
		s4Logs: 'Server log files',
		s4Intro:
			'When you access this website, the hosting provider automatically collects information and stores it in so-called server log files:',
		logData: [
			'IP address',
			'Browser type and browser version',
			'Operating system used',
			'Referrer URL',
			'Hostname of the accessing computer',
			'Time of the server request'
		],
		s4Note:
			'This data is used exclusively for the technical provision and security of the website. Legal basis: Art. 6 (1) (f) GDPR.',
		s5Title: 'Contact',
		s5Text:
			'If you contact us by email, the personal data you submit (e.g. name, email address and message) is stored in order to process your enquiry. This data will not be passed on without your consent.',
		s5Legal: 'Legal basis: Art. 6 (1) (b) GDPR or Art. 6 (1) (f) GDPR.',
		s6Title: 'Cookies',
		s6Text:
			'This website uses only technically necessary cookies, where required. Technically necessary cookies serve the error-free and secure provision of the website.',
		s6Legal: 'Legal basis: Art. 6 (1) (f) GDPR.',
		s7Title: 'SSL/TLS encryption',
		s7Text:
			'For security reasons and to protect the transmission of confidential content, this site uses SSL/TLS encryption.',
		s7Note1: 'You can recognise an encrypted connection by the browser address bar starting with ',
		s7Note2: '.',
		s8Title: 'Your rights',
		s8Intro: 'You have the right at any time to:',
		rights: [
			'Information about your stored data',
			'Correction of inaccurate data',
			'Deletion of your data',
			'Restriction of processing',
			'Data portability',
			'Withdrawal of consent you have given',
			'Lodge a complaint with a data protection supervisory authority'
		],
		s9Title: 'Right to lodge a complaint with the competent supervisory authority',
		s9Text:
			'In the event of data protection violations, you have the right to lodge a complaint with the competent supervisory authority. The competent authority in Berlin is:',
		s9Authority: 'Berlin Commissioner for Data Protection and Freedom of Information (Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Berlin)',
		s10Title: 'Changes to this privacy policy',
		s10Text:
			'We reserve the right to adapt this privacy policy so that it always complies with current legal requirements.'
	},
	api: {
		contactTooMany: 'Too many requests. Please wait a few minutes.',
		contactInvalid: 'Invalid request.',
		contactTooFast: 'Form was completed too quickly. Please try again.',
		contactMissing: 'Please fill in all fields.',
		contactTooLong: 'Input too long.',
		contactBadEmail: 'Invalid email address.',
		contactNotConfigured: 'Mail delivery is not configured. Please write to me directly by email.',
		contactSendFailed: 'The email could not be sent. Please write to me directly by email.'
	}
};
