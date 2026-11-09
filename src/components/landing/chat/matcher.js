// Rule-based intent matching for the ZielTakt chat assistant. No AI, no network:
// the visitor's text is normalised, then scored against keyword lists from
// src/locales/chat.<lang>.json. Highest score wins; 0 = "not understood".

// German/Latin: lower case, ä->a, ß->ss, punctuation -> space.
// Arabic: strip vowel marks (tashkeel) and tatweel, unify alef/ya/ta-marbuta forms,
// so "أسعار", "اسعار" and "الأسعار" all match the keyword "اسعار".
export function normalize(text = '') {
  return ` ${String(text)
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // Latin accents/umlaut dots
    .replace(/[ً-ٰٟـ]/g, '') // Arabic tashkeel + tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}@+]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
}

// A keyword matches if it appears in the text. Keywords up to 3 characters
// ("ki", "seo", "chf") must stand alone as a word, so "ki" doesn't fire on "kinder".
// Arabic words often carry a prefix (ال، و، ب، ل، ف، ك), so for Arabic the keyword
// may also follow one of those.
function hits(text, keyword) {
  const k = normalize(keyword).trim();
  if (!k) return 0;
  if (k.length <= 3) return text.includes(` ${k} `) ? 1 : 0;
  if (text.includes(k)) return k.length >= 6 ? 2 : 1; // longer, more specific keywords weigh more
  return 0;
}

// intents: [{ id, keywords: [...] }]. Returns { id, score } of the best match.
export function matchIntent(input, intents) {
  const text = normalize(input);
  let best = { id: null, score: 0 };
  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords || []) score += hits(text, kw);
    if (score > best.score) best = { id: intent.id, score };
  }
  return best;
}

// Same rule as the contact form Worker (worker/index.js), so a lead the chat
// accepts is never rejected on sending.
export const EMAIL_RE = /^[^\s@<>()",;:\\[\]]+@[^\s@<>()",;:\\[\]]+\.[^\s@<>()",;:\\[\]]{2,}$/;

export function isEmail(value) {
  return EMAIL_RE.test(String(value).trim());
}

// Phone: digits with optional +, spaces, dashes, slashes, brackets; 6–20 digits.
export function isPhone(value) {
  const v = String(value).trim();
  if (!/^[+\d][\d\s\-/().]*$/.test(v)) return false;
  const digits = v.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 20;
}

// A name should look like a name, not a question someone typed at the wrong step.
export function looksLikeName(value) {
  const v = String(value).trim();
  if (v.length < 2 || v.length > 80) return false;
  if (/[?!@\d]/.test(v)) return false;
  return v.split(/\s+/).length <= 5;
}
