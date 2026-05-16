import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

const REQUEST_TIMEOUT_MS = 8000;

type MemberFlightplan = {
	id: number;
	callsign: string;
	aircraft?: string;
	dep?: string;
	arr?: string;
	altitude?: string;
	route?: string;
	filed?: string;
};

type VatsimCoreFlightplan = {
	id?: number;
	callsign?: string;
	aircraft?: string;
	departure?: string;
	arrival?: string;
	altitude?: string;
	route?: string;
	filed_at?: string;
	created_at?: string;
	updated_at?: string;
	deptime?: string;
	enroute_time?: string;
	dep?: string;
	arr?: string;
	filed?: string;
};

type VatsimCoreFlightplansResponse = VatsimCoreFlightplan[] | { items?: VatsimCoreFlightplan[]; results?: VatsimCoreFlightplan[]; data?: VatsimCoreFlightplan[] };

function normalizeFlightplan(entry: VatsimCoreFlightplan, index: number): MemberFlightplan {
	return {
		id: entry.id ?? index,
		callsign: entry.callsign ?? 'N/A',
		aircraft: entry.aircraft,
		dep: entry.dep ?? entry.departure,
		arr: entry.arr ?? entry.arrival,
		altitude: entry.altitude,
		route: entry.route,
		filed: entry.filed ?? entry.filed_at ?? entry.updated_at ?? entry.created_at
	};
}

function extractFlightplans(payload: VatsimCoreFlightplansResponse): VatsimCoreFlightplan[] {
	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload.items)) {
		return payload.items;
	}

	if (Array.isArray(payload.results)) {
		return payload.results;
	}

	if (Array.isArray(payload.data)) {
		return payload.data;
	}

	return [];
}

async function fetchJson<T>(url: string): Promise<T> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const response = await fetch(url, {
			headers: {
				accept: 'application/json'
			},
			signal: controller.signal
		});

		if (!response.ok) {
			throw new Error(`Upstream request failed with status ${response.status}`);
		}

		return (await response.json()) as T;
	} finally {
		clearTimeout(timeout);
	}
}

export const GET: RequestHandler = async ({ url }) => {
	const memberId = url.searchParams.get('memberId');

	if (!memberId) {
		return json(
			{
				error: 'Query parameter memberId is required'
			},
			{ status: 400 }
		);
	}

	try {
		const endpoint = `https://api.vatsim.net/v2/members/${encodeURIComponent(memberId)}/flightplans`;
		const payload = await fetchJson<VatsimCoreFlightplansResponse>(endpoint);
		const allItems = extractFlightplans(payload);
		const items = allItems
			.slice(0, 1)
			.map((entry, index) => normalizeFlightplan(entry, index));

		return json({
			memberId,
			count: allItems.length,
			items
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown VATSIM Core API error';

		return json(
			{
				memberId,
				error: message
			},
			{ status: 502 }
		);
	}
};
