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
		const data = await fetchJson<MemberFlightplan[]>(endpoint);

		return json({
			memberId,
			count: data.length,
			items: data.slice(0, 10)
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
