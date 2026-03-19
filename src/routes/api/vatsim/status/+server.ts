import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

const VATSIM_DATA_URL = 'https://data.vatsim.net/v3/vatsim-data.json';
const REQUEST_TIMEOUT_MS = 8000;

type VatsimPilot = {
	cid?: number;
	callsign: string;
	flight_plan?: {
		departure?: string;
		arrival?: string;
	};
	altitude?: number;
};

type VatsimDataResponse = {
	general?: {
		version?: number;
		reload?: string;
	};
	pilots?: VatsimPilot[];
	controllers?: unknown[];
	atis?: unknown[];
};

function formatAltitude(altitude: number | undefined): string {
	if (typeof altitude !== 'number' || Number.isNaN(altitude)) {
		return 'N/A';
	}

	if (altitude <= 0) {
		return 'GND';
	}

	const flightLevel = Math.round(altitude / 100);
	return `FL${flightLevel}`;
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
	const callsign = url.searchParams.get('callsign')?.toUpperCase() ?? 'EDDB_DEP';

	try {
		const data = await fetchJson<VatsimDataResponse>(VATSIM_DATA_URL);
		const pilots = data.pilots ?? [];
		const pilot = pilots.find((entry) => entry.callsign?.toUpperCase() === callsign);

		return json({
			connected: Boolean(pilot),
			callsign,
			memberId: pilot?.cid ?? null,
			route: pilot?.flight_plan
				? `${pilot.flight_plan.departure ?? '????'} → ${pilot.flight_plan.arrival ?? '????'}`
				: 'N/A',
			altitude: formatAltitude(pilot?.altitude),
			onlinePilots: pilots.length,
			onlineControllers: data.controllers?.length ?? 0,
			onlineAtis: data.atis?.length ?? 0,
			dataVersion: data.general?.version ?? null,
			lastUpdated: new Date().toISOString()
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown VATSIM error';

		return json(
			{
				connected: false,
				callsign,
				route: 'N/A',
				altitude: 'N/A',
				error: message
			},
			{ status: 502 }
		);
	}
};
