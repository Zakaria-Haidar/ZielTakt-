import { useState, useEffect } from 'react';
import { CONTACT_EMAIL, GOOGLE_PROFILE_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';
import { staedte, townPath } from '@/data/staedte';
import useLang from '@/i18n/useLang';
import { homePath } from '@/i18n/languages';

const instagramIcon = (
  <svg viewBox="0 0 24 24" className="w-7 h-7">
    <defs>
      <radialGradient id="igGradFooter" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#igGradFooter)" />
    <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
  </svg>
);

// Used on every page (home, Arabic home, town pages, Impressum, Datenschutz, 404).
// Section links are absolute ("/#..." or "/ar#...") so they work from any page.
export default function Footer() {
  const { t, lang, href } = useLang();
  const navLinks = t('nav.links', { returnObjects: true });
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    const update = () => {
      // e.g. "14:05 MESZ" in summer, "14:05 MEZ" in winter
      const parts = fmt.formatToParts(new Date());
      const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
      setTime(`${get('hour')}:${get('minute')} ${get('timeZoneName')}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-charcoal border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 pb-12 border-b border-border">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <a href={homePath(lang)}><img src="/zieltakt-logo.png" alt="ZielTakt" width="1082" height="229" className="zt-logo h-7 w-auto" /></a>
            </div>
            <p className="text-datagrey text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">{t('footer.navigation')}</span>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={href(link.id)}
                  className="text-titanium/70 text-sm hover:text-neon-ink transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Einsatzgebiet: town landing pages (German) */}
          <div className="space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">{t('footer.area')}</span>
            <div className="flex flex-col gap-2">
              {staedte.map((stadt) => (
                <a
                  key={stadt.slug}
                  href={townPath(stadt)}
                  hrefLang="de"
                  className="text-titanium/70 text-sm hover:text-neon-ink transition-colors duration-300"
                >
                  {t('footer.townLink', { city: stadt.stadt })}
                </a>
              ))}
            </div>
          </div>

          {/* Kontakt */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">{t('footer.contact')}</span>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-titanium/70 text-sm hover:text-neon-ink transition-colors duration-300 break-all">
                <bdi dir="ltr">{CONTACT_EMAIL}</bdi>
              </a>
              <a href={PHONE_HREF} className="text-titanium/70 text-sm hover:text-neon-ink transition-colors duration-300">
                {t('footer.phonePrefix')} <bdi dir="ltr">{PHONE_DISPLAY}</bdi>
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-titanium/70 text-sm hover:text-neon-ink transition-colors duration-300">
                {t('footer.whatsappPrefix')} <bdi dir="ltr">{WHATSAPP_DISPLAY}</bdi>
              </a>
              <span className="text-titanium/70 text-sm">{t('footer.location')}</span>
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-titanium/70 text-sm hover:text-neon-ink transition-colors duration-300">
                {t('footer.reviews')}
              </a>
            </div>
          </div>

          {/* Social — TikTok folgt, sobald der Account-Link feststeht */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">{t('footer.social')}</span>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl bg-ink/5 border border-ink/10 flex items-center justify-center hover:scale-110 hover:border-ink/30 transition-all"
              >
                {instagramIcon}
              </a>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-titanium/60 light:text-titanium/75 text-xs"><bdi dir="ltr" className="font-mono">{time}</bdi> · {t('footer.clockPlace')}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <span className="text-datagrey text-xs">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </span>
          <div className="flex gap-6">
            <a href="/impressum" hrefLang="de" className="text-titanium/80 text-sm hover:text-neon-ink transition-colors">{t('footer.imprint')}</a>
            <a href="/datenschutz" hrefLang="de" className="text-titanium/80 text-sm hover:text-neon-ink transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
