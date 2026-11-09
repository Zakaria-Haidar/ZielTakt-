import { motion } from 'framer-motion';
import { Phone, Mail, CalendarCheck } from 'lucide-react';
import { WhatsAppIcon } from './icons';
import useLang from '@/i18n/useLang';
import { CAL_URL, CONTACT_EMAIL as EMAIL, PHONE_HREF, whatsappHref } from '@/lib/contact';

export default function FloatingContact() {
  const { t } = useLang();
  const waHref = whatsappHref(t('whatsapp.message'));

  // Mobile bar, third slot: booking once Cal.com is live, e-mail until then.
  const third = CAL_URL
    ? { href: CAL_URL, icon: CalendarCheck, label: t('floating.book'), external: true }
    : { href: `mailto:${EMAIL}`, icon: Mail, label: t('floating.email'), external: false };
  const ThirdIcon = third.icon;

  return (
    <>
      {/* Desktop: floating circular buttons (bottom corner on the reading-end side) */}
      <div className="hidden md:flex fixed bottom-6 end-6 z-[90] flex-col gap-3">
        <motion.a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('whatsapp.write')}
          title={t('whatsapp.write')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: '#25D366', boxShadow: '0 0 20px rgba(37,211,102,0.4)' }}
        >
          <WhatsAppIcon />
        </motion.a>
        {CAL_URL && (
          <motion.a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('floating.bookAria')}
            title={t('floating.bookAria')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-void bg-neon"
            style={{ boxShadow: '0 0 20px rgba(0,224,255,0.4)' }}
          >
            <CalendarCheck className="w-5 h-5" />
          </motion.a>
        )}
        <motion.a
          href={`mailto:${EMAIL}`}
          aria-label={t('floating.emailAria')}
          title={t('floating.emailAria')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            CAL_URL ? 'glass text-neon border border-neon/30' : 'text-void bg-neon'
          }`}
          style={CAL_URL ? undefined : { boxShadow: '0 0 20px rgba(0,224,255,0.4)' }}
        >
          <Mail className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Mobile: sticky bottom bar (safe-area aware) */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-charcoal border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-3">
          <a
            href={PHONE_HREF}
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[11px] font-medium">{t('floating.call')}</span>
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon transition-colors border-x border-border"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span className="text-[11px] font-medium">{t('floating.whatsapp')}</span>
          </a>
          <a
            href={third.href}
            {...(third.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon transition-colors"
          >
            <ThirdIcon className="w-5 h-5" />
            <span className="text-[11px] font-medium">{third.label}</span>
          </a>
        </div>
      </div>
    </>
  );
}
