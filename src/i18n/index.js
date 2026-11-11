// i18next setup. The translation files are bundled (not fetched), so i18next can
// initialise synchronously: the build-time prerender and the browser's first render
// produce exactly the same text, which React needs for hydration.
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from '@/locales/de.json';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import { DEFAULT_LANG, LANGUAGES } from './languages';

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG, // a key missing in ar.json shows the German text instead of a raw key
  supportedLngs: Object.keys(LANGUAGES),
  initAsync: false,
  interpolation: { escapeValue: false }, // React escapes output already
  // "" in a translation file means "intentionally no text in this language"
  // (e.g. pricing.vatNoteOriginal and area.remote on the German page); components
  // hide the element when it's empty. i18next ≥ 22 otherwise treats "" as missing
  // and prints the raw key.
  returnEmptyString: true,
  react: { useSuspense: false },
});

export default i18n;
