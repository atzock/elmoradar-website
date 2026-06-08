import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

const REQUEST_TIMEOUT_MS = 8000;
const DEFAULT_HANDLE = 'elmoradarVODs';

const YOUTUBE_REQUEST_HEADERS = {
	accept: 'text/html,application/xml,text/xml;q=0.9,*/*;q=0.8',
	'accept-language': 'en-US,en;q=0.9',
	'user-agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
	cookie: 'CONSENT=YES+'
};

const KNOWN_CHANNEL_IDS: Record<string, string> = {
	elmoradarvods: 'UCMMd1JGWgaufBcXZ6bIVrBw',
	elmoradar: 'UCNml1dmg1_goWYae9Hc53uA'
};

type YoutubeVideo = {
	videoId: string;
	title: string;
	publishedAt: string;
	url: string;
	embedUrl: string;
};

function sanitizeHandle(rawHandle: string | null): string {
	const candidate = (rawHandle ?? DEFAULT_HANDLE).trim();
	const withoutAt = candidate.startsWith('@') ? candidate.slice(1) : candidate;
	return withoutAt || DEFAULT_HANDLE;
}

async function fetchText(url: string): Promise<string> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

	try {
		const response = await fetch(url, {
			headers: YOUTUBE_REQUEST_HEADERS,
			signal: controller.signal
		});

		if (!response.ok) {
			throw new Error(`Upstream request failed with status ${response.status}`);
		}

		return await response.text();
	} finally {
		clearTimeout(timeout);
	}
}

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractChannelIdFromHandlePage(html: string): string | null {
	const regexes = [
		/"channelId":"(UC[^"]{22,})"/,
		/"browseId":"(UC[^"]{22,})"/,
		/\/channel\/(UC[\w-]{22})/
	];

	for (const pattern of regexes) {
		const match = html.match(pattern);
		if (match?.[1]) {
			return match[1];
		}
	}

	return null;
}

function extractChannelIdFromSearchPage(html: string, handle: string): string | null {
	const escapedHandle = escapeRegExp(handle);
	const patterns = [
		new RegExp(`"channelId":"(UC[\\w-]{22})"[\\s\\S]{0,600}?"canonicalBaseUrl":"/@${escapedHandle}"`, 'i'),
		new RegExp(`"canonicalBaseUrl":"/@${escapedHandle}"[\\s\\S]{0,600}?"channelId":"(UC[\\w-]{22})"`, 'i')
	];

	for (const pattern of patterns) {
		const match = html.match(pattern);
		if (match?.[1]) {
			return match[1];
		}
	}

	const genericMatch = html.match(/"channelId":"(UC[\w-]{22})"/);
	return genericMatch?.[1] ?? null;
}

async function resolveChannelIdFromHandle(handle: string): Promise<string> {
	const known = KNOWN_CHANNEL_IDS[handle.toLowerCase()];
	if (known) {
		return known;
	}

	const handlePageHtml = await fetchText(`https://www.youtube.com/@${encodeURIComponent(handle)}`);
	const fromHandlePage = extractChannelIdFromHandlePage(handlePageHtml);
	if (fromHandlePage) {
		return fromHandlePage;
	}

	const searchPageHtml = await fetchText(`https://www.youtube.com/results?search_query=${encodeURIComponent(handle)}`);
	const fromSearchPage = extractChannelIdFromSearchPage(searchPageHtml, handle);
	if (fromSearchPage) {
		return fromSearchPage;
	}

	throw new Error('Could not resolve YouTube channel ID from handle');
}

function parseVideoEntries(feedXml: string): YoutubeVideo[] {
	const entries = feedXml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

	return entries
		.map((entryXml): YoutubeVideo | null => {
			const id = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
			const title = entryXml.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
			const publishedAt = entryXml.match(/<published>([^<]+)<\/published>/)?.[1]?.trim();

			if (!id || !title || !publishedAt) {
				return null;
			}

			return {
				videoId: id,
				title,
				publishedAt,
				url: `https://www.youtube.com/watch?v=${id}`,
				embedUrl: `https://www.youtube.com/embed/${id}`
			};
		})
		.filter((item): item is YoutubeVideo => Boolean(item));
}

export const GET: RequestHandler = async ({ url }) => {
	const handle = sanitizeHandle(url.searchParams.get('handle'));

	try {
		const channelId = await resolveChannelIdFromHandle(handle);
		const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
		const feedXml = await fetchText(feedUrl);
		const items = parseVideoEntries(feedXml).slice(0, 2);

		return json({
			handle,
			channelId,
			count: items.length,
			items,
			lastUpdated: new Date().toISOString()
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown YouTube error';

		return json(
			{
				handle,
				count: 0,
				items: [],
				error: message
			},
			{ status: 502 }
		);
	}
};