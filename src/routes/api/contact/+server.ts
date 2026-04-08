import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types.js';

// ── Rate limiting ────────────────────────────────────────────────────────────
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 3;                     // max submissions per window per IP
const ipLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const hits = (ipLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
	if (hits.length >= RATE_MAX) return true;
	ipLog.set(ip, [...hits, now]);
	return false;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getIp(request: Request): string {
	return (
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
		request.headers.get('cf-connecting-ip') ??
		'unknown'
	);
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// ── Handler ──────────────────────────────────────────────────────────────────
export const POST: RequestHandler = async ({ request }) => {
	const ip = getIp(request);

	// Rate limit check
	if (isRateLimited(ip)) {
		return json({ error: 'Zu viele Anfragen. Bitte warte ein paar Minuten.' }, { status: 429 });
	}

	let body: Record<string, string>;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Ungültige Anfrage.' }, { status: 400 });
	}

	const { name, email, subject, message, _gotcha, _renderTime } = body;

	// Honeypot check — must be empty
	if (_gotcha) {
		// Silently accept to not tip off bots
		return json({ ok: true });
	}

	// Timing check — form must have been open for at least 3 seconds
	const renderTime = parseInt(_renderTime ?? '0', 10);
	if (!renderTime || Date.now() - renderTime < 3000) {
		return json({ error: 'Formular zu schnell ausgefüllt. Bitte nochmal versuchen.' }, { status: 400 });
	}

	// Input validation
	if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
		return json({ error: 'Bitte alle Felder ausfüllen.' }, { status: 400 });
	}
	if (name.length > 100 || subject.length > 200 || message.length > 5000) {
		return json({ error: 'Eingabe zu lang.' }, { status: 400 });
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
	}

	// Email config check
	const smtpUser = env.SMTP_USER;
	const smtpPass = env.SMTP_PASS;
	const smtpTo   = env.SMTP_TO ?? smtpUser;
	const smtpHost = env.SMTP_HOST ?? 'smtp.gmail.com';
	const smtpPort = parseInt(env.SMTP_PORT ?? '587', 10);

	if (!smtpUser || !smtpPass) {
		console.error('[contact] SMTP_USER or SMTP_PASS not configured');
		return json({ error: 'Mailversand nicht konfiguriert. Bitte direkt per Mail schreiben.' }, { status: 503 });
	}

	const transporter = nodemailer.createTransport({
		host: smtpHost,
		port: smtpPort,
		secure: smtpPort === 465,
		auth: { user: smtpUser, pass: smtpPass }
	});

	const nameSafe    = escapeHtml(name.trim());
	const emailSafe   = escapeHtml(email.trim());
	const subjectSafe = escapeHtml(subject.trim());
	const messageSafe = escapeHtml(message.trim()).replace(/\n/g, '<br>');

	try {
		await transporter.sendMail({
			from: `"elmoradar Kontaktformular" <${smtpUser}>`,
			to: smtpTo,
			replyTo: email.trim(),
			subject: `[elmoradar.de] ${subject.trim()}`,
			text: `Von: ${name.trim()} <${email.trim()}>\nBetreff: ${subject.trim()}\n\n${message.trim()}`,
			html: `
				<div style="font-family:sans-serif;max-width:600px;color:#111;">
					<h2 style="margin-bottom:4px">Neue Kontaktanfrage</h2>
					<p style="color:#555;font-size:13px;margin-top:0">über elmoradar.de</p>
					<hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
					<table style="font-size:14px;border-collapse:collapse;width:100%">
						<tr><td style="padding:6px 0;color:#888;width:100px">Name</td><td style="padding:6px 0">${nameSafe}</td></tr>
						<tr><td style="padding:6px 0;color:#888">E-Mail</td><td style="padding:6px 0"><a href="mailto:${emailSafe}">${emailSafe}</a></td></tr>
						<tr><td style="padding:6px 0;color:#888">Betreff</td><td style="padding:6px 0">${subjectSafe}</td></tr>
					</table>
					<hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
					<p style="font-size:14px;line-height:1.6;white-space:pre-wrap">${messageSafe}</p>
				</div>
			`
		});

		return json({ ok: true });
	} catch (err) {
		console.error('[contact] Mail send failed:', err);
		return json({ error: 'E-Mail konnte nicht gesendet werden. Bitte direkt per Mail schreiben.' }, { status: 500 });
	}
};
