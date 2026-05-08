import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types.js';

const REQUEST_TIMEOUT_MS = 8000;

type TwitchStreamsResponse = {
	data?: Array<{
		id: string;
		user_login: string;
		user_name: string;
		game_name: string;
		title: string;
		viewer_count: number;
		started_at: string;
	}>;
};

// Module-level token cache — survives across requests within a server process
let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAppAccessToken(clientId: string, clientSecret: string): Promise<string> {
	const now = Date.now();

	// Return cached token if still valid with a 60s safety buffer
	if (tokenCache && tokenCache.expiresAt > now + 60_000) {
		return tokenCache.token;
	}

	const res = await fetch('https://id.twitch.tv/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'client_credentials'
		})
	});

	if (!res.ok) {
		throw new Error(`Twitch token fetch failed: ${res.status} ${res.statusText}`);
	}

	const data = (await res.json()) as { access_token: string; expires_in: number };
	tokenCache = {
		token: data.access_token,
		expiresAt: now + data.expires_in * 1000
	};

	return tokenCache.token;
}

async function fetchTwitchStatus(channel: string) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const clientId = env.TWITCH_CLIENT_ID;
		const clientSecret = env.TWITCH_CLIENT_SECRET;

		if (!clientId || !clientSecret) {
			return {
				configured: false,
				live: false,
				message: 'Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET in environment'
			};
		}

		const accessToken = await getAppAccessToken(clientId, clientSecret);

		const endpoint = new URL('https://api.twitch.tv/helix/streams');
		endpoint.searchParams.set('user_login', channel);

		const response = await fetch(endpoint, {
			headers: {
				'Client-Id': clientId,
				Authorization: `Bearer ${accessToken}`
			},
			signal: controller.signal
		});

		// Token was invalidated server-side — bust cache and retry once
		if (response.status === 401) {
			tokenCache = null;
			const freshToken = await getAppAccessToken(clientId, clientSecret);

			const retry = await fetch(endpoint, {
				headers: {
					'Client-Id': clientId,
					Authorization: `Bearer ${freshToken}`
				}
			});

			if (!retry.ok) throw new Error(`Twitch API returned ${retry.status} after token refresh`);

			const payload = (await retry.json()) as TwitchStreamsResponse;
			return buildStatusResponse(payload, channel);
		}

		if (!response.ok) {
			throw new Error(`Twitch API returned ${response.status}`);
		}

		const payload = (await response.json()) as TwitchStreamsResponse;
		return buildStatusResponse(payload, channel);
	} finally {
		clearTimeout(timeout);
	}
}

function buildStatusResponse(payload: TwitchStreamsResponse, channel: string) {
	const stream = payload.data?.[0];

	if (!stream) {
		return {
			configured: true,
			live: false,
			channel,
			title: 'Offline',
			viewers: 0,
			lastUpdated: new Date().toISOString()
		};
	}

	return {
		configured: true,
		live: true,
		channel: stream.user_login,
		displayName: stream.user_name,
		title: stream.title,
		game: stream.game_name,
		viewers: stream.viewer_count,
		startedAt: stream.started_at,
		url: `https://twitch.tv/${stream.user_login}`,
		lastUpdated: new Date().toISOString()
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const channel = url.searchParams.get('channel')?.toLowerCase() ?? 'elmoradar';

	try {
		const status = await fetchTwitchStatus(channel);
		return json(status);
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown Twitch error';

		return json(
			{
				configured: Boolean(env.TWITCH_CLIENT_ID && env.TWITCH_CLIENT_SECRET),
				live: false,
				channel,
				error: message
			},
			{ status: 502 }
		);
	}
};
