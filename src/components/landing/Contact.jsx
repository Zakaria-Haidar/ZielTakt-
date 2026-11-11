import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CalendarCheck } from 'lucide-react';
import SectionDivider from './SectionDivider';
import GlassButton from './GlassButton';
import { WhatsAppIcon, Arrow } from './icons';
import useLang from '@/i18n/useLang';
import {
  CAL_URL,
  CONTACT_EMAIL,
  GOOGLE_PROFILE_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_DISPLAY,
  whatsappHref,
} from '@/lib/contact';

// TikTok wird wieder ergänzt, sobald der Account-Link feststeht.
const socialLinks = [
  { label: 'Instagram', icon: 'instagram', href: INSTAGRAM_URL },
];

const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#igGrad)" />
      <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
    </svg>
  ),
};

// Field config; labels/placeholders come from contact.fields.<name> in the translation files.
// Email and phone are always typed left-to-right, also on the Arabic page.
const fields = [
  { name: 'name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', type: 'email', autoComplete: 'email', required: true, ltr: true },
  { name: 'phone', type: 'tel', autoComplete: 'tel', required: false, ltr: true },
];

// One row in the contact list: icon tile + small label + value.
function ContactRow({ icon, label, value, href, external }) {
  const body = (
    <>
      <div className="w-11 h-11 rounded-xl glass flex items-center justify-center group-hover:glow-blue transition-all duration-500 flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-datagrey text-xs tracking-widest uppercase">{label}</div>
        <div className="text-titanium text-base font-medium group-hover:text-neon-ink transition-colors">{value}</div>
      </div>
    </>
  );
  if (!href) return <div className="flex items-center gap-4">{body}</div>;
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-4 group"
    >
      {body}
    </a>
  );
}

export default function Contact() {
  const { t, lang } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const honeypotRef = useRef(null);

  // "Partner werden" (PartnerProgramm) presets the request type.
  useEffect(() => {
    const onPreset = (e) => {
      const presetSubject = e.detail?.subject;
      if (!presetSubject) return;
      setFormData((prev) =>
        prev.message ? prev : { ...prev, message: `${presetSubject}: ` }
      );
    };
    window.addEventListener('preset-contact', onPreset);
    return () => window.removeEventListener('preset-contact', onPreset);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          // Tag Arabic-page enquiries so you know which language to answer in.
          message: lang === 'de' ? formData.message : `[${lang.toUpperCase()}] ${formData.message}`,
          website: honeypotRef.current?.value ?? '',
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border-0 border-b border-border pb-3 text-titanium text-lg placeholder:text-datagrey focus:outline-none focus:border-neon transition-colors duration-500 light:border-datagrey light:focus:border-neon-ink';

  return (
    <section id="contact" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            viewport={{ once: true }}
            className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('contact.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('contact.title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {fields.map((field) => (
              <div key={field.name} className="group">
                <label htmlFor={`contact-${field.name}`} className="text-datagrey text-xs tracking-widest uppercase block mb-3">
                  {t(`contact.fields.${field.name}.label`)}
                </label>
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  dir={field.ltr ? 'ltr' : undefined}
                  value={formData[field.name]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  placeholder={t(`contact.fields.${field.name}.placeholder`)}
                  className={`${inputClass} ${field.ltr ? 'rtl:text-right' : ''}`}
                />
              </div>
            ))}

            {/* Honeypot: invisible to people, bots fill it in. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="contact-website">{t('contact.honeypot')}</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} defaultValue="" />
            </div>

            <div className="group">
              <label htmlFor="contact-message" className="text-datagrey text-xs tracking-widest uppercase block mb-3">
                {t('contact.fields.message.label')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('contact.fields.message.placeholder')}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="pt-4">
              {sent ? (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  className="glass rounded-full px-8 py-4 text-neon-ink text-center font-medium glow-blue"
                >
                  {t('contact.sent')}
                </motion.div>
              ) : (
                <GlassButton type="submit" disabled={loading}>
                  {loading ? t('contact.sending') : t('contact.send')}
                  <Send className="w-4 h-4 rtl:-scale-x-100" />
                </GlassButton>
              )}
              <p className="mt-4 text-datagrey text-xs leading-relaxed">
                {t('contact.consent')}{' '}
                <a href="/datenschutz" hrefLang="de" className="text-neon-ink hover:underline">{t('contact.consentLink')}</a>.
              </p>
              {error && (
                <p role="alert" className="mt-4 text-sm text-red-400 light:text-red-700 leading-relaxed">
                  {t('contact.error')}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-neon-ink hover:underline"><bdi dir="ltr">{CONTACT_EMAIL}</bdi></a>.
                </p>
              )}
            </div>
          </motion.form>

          {/* Booking, contact info & socials */}
          <motion.div
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-10"
          >
            <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.6' }}>
              {t('contact.intro')}
            </p>

            {/* Cal.com booking card: only rendered once CAL_URL is set in src/lib/contact.js */}
            {CAL_URL && (
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong rounded-2xl p-5 flex items-center gap-4 border border-neon/30 hover:border-neon/60 hover:glow-blue transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-6 h-6 text-neon-ink" />
                </div>
                <div className="flex-1">
                  <div className="text-titanium text-base font-semibold">{t('contact.bookTitle')}</div>
                  <div className="text-datagrey text-sm mt-0.5">{t('contact.bookSub')}</div>
                </div>
                <span className="text-neon-ink text-lg"><Arrow /></span>
              </a>
            )}

            <div className="space-y-5">
              <ContactRow
                icon={<WhatsAppIcon className="w-5 h-5 text-neon-ink" />}
                label={t('contact.labels.whatsapp')}
                value={<bdi dir="ltr">{WHATSAPP_DISPLAY}</bdi>}
                href={whatsappHref(t('whatsapp.message'))}
                external
              />
              <ContactRow
                icon={<Phone className="w-5 h-5 text-neon-ink" />}
                label={t('contact.labels.phone')}
                value={<bdi dir="ltr">{PHONE_DISPLAY}</bdi>}
                href={PHONE_HREF}
              />
              <ContactRow
                icon={<Mail className="w-5 h-5 text-neon-ink" />}
                label={t('contact.labels.email')}
                value={<bdi dir="ltr">{CONTACT_EMAIL}</bdi>}
                href={`mailto:${CONTACT_EMAIL}`}
              />
              <ContactRow
                icon={<MapPin className="w-5 h-5 text-neon-ink" />}
                label={t('contact.labels.location')}
                value={t('contact.locationValue')}
              />
            </div>

            {/* Social */}
            <div className="space-y-3">
              <span className="text-datagrey text-xs tracking-widest uppercase">{t('contact.follow')}</span>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    title={link.label}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-ink/5 border border-ink/10 flex items-center justify-center hover:scale-110 hover:border-ink/30 transition-all"
                  >
                    {socialIcons[link.icon]}
                  </a>
                ))}
              </div>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-2 text-neon-ink text-sm font-medium hover:underline group"
              >
                {t('contact.reviews')}
                <Arrow />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
