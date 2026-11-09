import { useTranslation } from 'react-i18next';
import { DEFAULT_LANG, LANGUAGES, sectionHref } from './languages';

// One hook for every component: the t() function plus the current language info.
//   const { t, lang, isRtl, href } = useLang();
//   t('hero.title')                         -> text
//   t('services.items', { returnObjects: true }) -> array/object from the JSON
//   href('contact')                         -> "/#contact" or "/ar#contact"
export default function useLang() {
  const { t, i18n } = useTranslation();
  const lang = LANGUAGES[i18n.language] ? i18n.language : DEFAULT_LANG;
  return {
    t,
    lang,
    isRtl: LANGUAGES[lang].dir === 'rtl',
    href: (id) => sectionHref(lang, id),
  };
}
