import type { ParamMatcher } from '@sveltejs/kit';
import { isLang } from '$lib/i18n/config.js';

export const match: ParamMatcher = (param) => isLang(param);
