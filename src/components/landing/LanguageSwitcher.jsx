import useLang from '@/i18n/useLang';
import { LANGUAGES, storeLang } from '@/i18n/languages';

// Plain links ("/" and "/ar"), so it works without JavaScript and every language
// version is a real, crawlable URL. Clicking also remembers the choice.
export default function LanguageSwitcher({ className = '', onNavigate }) {
  const { t, lang } = useLang();

  return (
    <nav aria-label={t('nav.languageLabel')} className={`flex items-center gap-1 ${className}`}>
      {Object.values(LANGUAGES).map((l) => {
        const active = l.code === lang;
        return (
          <a
            key={l.code}
            href={l.path}
            hrefLang={l.hreflang}
            lang={l.code}
            aria-current={active ? 'true' : undefined}
            title={l.name}
            onClick={() => {
              storeLang(l.code);
              onNavigate?.();
            }}
            className={`min-w-[44px] min-h-[36px] inline-flex items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-300 ${
              active
                ? 'text-neon-ink bg-neon/10 border border-neon/30'
                : 'text-datagrey border border-transparent hover:text-titanium'
            }`}
          >
            {l.label}
          </a>
        );
      })}
    </nav>
  );
}
