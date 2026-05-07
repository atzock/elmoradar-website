import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type ConsentState = 'pending' | 'accepted' | 'declined';

function createConsent() {
	const initial: ConsentState = browser
		? ((localStorage.getItem('cookie-consent') as ConsentState) ?? 'pending')
		: 'pending';

	const { subscribe, set } = writable<ConsentState>(initial);

	return {
		subscribe,
		accept() {
			if (browser) localStorage.setItem('cookie-consent', 'accepted');
			set('accepted');
		},
		decline() {
			if (browser) localStorage.setItem('cookie-consent', 'declined');
			set('declined');
		},
		reset() {
			if (browser) localStorage.removeItem('cookie-consent');
			set('pending');
		}
	};
}

export const consent = createConsent();
