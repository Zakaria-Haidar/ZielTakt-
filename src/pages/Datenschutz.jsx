import usePageMeta from '@/hooks/usePageMeta';
import LegalPage from '@/components/landing/LegalPage';
// The legal text lives in a plain HTML file so the e-recht24 output can be pasted in as-is.
import datenschutzHtml from '@/content/datenschutz.html?raw';

export default function Datenschutz() {
  usePageMeta({
    title: 'Datenschutzerklärung – ZielTakt',
    description: 'Datenschutzerklärung von ZielTakt: welche Daten wir erheben, wofür und welche Rechte Sie haben.',
    path: '/datenschutz',
  });

  return (
    <LegalPage>
      <div dangerouslySetInnerHTML={{ __html: datenschutzHtml }} />
    </LegalPage>
  );
}
