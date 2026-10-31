// Single source of truth for per-route <head> data. Read by usePageMeta (client)
// and by scripts/prerender.js (build), so both always produce the same tags.
import { staedte } from '@/data/staedte';
import { GOOGLE_PROFILE_URL, INSTAGRAM_URL, PHONE_DISPLAY } from '@/lib/contact';

export const SITE_URL = 'https://www.zieltakt.de';
export const OG_IMAGE = `${SITE_URL}/zieltakt-logo.png`;

const COUNTRY_NAMES = { DE: 'Deutschland', CH: 'Schweiz' };

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ZielTakt',
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: 'info@zieltakt.de',
  telephone: PHONE_DISPLAY,
  priceRange: '1590€–4990€',
  areaServed: [
    'Konstanz', 'Friedrichshafen', 'Meersburg', 'Überlingen', 'Radolfzell', 'Singen', 'Stockach',
    'Kreuzlingen', 'Frauenfeld', 'Schaffhausen', 'St. Gallen', 'Winterthur', 'Zürich',
  ].map((name) => ({ '@type': 'City', name })),
  description:
    'Professionelle Websites, lokale Google-Sichtbarkeit, Online-Buchung und Automatisierung für lokale Unternehmen in Konstanz und der Bodensee-Region.',
  sameAs: [GOOGLE_PROFILE_URL, INSTAGRAM_URL],
};

function townJsonLd(stadt) {
  const url = `${SITE_URL}/${stadt.slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Webdesign',
      name: stadt.h1,
      description: stadt.metaDescription,
      url,
      provider: {
        '@type': 'Organization',
        name: 'ZielTakt',
        url: `${SITE_URL}/`,
        telephone: PHONE_DISPLAY,
      },
      areaServed: {
        '@type': 'City',
        name: stadt.stadt,
        containedInPlace: { '@type': 'Country', name: COUNTRY_NAMES[stadt.land] },
      },
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
    jsonLd: [homeJsonLd],
    sitemap: { changefreq: 'monthly', priority: '1.0' },
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
    path: `/${stadt.slug}`,
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
    title: route.title,
    description: route.description,
    canonical: url,
    ogTitle: route.ogTitle ?? route.title,
    ogDescription: route.ogDescription ?? route.description,
    ogUrl: url,
    ogLocale: route.lang.replace('-', '_'),
    robots: route.noindex ? 'noindex' : null,
    jsonLd: route.jsonLd ?? [],
  };
}
