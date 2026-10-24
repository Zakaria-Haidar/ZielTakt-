// Everything below the hero, bundled into a single lazy chunk instead of
// many small ones — fewer network round-trips on slow/high-latency
// connections, while still keeping it out of the critical first-paint bundle.
import About from '../components/landing/About';
import Services from '../components/landing/Services';
import Preise from '../components/landing/Preise';
import Projekt from '../components/landing/Projekt';
import Ablauf from '../components/landing/Ablauf';
import PartnerProgramm from '../components/landing/PartnerProgramm';
import ServiceArea from '../components/landing/ServiceArea';
import FAQ from '../components/landing/FAQ';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';
import FloatingContact from '../components/landing/FloatingContact';

export default function BelowFold() {
  return (
    <>
      <About />
      <Services />
      <Preise />
      <Projekt />
      <Ablauf />
      <PartnerProgramm />
      <ServiceArea />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingContact />
    </>
  );
}
