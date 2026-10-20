import { redirect, type Handle } from '@sveltejs/kit';
import { DEFAULT_LANG, isLang, localePath } from '$lib/i18n/config.js';

const LANG_COOKIE = 'lang';
const PREFIXED = /^\/(de|en)(\/|$)/;
const PASSTHROUGH = /^\/(api|_app|\.well-known)(\/|$)|\.[a-z0-9]+$/i;

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname, search } = event.url;
	const match = pathname.match(PREFIXED);

	// Unprefixed page URLs (/, /hardware, old links) → preferred language.
	if (!match && !PASSTHROUGH.test(pathname)) {
		const pref = event.cookies.get(LANG_COOKIE);
		redirect(307, localePath(isLang(pref) ? pref : DEFAULT_LANG, pathname) + search);
	}

	const lang = match ? match[1] : DEFAULT_LANG;
	if (match) {
		event.cookies.set(LANG_COOKIE, lang, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			sameSite: 'lax',
			httpOnly: false,
			secure: event.url.protocol === 'https:'
		});
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
