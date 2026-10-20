export const LANGS = ['de', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'de';

export const LOCALES: Record<Lang, string> = { de: 'de-DE', en: 'en-GB' };

export function isLang(value: unknown): value is Lang {
	return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** Strips a leading /de or /en from a pathname. */
export function stripLang(pathname: string): string {
	return pathname.replace(/^\/(de|en)(?=\/|$)/, '') || '/';
}

export function localePath(lang: Lang, path = '/'): string {
	return `/${lang}${path === '/' ? '' : path}`;
}
