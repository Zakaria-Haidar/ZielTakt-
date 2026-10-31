import usePageMeta from '@/hooks/usePageMeta';
import LegalPage from '@/components/landing/LegalPage';
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';

export default function Impressum() {
  usePageMeta('/impressum');

  return (
    <LegalPage>
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        ZielTakt<br />
        Inhaber: Zakaria Haidar<br />
        Rheingutstraße 32<br />
        78462 Konstanz<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a><br />
        WhatsApp: <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">{WHATSAPP_DISPLAY}</a><br />
        E-Mail: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>Kleinunternehmer gemäß § 19 UStG – es wird keine Umsatzsteuer ausgewiesen.</p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Zakaria Haidar, Anschrift wie oben</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <h2>Haftung für Inhalte</h2>
      <p>Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>

      <h2>Haftung für Links</h2>
      <p>Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.</p>

      <h2>Urheberrecht</h2>
      <p>Die Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung.</p>
    </LegalPage>
  );
}
