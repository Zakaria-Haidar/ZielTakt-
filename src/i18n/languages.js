// Every language the site supports, in one place.
//
// Order here = order in the language switcher.
// To add another language (e.g. French):
//   1. copy src/locales/de.json to src/locales/fr.json and translate it (+ chat.fr.json)
//   2. add a line below
//   3. add `fr: { translation: fr }` to resources in src/i18n/index.js
//   4. add an '/fr' entry to src/routes.js, a <Route path="/fr"> in App.jsx
//      and the chat file to CONTENT in components/landing/chat/ChatPanel.jsx
// hreflang tags, the language switcher and the sitemap pick it up automatically.
export const LANGUAGES = {
  de: { code: 'de', label: 'DE', name: 'Deutsch', path: '/', dir: 'ltr', hreflang: 'de' },
  en: { code: 'en', label: 'EN', name: 'English', path: '/en', dir: 'ltr', hreflang: 'en' },
  ar: { code: 'ar', label: 'عربي', name: 'العربية', path: '/ar', dir: 'rtl', hreflang: 'ar' },
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
