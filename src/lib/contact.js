// Single source of truth for contact details used across the site.
export const CONTACT_EMAIL = 'info@zieltakt.de';

// Calls go to the German mobile number.
export const PHONE_DISPLAY = '+49 151 50104908';
export const PHONE_HREF = 'tel:+4915150104908';

// WhatsApp runs on the Swiss number.
export const WHATSAPP_DISPLAY = '+41 77 277 41 49';
export const WHATSAPP_HREF = 'https://wa.me/41772774149';

// WhatsApp link with a pre-filled first message (text comes from the translation files).
export const whatsappHref = (text) =>
  text ? `${WHATSAPP_HREF}?text=${encodeURIComponent(text)}` : WHATSAPP_HREF;

// Cal.com booking page for the "15-Minuten Erstgespräch".
// Leave null until the Cal.com event exists: every booking button hides itself while
// this is null (and the CTAs fall back to the contact form), so nothing links to a dead page.
// If the Cal.com username or event slug ever changes, update this link too
// (the old link stops working immediately).
export const CAL_URL = 'https://cal.com/zieltakt-dmdpyk/15min';

// Google Business Profile (reviews). Linked only; nothing is embedded.
export const GOOGLE_PROFILE_URL = 'https://maps.google.com/?cid=9393194777394528964';
export const INSTAGRAM_URL = 'https://www.instagram.com/zieltakt';
