import Footer from './Footer';

// Shared frame for /impressum and /datenschutz: back link, readable column, footer.
export default function LegalPage({ children }) {
  return (
    <div className="bg-void min-h-screen flex flex-col">
      <main className="flex-1 py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="text-neon text-sm hover:underline">← Zurück zur Startseite</a>
          <div className="legal-content mt-6">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
