import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Send, RotateCcw, CalendarCheck } from 'lucide-react';
import useLang from '@/i18n/useLang';
import { sectionHref } from '@/i18n/languages';
import { CAL_URL, whatsappHref } from '@/lib/contact';
import { WhatsAppIcon } from '../icons';
import { matchIntent, isEmail, isPhone, looksLikeName } from './matcher';
import de from '@/locales/chat.de.json';
import en from '@/locales/chat.en.json';
import ar from '@/locales/chat.ar.json';

// ZielTakt chat assistant: rule-based (no AI, no third party). This file is
// only downloaded when a visitor opens the chat (lazy import in FloatingContact).
// Nothing is stored; a lead is sent to /api/contact only after the visitor confirms.
const CONTENT = { de, en, ar };

const fill = (text, vars = {}) => text.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');

const prefersReducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

let nextId = 1;
const msg = (from, text, extra = {}) => ({ id: nextId++, from, text, ...extra });

export default function ChatPanel({ open, onClose }) {
  const { t, lang } = useLang();
  const c = CONTENT[lang] ?? de;
  const intentById = useCallback((id) => c.intents.find((i) => i.id === id), [c]);

  const [messages, setMessages] = useState(() => [msg('bot', c.greeting, { chips: c.menu })]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(null); // null = normal chat; else lead step
  const [lead, setLead] = useState({ name: '', business: '', email: '', phone: '' });
  const [lastTopic, setLastTopic] = useState('');

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  // Bot replies appear after a short "typing" pause (skipped for reduced motion).
  const botSay = useCallback((text, extra = {}) => {
    const delay = prefersReducedMotion() ? 0 : 450;
    setTyping(true);
    const id = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, msg('bot', text, extra)]);
    }, delay);
    timers.current.push(id);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // Focus the input on open; Escape closes; lock page scroll on phones.
  useEffect(() => {
    if (!open) return undefined;
    const focusTimer = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const isPhone = window.innerWidth < 768;
    const prevOverflow = document.body.style.overflow;
    if (isPhone) document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      if (isPhone) document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const L = c.lead;

  const answerIntent = (id) => {
    if (id === 'lead') return startLead();
    const intent = intentById(id);
    if (!intent) return botSay(c.fallback, { chips: c.fallbackChips });
    if (!['greeting', 'thanks'].includes(id)) setLastTopic(intent.label);
    botSay(intent.answer, { chips: intent.chips, actions: intent.actions });
  };

  const startLead = () => {
    setStep('name');
    setLead({ name: '', business: '', email: '', phone: '' });
    botSay(L.start, { chips: ['cancelLead'] });
  };

  const cancelLead = () => {
    setStep(null);
    botSay(L.cancelled, { chips: c.menu });
  };

  const sendLead = async (data) => {
    setStep('sending');
    setMessages((m) => [...m, msg('bot', L.sending, { transient: true })]);
    const message = [
      L.messageIntro,
      '',
      `${L.businessLabel}: ${data.business}`,
      `${L.topicLabel}: ${lastTopic || '–'}`,
      `Seite: ${window.location.pathname}`,
    ].join('\n');
    let ok = false;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, message, website: '' }),
      });
      const json = await res.json().catch(() => ({}));
      ok = res.ok && json.ok;
    } catch {
      ok = false;
    }
    setMessages((m) => m.filter((x) => !x.transient));
    setStep(null);
    if (ok) botSay(fill(L.success, { name: data.name.split(' ')[0] }), { actions: ['book'] });
    else botSay(L.error, { actions: ['whatsapp'] });
  };

  // One lead step per visitor answer.
  const handleLeadInput = (text) => {
    if (step === 'name') {
      if (!looksLikeName(text)) return botSay(L.nameAgain, { chips: ['cancelLead'] });
      setLead((d) => ({ ...d, name: text }));
      setStep('business');
      return botSay(fill(L.askBusiness, { name: text.split(' ')[0] }), { chips: ['cancelLead'] });
    }
    if (step === 'business') {
      if (text.length < 2 || text.length > 120) return botSay(L.businessAgain, { chips: ['cancelLead'] });
      setLead((d) => ({ ...d, business: text }));
      setStep('email');
      return botSay(L.askEmail, { chips: ['cancelLead'] });
    }
    if (step === 'email') {
      if (!isEmail(text)) return botSay(L.emailAgain, { chips: ['cancelLead'] });
      setLead((d) => ({ ...d, email: text }));
      setStep('phone');
      return botSay(L.askPhone, { chips: ['skipPhone', 'cancelLead'] });
    }
    if (step === 'phone') {
      if (!isPhone(text)) return botSay(L.phoneAgain, { chips: ['skipPhone', 'cancelLead'] });
      return toSummary(text);
    }
    if (step === 'confirm') {
      // Typed instead of tapping a button: show the summary and the two choices again.
      return botSay(fill(L.summary, { ...lead, phone: lead.phone || L.noPhone }), {
        chips: ['confirmLead', 'cancelLead'],
        consent: true,
      });
    }
    return undefined;
  };

  const toSummary = (phone) => {
    const next = { ...lead, phone };
    setLead(next);
    setStep('confirm');
    botSay(fill(L.summary, { ...next, phone: phone || L.noPhone }), {
      chips: ['confirmLead', 'cancelLead'],
      consent: true,
    });
  };

  const chipLabel = (id) => {
    if (id === 'lead') return L.chip;
    if (id === 'cancelLead') return L.cancel;
    if (id === 'skipPhone') return L.skipPhone;
    if (id === 'confirmLead') return L.confirm;
    return intentById(id)?.label ?? id;
  };

  const onChip = (id) => {
    if (step === 'sending') return;
    setMessages((m) => [...m, msg('user', chipLabel(id))]);
    if (id === 'cancelLead') return cancelLead();
    if (id === 'skipPhone') return toSummary('');
    if (id === 'confirmLead') return sendLead(lead);
    if (step) setStep(null); // a topic chip during the lead flow leaves the flow
    return answerIntent(id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || step === 'sending') return;
    setInput('');
    setMessages((m) => [...m, msg('user', text)]);
    if (step) return handleLeadInput(text);
    const { id, score } = matchIntent(text, c.intents);
    if (score > 0) return answerIntent(id);
    return botSay(c.fallback, { chips: c.fallbackChips });
  };

  const restart = () => {
    timers.current.forEach(clearTimeout);
    setTyping(false);
    setStep(null);
    setLastTopic('');
    setMessages([msg('bot', c.greeting, { chips: c.menu })]);
  };

  // Buttons under a bot answer: book (Cal.com), WhatsApp, lead form, jump to a section.
  const renderAction = (a) => {
    const base =
      'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300';
    if (a === 'book') {
      const href = CAL_URL ?? sectionHref(lang, 'contact');
      return (
        <a
          key={a}
          href={href}
          {...(CAL_URL ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: onClose })}
          className={`${base} bg-neon text-on-neon hover:bg-neon/90`}
        >
          <CalendarCheck className="w-4 h-4" />
          {c.actions.book}
        </a>
      );
    }
    if (a === 'whatsapp') {
      return (
        <a
          key={a}
          href={whatsappHref(t('whatsapp.message'))}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} text-white`}
          style={{ backgroundColor: '#25D366' }}
        >
          <WhatsAppIcon className="w-4 h-4" />
          {c.actions.whatsapp}
        </a>
      );
    }
    if (a === 'lead') {
      return (
        <button key={a} type="button" onClick={() => onChip('lead')} className={`${base} border border-neon/40 text-neon-ink hover:bg-neon/10`}>
          {c.actions.lead}
        </button>
      );
    }
    const section = a === 'prices' ? 'preise' : a === 'projects' ? 'projekt' : null;
    if (!section) return null;
    return (
      <a key={a} href={sectionHref(lang, section)} onClick={onClose} className={`${base} border border-neon/40 text-neon-ink hover:bg-neon/10`}>
        {c.actions[a]}
      </a>
    );
  };

  const last = messages[messages.length - 1];

  return (
    <div
      role="dialog"
      aria-label={c.title}
      aria-hidden={!open}
      className={`${open ? 'flex' : 'hidden'} fixed z-[120] inset-0 md:inset-auto md:bottom-6 md:end-24 md:w-[390px] md:h-[min(620px,calc(100vh-7rem))] flex-col bg-charcoal md:rounded-2xl md:border md:border-neon/20 shadow-2xl shadow-black/60 overflow-hidden`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-void/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center font-heading font-bold text-on-neon flex-shrink-0">
          Z
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-titanium text-sm font-semibold truncate">{c.title}</div>
          <div className="flex items-center gap-1.5 text-datagrey text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="truncate">{c.subtitle}</span>
          </div>
        </div>
        <button type="button" onClick={restart} aria-label={c.restart} title={c.restart} className="p-2 text-datagrey hover:text-titanium">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button type="button" onClick={onClose} aria-label={c.close} title={c.close} className="p-2 text-datagrey hover:text-titanium">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={listRef} role="log" aria-live="polite" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 overscroll-contain">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                m.from === 'user'
                  ? 'bg-neon text-on-neon rounded-ee-md'
                  : 'bg-ink/5 border border-ink/10 text-titanium rounded-es-md'
              }`}
            >
              {m.text}
              {m.consent && m === last && (
                <div className="mt-2 pt-2 border-t border-ink/10 text-datagrey text-xs">
                  {c.lead.consent}{' '}
                  <a href="/datenschutz" hrefLang="de" target="_blank" rel="noopener noreferrer" className="text-neon-ink hover:underline">
                    {c.lead.privacyLink}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start" aria-hidden="true">
            <div className="bg-ink/5 border border-ink/10 rounded-2xl rounded-es-md px-4 py-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-datagrey animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {/* Buttons and suggestion chips belong to the latest bot answer only */}
        {!typing && last?.from === 'bot' && (last.actions?.length || last.chips?.length) ? (
          <div className="space-y-2 pt-1">
            {last.actions?.length ? <div className="flex flex-wrap gap-2">{last.actions.map(renderAction)}</div> : null}
            {last.chips?.length ? (
              <div className="flex flex-wrap gap-2">
                {last.chips.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onChip(id)}
                    className="rounded-full border border-neon/30 px-3 py-1.5 text-xs font-medium text-neon-ink hover:bg-neon/10 transition-colors"
                  >
                    {chipLabel(id)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="border-t border-border p-3 flex items-center gap-2 bg-void/60">
        <label htmlFor="zt-chat-input" className="sr-only">{c.inputPlaceholder}</label>
        <input
          id="zt-chat-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={c.inputPlaceholder}
          autoComplete="off"
          maxLength={300}
          dir="auto"
          disabled={step === 'sending'}
          className="flex-1 min-w-0 bg-ink/5 border border-ink/10 rounded-full px-4 py-2.5 text-titanium placeholder:text-datagrey focus:outline-none focus:border-neon/50"
          style={{ fontSize: '16px' }} // 16px stops iOS from zooming into the field
        />
        <button
          type="submit"
          aria-label={c.send}
          disabled={!input.trim() || step === 'sending'}
          className="w-11 h-11 rounded-full bg-neon text-on-neon flex items-center justify-center disabled:opacity-40 flex-shrink-0"
        >
          <Send className="w-4 h-4 rtl:-scale-x-100" />
        </button>
      </form>
      <p className="px-4 pb-2 -mt-1 text-[11px] text-datagrey/80 light:text-datagrey bg-void/60">{c.footnote}</p>
    </div>
  );
}
