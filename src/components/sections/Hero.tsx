import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap, SplitText, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { scrollTo } from '@/lib/smoothScroll';
import { profile } from '@/data/profile';
import { art, triptych } from '@/data/assets';

/**
 * Cinematic hero — a pinned, scroll-scrubbed sequence.
 *   Frame 1  full-screen photograph, headline rises in (on load: "site lights power on")
 *   Scroll   headline lifts away; the photo shrinks from full-bleed into a framed card;
 *            two more cards swing in → Health · Safety · Environment triptych
 *   Release  page continues into About
 * Only transform / opacity / clip-path are animated, scrubbed with lag for a weighty feel.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const loaded = useStore('loaded');

  // Scroll sequence — built at mount so every later ScrollTrigger measures the pin correctly
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, (ctx) => {
      const desktop = ctx.conditions!.desktop;
      const card = desktop ? 'inset(19% 34% 19% 34% round 18px)' : 'inset(17% 7% 27% 7% round 18px)';
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: desktop ? '+=210%' : '+=150%', pin: true, scrub: 1.2, anticipatePin: 1 },
      });
      tl.to('.hero__inner', { yPercent: -35, opacity: 0, duration: 0.28, ease: 'power2.in' }, 0)
        .fromTo('.hero__frame', { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: card, duration: 0.5, ease: 'power2.inOut' }, 0.12)
        .fromTo('.hero__photo', { scale: 1.06 }, { scale: 1.32, duration: 0.7 }, 0.1)
        .to('.hero__frame .hero__grade', { opacity: 0.35, duration: 0.4 }, 0.25)
        .fromTo('.hero__label--c', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.14 }, 0.56)
        .fromTo('.hero__caption', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.16 }, 0.62);
      if (desktop) {
        tl.fromTo('.hero__side--l', { xPercent: -150, rotate: -9, opacity: 0 }, { xPercent: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power3.out' }, 0.42)
          .fromTo('.hero__side--r', { xPercent: 150, rotate: 9, opacity: 0 }, { xPercent: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power3.out' }, 0.46)
          .fromTo('.hero__side img', { scale: 1.3 }, { scale: 1, duration: 0.4 }, 0.42);
      }
      tl.to({}, { duration: 0.18 }); // hold the finished composition before release
    });
    return () => mm.revert();
  }, []);

  // Load entrance — runs as the loader lifts
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.set('.hero__inner', { visibility: 'hidden' });
    gsap.set('.hero__exposure', { opacity: 1 });
    if (!loaded) return;
    const split = SplitText.create('.hero__title .line > span', { type: 'words,chars', wordsClass: 'hword', charsClass: 'hchar' });
    gsap.timeline({ defaults: { ease: 'expo' } })
      .to('.hero__exposure', { keyframes: { opacity: [1, 0.55, 0.8, 0.25, 0] }, duration: 2.2, ease: 'power1.inOut' }, 0)
      .fromTo('.hero__photo-wrap', { scale: 1.2 }, { scale: 1, duration: 3.2 }, 0)
      .set('.hero__inner', { visibility: 'visible' }, 0.5)
      .fromTo('.hero__kicker', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 0.6)
      .fromTo(split.chars, { yPercent: 118 }, { yPercent: 0, stagger: 0.028, duration: 1.4 }, 0.7)
      .fromTo('.hero__rule', { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'inout' }, 1.2)
      .fromTo('.hero__actions > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1 }, 1.5);
    return () => split.revert();
  }, [loaded]);

  const [l1, l2] = profile.heroHeading;
  const [left, right] = triptych;
  return (
    <section id="home" className="hero" ref={root} aria-labelledby="hero-title">
      <div className="sheet-shade" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      {/* Side cards of the triptych */}
      <figure className="hero__side hero__side--l" aria-hidden="true">
        <img src={left.src} alt="" loading="eager" style={{ objectPosition: left.position }} />
        <figcaption><span>01</span>{left.label}</figcaption>
      </figure>
      <figure className="hero__side hero__side--r" aria-hidden="true">
        <img src={right.src} alt="" loading="eager" style={{ objectPosition: right.position }} />
        <figcaption><span>03</span>{right.label}</figcaption>
      </figure>

      {/* Main frame: full-bleed → centre card */}
      <div className="hero__frame" aria-hidden="true">
        <div className="hero__photo-wrap">
          <img className="hero__photo" src={art.heroBg.src} alt="" fetchPriority="high" style={{ objectPosition: art.heroBg.position }} />
        </div>
        <div className="hero__grade" />
        <div className="hero__exposure" />
      </div>
      <p className="hero__label--c" aria-hidden="true"><span>02</span>Safety</p>
      <p className="hero__caption" aria-hidden="true">Three disciplines. <em>One standard.</em></p>
      <div className="hero__grain" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="hero__kicker">
          <span>{profile.name}</span>
          <i aria-hidden="true" />
          <span>{profile.designation} · {profile.location}</span>
        </p>
        <h1 className="hero__title" id="hero-title">
          <span className="line"><span>{l1}</span></span>
          <span className="line"><span className="accent">{l2}</span></span>
        </h1>
        <div className="hero__rule" aria-hidden="true" />
        <div className="hero__actions">
          <Button variant="primary" href="#projects">Explore my work</Button>
          <button className="hero__scroll" onClick={() => scrollTo('#about')} aria-label="Scroll to About">
            <ArrowDown size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
