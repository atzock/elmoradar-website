import { page } from '$app/state';
import { DEFAULT_LANG, LOCALES, isLang, localePath, stripLang, type Lang } from './config.js';
import { de, type Dict } from './de.js';
import { en } from './en.js';

const dicts: Record<Lang, Dict> = { de, en };

/**
 * Reactive i18n state. The language comes from the URL (/de/… or /en/…), so
 * SSR and hydration always agree. Read `i18n.t` / `i18n.lang` inside templates
 * or $derived — never cache them in a plain const.
 */
export const i18n = {
	get lang(): Lang {
		const l = page.params.lang;
		return isLang(l) ? l : DEFAULT_LANG;
	},
	get t(): Dict {
		return dicts[this.lang];
	},
	get locale(): string {
		return LOCALES[this.lang];
	},
	/** Localised internal href, e.g. href('/addons') → /en/addons */
	href(path = '/'): string {
		return localePath(this.lang, path);
	},
	/** Same page (path + query) in another language. */
	switchHref(lang: Lang): string {
		return localePath(lang, stripLang(page.url.pathname)) + page.url.search;
	}
};

export { LANGS, type Lang } from './config.js';
export type { Dict };
