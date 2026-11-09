// Every language the site supports, in one place.
//
// To add English later:
//   1. copy src/locales/de.json to src/locales/en.json and translate it
//   2. uncomment the "en" line below
//   3. add `en: { translation: en }` to resources in src/i18n/index.js
//   4. add an '/en' entry to src/routes.js and a <Route path="/en"> in App.jsx
// hreflang tags, the language switcher and the sitemap pick it up automatically.
export const LANGUAGES = {
  de: { code: 'de', label: 'DE', name: 'Deutsch', path: '/', dir: 'ltr', hreflang: 'de' },
  ar: { code: 'ar', label: 'عربي', name: 'العربية', path: '/ar', dir: 'rtl', hreflang: 'ar' },
  // en: { code: 'en', label: 'EN', name: 'English', path: '/en', dir: 'ltr', hreflang: 'en' },
};

export const DEFAULT_LANG = 'de';
export const STORAGE_KEY = 'zieltakt-lang';

// "/ar" and "/ar/..." -> "ar"; everything else (/, /impressum, town pages) -> German.
export function langFromPath(pathname = '/') {
  const first = pathname.split('/')[1] || '';
  return first !== DEFAULT_LANG && LANGUAGES[first] ? first : DEFAULT_LANG;
}

export const homePath = (lang) => LANGUAGES[lang]?.path ?? '/';

// Link to a section of the home page in that language: "/#contact" or "/ar#contact".
export const sectionHref = (lang, id) => `${homePath(lang)}#${id}`;

// localStorage can throw (Safari private mode, blocked storage, sandboxed iframes),
// so every access is wrapped. Failing just means "not remembered".
export function readStoredLang() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value && LANGUAGES[value] ? value : null;
  } catch {
    return null;
  }
}

export function storeLang(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage unavailable: the choice simply isn't remembered.
  }
}
