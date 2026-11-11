// Single source of truth for per-route <head> data. Read by usePageMeta (client)
// and by scripts/prerender.js (build), so both always produce the same tags.
import { staedte, townPath } from '@/data/staedte';
import { CONTACT_EMAIL, GOOGLE_PROFILE_URL, INSTAGRAM_URL, PHONE_DISPLAY } from '@/lib/contact';
import de from '@/locales/de.json';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import { LANGUAGES } from '@/i18n/languages';

export const SITE_URL = 'https://www.zieltakt.de';
export const OG_IMAGE = `${SITE_URL}/zieltakt-logo.png`;

const COUNTRY_NAMES = { DE: 'Deutschland', CH: 'Schweiz' };

const absolute = (path) => `${SITE_URL}${path}`;

// hreflang set for the home page: one entry per language plus x-default (German).
// Adding a language in src/i18n/languages.js adds it here automatically.
const HOME_ALTERNATES = [
  ...Object.values(LANGUAGES).map((l) => ({ hreflang: l.hreflang, href: absolute(l.path) })),
  { hreflang: 'x-default', href: absolute(LANGUAGES.de.path) },
];

// Service-area business: LocalBusiness with the city only (no street address shown).
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'ZielTakt',
  url: `${SITE_URL}/`,
  logo: OG_IMAGE,
  image: OG_IMAGE,
  telephone: PHONE_DISPLAY,
  email: CONTACT_EMAIL,
  priceRange: '€€',
  address: { '@type': 'PostalAddress', addressLocality: 'Konstanz', addressRegion: 'Baden-Württemberg', addressCountry: 'DE' },
  areaServed: staedte.map((stadt) => ({ '@type': 'City', name: stadt.stadt })),
  knowsLanguage: ['de', 'ar', 'en'],
  sameAs: [GOOGLE_PROFILE_URL, INSTAGRAM_URL],
};

// FAQPage from the same FAQ texts the page shows, per language.
const faqJsonLd = (locale) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: locale === de ? 'de' : locale === en ? 'en' : 'ar',
  mainEntity: locale.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

function townJsonLd(stadt) {
  const url = `${SITE_URL}${townPath(stadt)}`;
  const city = {
    '@type': 'City',
    name: stadt.stadt,
    containedInPlace: { '@type': 'Country', name: COUNTRY_NAMES[stadt.land] },
  };
  return [
    {
      // The business, scoped to this town (same @id as the home page entity).
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'ZielTakt',
      url: `${SITE_URL}/`,
      logo: OG_IMAGE,
      image: OG_IMAGE,
      telephone: PHONE_DISPLAY,
      email: CONTACT_EMAIL,
      priceRange: '€€',
      address: { '@type': 'PostalAddress', addressLocality: 'Konstanz', addressRegion: 'Baden-Württemberg', addressCountry: 'DE' },
      areaServed: city,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Webdesign & Local SEO',
      name: stadt.h1,
      description: stadt.metaDescription,
      url,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: city,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: `Webdesign ${stadt.stadt}`, item: url },
      ],
    },
  ];
}

export const routes = [
  {
    path: '/',
    lang: 'de-DE',
    title: 'ZielTakt – Digitales Wachstumssystem für lokale Unternehmen in Konstanz',
    description:
      'ZielTakt aus Konstanz: ein digitales Wachstumssystem aus Website, Google-Sichtbarkeit, Online-Buchung und Automatisierung. Damit lokale Kunden Sie finden und einfach Kontakt aufnehmen – für Unternehmen in der DACH-Region.',
    ogTitle: 'ZielTakt – Webdesign Studio Konstanz',
    ogDescription:
      'Professionelle Websites für Unternehmen am Bodensee: modernes Design, lokale Google-Sichtbarkeit und Online-Buchung aus einer Hand.',
    alternates: HOME_ALTERNATES,
    jsonLd: [homeJsonLd, faqJsonLd(de)],
    sitemap: { changefreq: 'monthly', priority: '1.0' },
  },
  {
    path: '/en',
    lang: 'en',
    ogLocale: 'en_GB',
    title: 'ZielTakt – Websites & Google visibility for local businesses | Konstanz',
    description:
      'ZielTakt from Konstanz: professional websites, Google visibility, reviews, WhatsApp and online booking for local businesses in Germany and Switzerland. Free intro call in English, German or Arabic.',
    ogTitle: 'ZielTakt – Web design studio Konstanz',
    ogDescription:
      'Websites for businesses around Lake Constance: modern design, local Google visibility and online booking from one source.',
    alternates: HOME_ALTERNATES,
    jsonLd: [homeJsonLd, faqJsonLd(en)],
    sitemap: { changefreq: 'monthly', priority: '0.9' },
  },
  {
    path: '/ar',
    lang: 'ar',
    dir: 'rtl',
    ogLocale: 'ar_AR',
    title: 'ZielTakt – مواقع إلكترونية وظهور على Google للشركات في ألمانيا',
    description:
      'ZielTakt من كونستانس: موقع احترافي، وظهور على Google وخرائط Google، وتقييمات، وتواصل عبر واتساب وحجز مواعيد عبر الإنترنت. لتجد شركتك عملاء جدداً وموظفين. استشارة بالعربية أو الألمانية.',
    ogTitle: 'ZielTakt – عملاء جدد لمشروعك عبر Google',
    ogDescription:
      'مواقع عصرية، وظهور محلي على Google، وتقييمات، وواتساب وحجز مواعيد، من مصدر واحد. استشارة مجانية بالعربية.',
    alternates: HOME_ALTERNATES,
    jsonLd: [homeJsonLd, faqJsonLd(ar)],
    sitemap: { changefreq: 'monthly', priority: '0.9' },
  },
  {
    path: '/impressum',
    lang: 'de-DE',
    title: 'Impressum – ZielTakt',
    description: 'Impressum und Anbieterkennzeichnung von ZielTakt, Webdesign Studio in Konstanz.',
    sitemap: { changefreq: 'yearly', priority: '0.3' },
  },
  {
    path: '/datenschutz',
    lang: 'de-DE',
    title: 'Datenschutzerklärung – ZielTakt',
    description: 'Datenschutzerklärung von ZielTakt: welche Daten wir erheben, wofür und welche Rechte Sie haben.',
    sitemap: { changefreq: 'yearly', priority: '0.3' },
  },
  ...staedte.map((stadt) => ({
    path: townPath(stadt),
    lang: stadt.lang,
    title: stadt.title,
    description: stadt.metaDescription,
    jsonLd: townJsonLd(stadt),
    sitemap: { changefreq: 'monthly', priority: '0.8' },
  })),
];

// Not a real route: rendered to dist/404.html, served by Cloudflare with status 404.
export const notFoundRoute = {
  path: '/404',
  lang: 'de-DE',
  title: 'Seite nicht gefunden – ZielTakt',
  description: 'Diese Seite existiert nicht.',
  noindex: true,
};

export function getRoute(path) {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return routes.find((r) => r.path === clean) ?? notFoundRoute;
}

// Everything usePageMeta and the prerender script need, as flat values.
export function getHead(route) {
  const url = route.noindex ? null : `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  return {
    lang: route.lang,
    dir: route.dir ?? 'ltr',
    title: route.title,
    description: route.description,
    canonical: url,
    ogTitle: route.ogTitle ?? route.title,
    ogDescription: route.ogDescription ?? route.description,
    ogUrl: url,
    ogLocale: route.ogLocale ?? route.lang.replace('-', '_'),
    robots: route.noindex ? 'noindex' : null,
    alternates: route.alternates ?? [],
    jsonLd: route.jsonLd ?? [],
  };
}
