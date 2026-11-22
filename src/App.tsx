import { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/smoothScroll';
import { useCinematic } from '@/animations/useCinematic';
import { ScrollTrigger } from '@/lib/gsap';
import { Preloader } from '@/components/layout/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/layout/Cursor';
import { Marquee } from '@/components/ui/Marquee';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Expertise } from '@/components/sections/Expertise';
import { Activities } from '@/components/sections/Activities';
import { Projects } from '@/components/sections/Projects';
import { Interlude } from '@/components/sections/Interlude';
import { Certifications } from '@/components/sections/Certifications';
import { Skills } from '@/components/sections/Skills';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';

export default function App() {
  useCinematic();
  useEffect(() => {
    initSmoothScroll();
    // Refresh triggers once fonts & images settle to avoid layout drift
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Preloader />
      <Cursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee items={['Health', 'Safety', 'Environment', 'NEBOSH', 'IOSH', 'ISO 45001', 'ISO 14001', 'Kuwait']} />
        <About />
        <Experience />
        <Expertise />
        <Activities />
        <Interlude />
        <Projects />
        <Certifications />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
