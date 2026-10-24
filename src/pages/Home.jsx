import { lazy, Suspense } from 'react';
import usePageMeta from '@/hooks/usePageMeta';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import ErrorBoundary from '../components/landing/ErrorBoundary';

// Below-the-fold sections: not needed for first paint, so they load in the
// background after the hero is already visible instead of blocking it.
const About = lazy(() => import('../components/landing/About'));
const Services = lazy(() => import('../components/landing/Services'));
const Preise = lazy(() => import('../components/landing/Preise'));
const Projekt = lazy(() => import('../components/landing/Projekt'));
const Ablauf = lazy(() => import('../components/landing/Ablauf'));
const PartnerProgramm = lazy(() => import('../components/landing/PartnerProgramm'));
const ServiceArea = lazy(() => import('../components/landing/ServiceArea'));
const FAQ = lazy(() => import('../components/landing/FAQ'));
const Contact = lazy(() => import('../components/landing/Contact'));
const Footer = lazy(() => import('../components/landing/Footer'));
const FloatingContact = lazy(() => import('../components/landing/FloatingContact'));

export default function Home() {
  usePageMeta({
    title: 'ZielTakt – Digitales Wachstumssystem für lokale Unternehmen in Konstanz',
    description:
    'ZielTakt aus Konstanz: ein digitales Wachstumssystem aus Website, Google-Sichtbarkeit, Online-Buchung und Automatisierung. Damit lokale Kunden Sie finden und einfach Kontakt aufnehmen – für Unternehmen in der DACH-Region.',
  });

  return (
    <div className="bg-void min-h-screen pb-16 md:pb-0 overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          {/* Each section gets its own boundary: if one section has a bug on
              some user's device, it disappears quietly instead of taking
              every other section (and the whole page) down with it. */}
          <ErrorBoundary><About /></ErrorBoundary>
          <ErrorBoundary><Services /></ErrorBoundary>
          <ErrorBoundary><Preise /></ErrorBoundary>
          <ErrorBoundary><Projekt /></ErrorBoundary>
          <ErrorBoundary><Ablauf /></ErrorBoundary>
          <ErrorBoundary><PartnerProgramm /></ErrorBoundary>
          <ErrorBoundary><ServiceArea /></ErrorBoundary>
          <ErrorBoundary><FAQ /></ErrorBoundary>
          <ErrorBoundary><Contact /></ErrorBoundary>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ErrorBoundary><Footer /></ErrorBoundary>
        <ErrorBoundary><FloatingContact /></ErrorBoundary>
      </Suspense>
    </div>
  );
}