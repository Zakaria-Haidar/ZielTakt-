import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';

import { CONTACT_EMAIL as EMAIL, PHONE_HREF, WHATSAPP_HREF } from '@/lib/contact';

const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.222 1.36.19 1.871.115.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347M12.02 22.09h-.005a10.03 10.03 0 01-4.988-1.343l-.358-.213-3.71.973.99-3.617-.233-.372a9.99 9.99 0 01-1.531-5.316c0-5.52 4.494-10.014 10.019-10.014 2.674 0 5.187 1.043 7.078 2.934a9.94 9.94 0 012.93 7.083c-.003 5.52-4.496 10.014-10.02 10.014m8.53-18.55A11.94 11.94 0 0012.021 0C5.4 0 .001 5.4 0 12.037c0 2.122.554 4.194 1.606 6.02L0 24l6.096-1.601a11.97 11.97 0 005.925 1.51h.005c6.62 0 12.02-5.4 12.023-12.037a11.96 11.96 0 00-3.5-8.478" />
  </svg>
);

export default function FloatingContact() {
  return (
    <>
      {/* Desktop: floating circular buttons */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[90] flex-col gap-3">
        <motion.a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp schreiben"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: '#25D366', boxShadow: '0 0 20px rgba(37,211,102,0.4)' }}
        >
          <WhatsAppIcon />
        </motion.a>
        <motion.a
          href={`mailto:${EMAIL}`}
          aria-label="E-Mail schreiben"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-void bg-neon"
          style={{ boxShadow: '0 0 20px rgba(0,224,255,0.4)' }}
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
            <span className="text-[11px] font-medium">Anrufen</span>
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon transition-colors border-x border-border"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span className="text-[11px] font-medium">WhatsApp</span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="text-[11px] font-medium">E-Mail</span>
          </a>
        </div>
      </div>
    </>
  );
}