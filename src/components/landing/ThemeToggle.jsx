import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import useLang from '@/i18n/useLang';

export const THEME_KEY = 'zt-theme';

// The theme lives on <html data-theme="dark|light">. index.html sets it from
// localStorage before first paint (light by default), so this component only flips
// the attribute and remembers the choice. Both icons are rendered and CSS shows
// the right one, so prerendered HTML and hydration always match.
// `withLabel` shows the action as text next to the icon (used in the mobile menu).
export default function ThemeToggle({ className = '', withLabel = false }) {
  const { t } = useLang();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#F2E9DC' : '#070708');
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // storage blocked: the choice just lasts for this page view
    }
    setTheme(next);
  };

  const label = theme === 'light' ? t('nav.themeToDark') : t('nav.themeToLight');

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={withLabel ? undefined : label}
      title={withLabel ? undefined : label}
      className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full text-datagrey hover:text-titanium transition-colors duration-300 ${className}`}
    >
      {/* Shows the theme you switch to: sun in dark mode, moon in light mode. */}
      <Sun className="w-[18px] h-[18px] light:hidden" aria-hidden="true" />
      <Moon className="w-[18px] h-[18px] hidden light:block" aria-hidden="true" />
      {withLabel && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
