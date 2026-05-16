import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

const REQUEST_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 10 * 60 * 1000;

type CacheEntry = { data: unknown; expiresAt: number };
const g = globalThis as typeof globalThis & { __atcCache?: Map<string, CacheEntry> };
if (!g.__atcCache) g.__atcCache = new Map();
const cache = g.__atcCache;

type VatsimAtcSession = {
	connection_id?: {
		callsign?: string;
		start?: string;
		end?: string;
		type?: number;
		server?: string;
	};
};

type VatsimAtcResponse = VatsimAtcSession[] | { items?: VatsimAtcSession[]; results?: VatsimAtcSession[] };

export type AtcSession = {
	callsign: string;
	start?: string;
	end?: string;
	minutes: number;
};

function extractSessions(payload: VatsimAtcResponse): VatsimAtcSession[] {
	if (Array.isArray(payload)) return payload;
	if (Array.isArray(payload.items)) return payload.items;
	if (Array.isArray(payload.results)) return payload.results;
	return [];
}

async function fetchJson<T>(url: string): Promise<T> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const response = await fetch(url, {
			headers: { accept: 'application/json' },
			signal: controller.signal
		});
		if (response.status === 429) throw Object.assign(new Error('rate_limited'), { status: 429 });
		if (!response.ok) throw new Error(`Upstream request failed with status ${response.status}`);
		return (await response.json()) as T;
	} finally {
		clearTimeout(timeout);
	}
}

export const GET: RequestHandler = async ({ url }) => {
	const memberId = url.searchParams.get('memberId');

	if (!memberId) {
		return json({ error: 'Query parameter memberId is required' }, { status: 400 });
	}

	const cached = cache.get(memberId);
	if (cached && cached.expiresAt > Date.now()) {
		return json(cached.data);
	}

	try {
		const endpoint = `https://api.vatsim.net/v2/members/${encodeURIComponent(memberId)}/atc`;
		const payload = await fetchJson<VatsimAtcResponse>(endpoint);
		const all = extractSessions(payload);

		const last = all[0];
		if (!last) {
			const result = { memberId, session: null };
			cache.set(memberId, { data: result, expiresAt: Date.now() + CACHE_TTL_MS });
			return json(result);
		}

		const conn = last.connection_id;
		const start = conn?.start;
		const end = conn?.end;
		const minutes =
			start && end
				? Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
				: 0;

		const session: AtcSession = {
			callsign: conn?.callsign ?? 'N/A',
			start,
			end,
			minutes
		};

		const result = { memberId, session };
		cache.set(memberId, { data: result, expiresAt: Date.now() + CACHE_TTL_MS });
		return json(result);
	} catch (error) {
		const isRateLimited = error instanceof Error && error.message === 'rate_limited';
		if (isRateLimited) {
			const stale = cache.get(memberId);
			if (stale) return json(stale.data);
			return json({ memberId, session: null });
		}
		const message = error instanceof Error ? error.message : 'Unknown VATSIM API error';
		return json({ memberId, error: message }, { status: 502 });
	}
};
