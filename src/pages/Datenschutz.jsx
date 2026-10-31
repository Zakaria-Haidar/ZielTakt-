import usePageMeta from '@/hooks/usePageMeta';
import LegalPage from '@/components/landing/LegalPage';
// The legal text lives in a plain HTML file so the e-recht24 output can be pasted in as-is.
import datenschutzHtml from '@/content/datenschutz.html?raw';

export default function Datenschutz() {
  usePageMeta('/datenschutz');

  return (
    <LegalPage>
      <div dangerouslySetInnerHTML={{ __html: datenschutzHtml }} />
    </LegalPage>
  );
}
