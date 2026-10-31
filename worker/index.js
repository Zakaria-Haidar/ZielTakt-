// Cloudflare Worker. Only /api/* reaches this code (assets.run_worker_first in
// wrangler.jsonc); every other request is served straight from ./dist.
//
//   POST /api/contact  -> sends the contact form as a plain-text e-mail through
//                         Cloudflare Email Routing (send_email binding CONTACT_EMAIL).
import { EmailMessage } from 'cloudflare:email';

const FROM_NAME = 'Website ZielTakt';
const FROM_ADDRESS = 'kontakt@zieltakt.de';
const MAX_BODY_BYTES = 20_000;

// Deliberately simple: one "@", a dot in the domain, no whitespace or header-breaking characters.
const EMAIL_RE = /^[^\s@<>()",;:\\[\]]+@[^\s@<>()",;:\\[\]]+\.[^\s@<>()",;:\\[\]]{2,}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const str = (value) => (typeof value === 'string' ? value.trim() : '');
// Single-line values end up in headers: CR/LF and other control characters must never get through.
const oneLine = (value) => value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();

function validate(data) {
  const name = oneLine(str(data.name));
  const email = str(data.email);
  const phone = oneLine(str(data.phone));
  const message = str(data.message).replace(/\r\n?/g, '\n');

  if (name.length < 1 || name.length > 100) return { error: 'Bitte geben Sie Ihren Namen an (max. 100 Zeichen).' };
  if (email.length > 254 || !EMAIL_RE.test(email)) return { error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' };
  if (phone.length > 40) return { error: 'Die Telefonnummer ist zu lang (max. 40 Zeichen).' };
  if (message.length < 1 || message.length > 5000) return { error: 'Bitte geben Sie eine Nachricht ein (max. 5000 Zeichen).' };
  return { value: { name, email, phone, message } };
}

const utf8 = new TextEncoder();

function base64(text) {
  let binary = '';
  for (const byte of utf8.encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

// RFC 2047 encoded-word, so umlauts and the en dash survive in the subject.
const encodeHeader = (text) => `=?UTF-8?B?${base64(text)}?=`;

function buildRawEmail({ name, email, phone, message }, to) {
  const body = [
    'Neue Anfrage über das Kontaktformular auf zieltakt.de',
    '',
    `Name:    ${name}`,
    `E-Mail:  ${email}`,
    `Telefon: ${phone || '–'}`,
    '',
    'Nachricht:',
    message,
    '',
  ].join('\r\n');

  const headers = [
    `From: ${encodeHeader(FROM_NAME)} <${FROM_ADDRESS}>`,
    `To: <${to}>`,
    `Reply-To: <${email}>`,
    `Subject: ${encodeHeader(`Neue Anfrage über zieltakt.de – ${name}`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@zieltakt.de>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];

  // Base64 body in 76-character lines (RFC 2045).
  const encodedBody = base64(body).match(/.{1,76}/g).join('\r\n');
  return `${headers.join('\r\n')}\r\n\r\n${encodedBody}\r\n`;
}

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'POST' },
    });
  }
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
    return json({ ok: false, error: 'Content-Type must be application/json' }, 415);
  }

  const raw = await request.text();
  if (utf8.encode(raw).length > MAX_BODY_BYTES) return json({ ok: false, error: 'Anfrage zu groß.' }, 413);

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Ungültige Anfrage.' }, 400);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ ok: false, error: 'Ungültige Anfrage.' }, 400);

  // Honeypot: bots fill every field. Pretend success, send nothing.
  if (str(data.website)) return json({ ok: true });

  const { value, error } = validate(data);
  if (error) return json({ ok: false, error }, 400);

  const to = env.CONTACT_TO;
  try {
    await env.CONTACT_EMAIL.send(new EmailMessage(FROM_ADDRESS, to, buildRawEmail(value, to)));
  } catch (err) {
    // Only the error itself is logged, never the form content.
    console.error('contact: send failed:', err instanceof Error ? err.message : String(err));
    return json({ ok: false, error: 'Die Nachricht konnte nicht gesendet werden.' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') return handleContact(request, env);
    return json({ ok: false, error: 'Not found' }, 404);
  },
};
