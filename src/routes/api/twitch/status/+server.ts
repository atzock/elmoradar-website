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

async function fetchTwitchStatus(channel: string) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const clientId = env.TWITCH_CLIENT_ID;
		const appAccessToken = env.TWITCH_APP_ACCESS_TOKEN;

		if (!clientId || !appAccessToken) {
			return {
				configured: false,
				live: false,
				message: 'Missing TWITCH_CLIENT_ID or TWITCH_APP_ACCESS_TOKEN'
			};
		}

		const endpoint = new URL('https://api.twitch.tv/helix/streams');
		endpoint.searchParams.set('user_login', channel);

		const response = await fetch(endpoint, {
			headers: {
				'Client-Id': clientId,
				Authorization: `Bearer ${appAccessToken}`
			},
			signal: controller.signal
		});

		if (!response.ok) {
			throw new Error(`Twitch API returned ${response.status}`);
		}

		const payload = (await response.json()) as TwitchStreamsResponse;
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
	} finally {
		clearTimeout(timeout);
	}
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
				configured: Boolean(env.TWITCH_CLIENT_ID && env.TWITCH_APP_ACCESS_TOKEN),
				live: false,
				channel,
				error: message
			},
			{ status: 502 }
		);
	}
};
