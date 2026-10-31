import { useState, useEffect } from 'react';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';
import { staedte } from '@/data/staedte';

// Absolute ("/#...") so the links also work from /impressum, /datenschutz and the 404 page.
const navLinks = [
  { label: 'Leistungen', href: '/#services' },
  { label: 'Über uns', href: '/#about' },
  { label: 'Einzugsgebiet', href: '/#area' },
  { label: 'Kontakt', href: '/#contact' },
];

const INSTAGRAM_URL = 'https://www.instagram.com/zieltakt';

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

export default function Footer() {
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
              <a href="/"><img src="/zieltakt-logo.png" alt="ZielTakt" width="1082" height="229" className="h-7 w-auto" /></a>
            </div>
            <p className="text-datagrey text-sm leading-relaxed max-w-xs">
              Digitale Growth-Systeme für lokale Unternehmen am Bodensee: Website, Sichtbarkeit, Anfragen und Wachstum aus einer Hand.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">Navigation</span>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-titanium/70 text-sm hover:text-neon transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Einsatzgebiet: town landing pages */}
          <div className="space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">Einsatzgebiet</span>
            <div className="flex flex-col gap-2">
              {staedte.map((stadt) => (
                <a
                  key={stadt.slug}
                  href={`/${stadt.slug}`}
                  className="text-titanium/70 text-sm hover:text-neon transition-colors duration-300"
                >
                  Webdesign {stadt.stadt}
                </a>
              ))}
            </div>
          </div>

          {/* Kontakt */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">Kontakt</span>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-titanium/70 text-sm hover:text-neon transition-colors duration-300 break-all">
                {CONTACT_EMAIL}
              </a>
              <a href={PHONE_HREF} className="text-titanium/70 text-sm hover:text-neon transition-colors duration-300">
                Tel. {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="text-titanium/70 text-sm hover:text-neon transition-colors duration-300">
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
              <span className="text-titanium/70 text-sm">Konstanz, Bodensee</span>
            </div>
          </div>

          {/* Social — TikTok folgt, sobald der Account-Link feststeht */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="text-datagrey text-xs tracking-widest uppercase">Social Media</span>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 hover:border-white/30 transition-all"
              >
                {instagramIcon}
              </a>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-titanium/60 text-xs font-mono">{time} · Konstanz</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <span className="text-datagrey text-xs">
            © {new Date().getFullYear()} ZielTakt. Alle Rechte vorbehalten.
          </span>
          <div className="flex gap-6">
            <a href="/impressum" className="text-titanium/80 text-sm hover:text-neon transition-colors">Impressum</a>
            <a href="/datenschutz" className="text-titanium/80 text-sm hover:text-neon transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}