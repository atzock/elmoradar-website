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

type VatsimController = {
	cid?: number;
	callsign: string;
};

type VatsimDataResponse = {
	general?: {
		version?: number;
		reload?: string;
	};
	pilots?: VatsimPilot[];
	controllers?: VatsimController[];
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
	const requestedCallsign = url.searchParams.get('callsign')?.toUpperCase() ?? null;
	const requestedMemberIdRaw = url.searchParams.get('memberId');
	const requestedMemberId = requestedMemberIdRaw ? Number(requestedMemberIdRaw) : null;

	if (requestedMemberIdRaw && (requestedMemberId === null || !Number.isInteger(requestedMemberId) || requestedMemberId <= 0)) {
		return json(
			{
				error: 'Query parameter memberId must be a positive integer'
			},
			{ status: 400 }
		);
	}

	const fallbackCallsign = requestedCallsign ?? 'EDDB_DEP';

	try {
		const data = await fetchJson<VatsimDataResponse>(VATSIM_DATA_URL);
		const pilots = data.pilots ?? [];
		const controllers = data.controllers ?? [];
		const pilot = requestedMemberId
			? pilots.find((entry) => entry.cid === requestedMemberId)
			: pilots.find((entry) => entry.callsign?.toUpperCase() === fallbackCallsign);
		const controller = requestedMemberId
			? controllers.find((entry) => entry.cid === requestedMemberId)
			: controllers.find((entry) => entry.callsign?.toUpperCase() === fallbackCallsign);
		const memberId = pilot?.cid ?? controller?.cid ?? null;
		const resolvedCallsign = pilot?.callsign ?? controller?.callsign ?? fallbackCallsign;

		return json({
			connected: Boolean(pilot || controller),
			callsign: resolvedCallsign,
			memberId,
			networkRole: pilot ? 'pilot' : controller ? 'controller' : 'offline',
			route: pilot?.flight_plan
				? `${pilot.flight_plan.departure ?? '????'} → ${pilot.flight_plan.arrival ?? '????'}`
				: controller
					? 'ATC Station'
					: 'N/A',
			altitude: formatAltitude(pilot?.altitude),
			onlinePilots: pilots.length,
			onlineControllers: controllers.length,
			onlineAtis: data.atis?.length ?? 0,
			dataVersion: data.general?.version ?? null,
			lastUpdated: new Date().toISOString()
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown VATSIM error';

		return json(
			{
				connected: false,
				callsign: fallbackCallsign,
				memberId: requestedMemberId,
				route: 'N/A',
				altitude: 'N/A',
				error: message
			},
			{ status: 502 }
		);
	}
};
