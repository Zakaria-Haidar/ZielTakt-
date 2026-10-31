import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import SectionDivider from './SectionDivider';
import GlassButton from './GlassButton';
import { CONTACT_EMAIL, GOOGLE_PROFILE_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';

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

export default function Contact() {
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
          message: formData.message,
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

  return (
    <section id="contact" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            Kontakt
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Lassen Sie uns sprechen.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Ihr Name', autoComplete: 'name', required: true },
              { name: 'email', label: 'E-Mail', type: 'email', placeholder: 'ihre@email.de', autoComplete: 'email', required: true },
              { name: 'phone', label: 'Telefon (optional)', type: 'tel', placeholder: '+49 151 ...', autoComplete: 'tel', required: false },
            ].map((field) => (
              <div key={field.name} className="group">
                <label htmlFor={`contact-${field.name}`} className="text-datagrey text-xs tracking-widest uppercase block mb-3">
                  {field.label}
                </label>
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-0 border-b border-border pb-3 text-titanium text-lg placeholder:text-datagrey focus:outline-none focus:border-neon transition-colors duration-500"
                />
              </div>
            ))}

            {/* Honeypot: invisible to people, bots fill it in. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} defaultValue="" />
            </div>

            <div className="group">
              <label htmlFor="contact-message" className="text-datagrey text-xs tracking-widest uppercase block mb-3">
                Nachricht
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Erzählen Sie uns von Ihrem Projekt..."
                rows={4}
                className="w-full bg-transparent border-0 border-b border-border pb-3 text-titanium text-lg placeholder:text-datagrey focus:outline-none focus:border-neon transition-colors duration-500 resize-none"
              />
            </div>

            <div className="pt-4">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-full px-8 py-4 text-neon text-center font-medium glow-blue"
                >
                  ✓ Nachricht gesendet
                </motion.div>
              ) : (
                <GlassButton type="submit" disabled={loading}>
                  <span className="flex items-center gap-2">
                    {loading ? 'Wird gesendet…' : 'Nachricht senden'}
                    <Send className="w-4 h-4" />
                  </span>
                </GlassButton>
              )}
              <p className="mt-4 text-datagrey text-xs leading-relaxed">
                Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Bearbeitung Ihrer Anfrage zu. Mehr in der{' '}
                <a href="/datenschutz" className="text-neon hover:underline">Datenschutzerklärung</a>.
              </p>
              {error && (
                <p role="alert" className="mt-4 text-sm text-red-400 leading-relaxed">
                  Die Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-neon hover:underline">{CONTACT_EMAIL}</a>.
                </p>
              )}
            </div>
          </motion.form>

          {/* Contact info & socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-10"
          >
            <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.6' }}>
              Bereit für den nächsten Schritt? Kontaktieren Sie uns für eine kostenlose Erstberatung – wir melden uns in der Regel am selben Tag bei Ihnen.
            </p>

            <div className="space-y-5">
              
                <a href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center group-hover:glow-blue transition-all duration-500">
                  <Mail className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <div className="text-datagrey text-xs tracking-widest uppercase">E-Mail</div>
                  <div className="text-titanium text-base font-medium group-hover:text-neon transition-colors">{CONTACT_EMAIL}</div>
                </div>
              </a>

              
                <a href={PHONE_HREF}
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center group-hover:glow-blue transition-all duration-500">
                  <Phone className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <div className="text-datagrey text-xs tracking-widest uppercase">Telefon</div>
                  <div className="text-titanium text-base font-medium group-hover:text-neon transition-colors">{PHONE_DISPLAY}</div>
                </div>
              </a>


              <a href={WHATSAPP_HREF}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4 group"
>
  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center group-hover:glow-blue transition-all duration-500">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neon">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.254-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.222 1.36.19 1.871.115.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.075-.124-.272-.198-.57-.347M12.02 22.09h-.005a10.03 10.03 0 01-4.988-1.343l-.358-.213-3.71.973.99-3.617-.233-.372a9.99 9.99 0 01-1.531-5.316c0-5.52 4.494-10.014 10.019-10.014 2.674 0 5.187 1.043 7.078 2.934a9.94 9.94 0 012.93 7.083c-.003 5.52-4.496 10.014-10.02 10.014m8.53-18.55A11.94 11.94 0 0012.021 0C5.4 0 .001 5.4 0 12.037c0 2.122.554 4.194 1.606 6.02L0 24l6.096-1.601a11.97 11.97 0 005.925 1.51h.005c6.62 0 12.02-5.4 12.023-12.037a11.96 11.96 0 00-3.5-8.478" />
    </svg>
  </div>
  <div>
    <div className="text-datagrey text-xs tracking-widest uppercase">WhatsApp</div>
    <div className="text-titanium text-base font-medium group-hover:text-neon transition-colors">{WHATSAPP_DISPLAY}</div>
  </div>
</a>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-neon" />
                </div>
                <div>
                  <div className="text-datagrey text-xs tracking-widest uppercase">Standort</div>
                  <div className="text-titanium text-base font-medium">Konstanz, Bodensee</div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-3">
              <span className="text-datagrey text-xs tracking-widest uppercase">Folgen Sie uns</span>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  
                    <a key={link.label}
                    href={link.href}
                    title={link.label}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 hover:border-white/30 transition-all"
                  >
                    {socialIcons[link.icon]}
                  </a>
                ))}
              </div>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pt-2 text-neon text-sm font-medium hover:underline group"
              >
                Google-Bewertungen ansehen
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
