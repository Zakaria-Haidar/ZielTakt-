import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, CalendarCheck, MessageCircle, X } from 'lucide-react';
import { WhatsAppIcon } from './icons';
import useLang from '@/i18n/useLang';
import { CAL_URL, CONTACT_EMAIL as EMAIL, PHONE_HREF, whatsappHref } from '@/lib/contact';

// The chat window is a separate download that only starts when someone shows
// interest (hover/touch/click on the chat button), so it never slows the page.
const loadChat = () => import('./chat/ChatPanel');
const ChatPanel = lazy(loadChat);

const TEASER_KEY = 'zieltakt-chat-teaser';
const readSession = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};
const writeSession = (key, value) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // storage blocked: teaser just shows again next time
  }
};

export default function FloatingContact() {
  const { t } = useLang();
  const waHref = whatsappHref(t('whatsapp.message'));
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMounted, setChatMounted] = useState(false);
  const [teaser, setTeaser] = useState(false);

  // Small teaser bubble on desktop after 8 s, once per visit.
  useEffect(() => {
    if (readSession(TEASER_KEY)) return undefined;
    const id = setTimeout(() => setTeaser(true), 8000);
    return () => clearTimeout(id);
  }, []);

  const dismissTeaser = () => {
    setTeaser(false);
    writeSession(TEASER_KEY, '1');
  };
  const openChat = () => {
    dismissTeaser();
    setChatMounted(true);
    setChatOpen(true);
  };
  const toggleChat = () => (chatOpen ? setChatOpen(false) : openChat());

  // Mobile bar, third slot: booking once Cal.com is live, e-mail until then.
  const third = CAL_URL
    ? { href: CAL_URL, icon: CalendarCheck, label: t('floating.book'), external: true }
    : { href: `mailto:${EMAIL}`, icon: Mail, label: t('floating.email'), external: false };
  const ThirdIcon = third.icon;

  const chatButtonProps = {
    type: 'button',
    onClick: toggleChat,
    onMouseEnter: loadChat,
    onTouchStart: loadChat,
    onFocus: loadChat,
    'aria-label': chatOpen ? t('chatLauncher.close') : t('chatLauncher.open'),
    'aria-expanded': chatOpen,
    title: t('chatLauncher.open'),
  };

  return (
    <>
      {/* Desktop: floating circular buttons (bottom corner on the reading-end side) */}
      <div className="hidden md:flex fixed bottom-6 end-6 z-[90] flex-col items-end gap-3">
        <div className="relative">
          <AnimatePresence>
            {teaser && !chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-1 end-[4.5rem] w-60 glass-strong rounded-2xl rounded-ee-md border border-neon/30 p-3 pe-8 text-sm text-titanium shadow-xl shadow-black/50"
              >
                <button type="button" onClick={openChat} className="text-start leading-snug">
                  {t('chatLauncher.teaser')}
                </button>
                <button
                  type="button"
                  onClick={dismissTeaser}
                  aria-label={t('chatLauncher.dismiss')}
                  className="absolute top-2 end-2 p-1 text-datagrey hover:text-titanium"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            {...chatButtonProps}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center text-on-neon bg-gradient-to-br from-neon to-neon-dark"
            style={{ boxShadow: '0 0 24px rgba(0,224,255,0.45)' }}
          >
            {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            {!chatOpen && <span className="absolute -top-0.5 -end-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-void" />}
          </motion.button>
        </div>
        <motion.a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('whatsapp.write')}
          title={t('whatsapp.write')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="w-12 h-12 me-1 rounded-full flex items-center justify-center text-white"
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
            className="w-12 h-12 me-1 rounded-full flex items-center justify-center glass text-neon-ink border border-neon/30"
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
          className="w-12 h-12 me-1 rounded-full flex items-center justify-center glass text-neon-ink border border-neon/30"
        >
          <Mail className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Mobile: chat button above the bottom bar */}
      {!chatOpen && (
        <button
          {...chatButtonProps}
          className="md:hidden fixed end-4 z-[91] w-14 h-14 rounded-full flex items-center justify-center text-on-neon bg-gradient-to-br from-neon to-neon-dark"
          style={{ bottom: 'calc(4.75rem + env(safe-area-inset-bottom))', boxShadow: '0 0 20px rgba(0,224,255,0.45)' }}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-0.5 -end-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-void" />
        </button>
      )}

      {/* Mobile: sticky bottom bar (safe-area aware) */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-charcoal border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-3">
          <a
            href={PHONE_HREF}
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon-ink transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[11px] font-medium">{t('floating.call')}</span>
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon-ink transition-colors border-x border-border"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span className="text-[11px] font-medium">{t('floating.whatsapp')}</span>
          </a>
          <a
            href={third.href}
            {...(third.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex flex-col items-center justify-center gap-1 py-3 text-datagrey hover:text-neon-ink transition-colors"
          >
            <ThirdIcon className="w-5 h-5" />
            <span className="text-[11px] font-medium">{third.label}</span>
          </a>
        </div>
      </div>

      {chatMounted && (
        <Suspense fallback={null}>
          <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
