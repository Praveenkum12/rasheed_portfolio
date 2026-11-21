import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useStore } from '@/lib/store';
import { Button, CvButton } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { art } from '@/data/assets';

/**
 * Editorial hero — three depth planes:
 *   back   : giant outlined "SAFETY" word + light (moves slowest, slides sideways on scroll)
 *   middle : real portrait cut-out with warm rim light (medium parallax)
 *   front  : headline, intro, CTAs, meta (moves fastest, fades)
 * No pinning: the section scrolls naturally, so downstream ScrollTriggers stay accurate.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const loaded = useStore('loaded');
  const [bgOk, setBgOk] = useState(true);

  // Pointer depth parallax (desktop only)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return;
    const layers = Array.from(root.current!.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
      d: parseFloat(el.dataset.depth!),
      x: gsap.quickTo(el, 'x', { duration: 1.6, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1.6, ease: 'power3' }),
    }));
    const move = (e: PointerEvent) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      layers.forEach((l) => { l.x(nx * 36 * l.d); l.y(ny * 22 * l.d); });
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  // Scroll parallax — created immediately so page measurements are stable from the start
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero__word', { xPercent: -18, ease: 'none', scrollTrigger: st });
    gsap.to('.hero__portrait', { yPercent: 12, scale: 1.04, ease: 'none', scrollTrigger: st });
    gsap.to('.hero__front', { yPercent: -22, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '75% top' } });
    gsap.to('.hero__glow', { opacity: 0.4, scale: 1.2, ease: 'none', scrollTrigger: st });
  }, []);

  // Entrance — starts as the loader curtain lifts
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.set('.hero__front, .hero__portrait-wrap, .hero__word-wrap', { visibility: 'hidden' });
    if (!loaded) return;
    const split = SplitText.create('.hero__title .line > span', { type: 'chars', charsClass: 'hchar' });
    gsap.timeline({ defaults: { ease: 'expo' } })
      .set('.hero__front, .hero__portrait-wrap, .hero__word-wrap', { visibility: 'visible' })
      .fromTo('.hero__glow', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2.4 }, 0)
      .fromTo('.hero__word-wrap', { opacity: 0, xPercent: 6 }, { opacity: 1, xPercent: 0, duration: 2.2 }, 0.1)
      .fromTo('.hero__portrait-wrap', { clipPath: 'inset(100% 0 0 0)', yPercent: 6 }, { clipPath: 'inset(0% 0 0 0)', yPercent: 0, duration: 1.8, ease: 'inout' }, 0.2)
      .fromTo('.hero .eyebrow', { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 1 }, 0.6)
      .fromTo(split.chars, { yPercent: 115, rotate: 7 }, { yPercent: 0, rotate: 0, stagger: 0.022, duration: 1.3 }, 0.7)
      .fromTo('.hero__reveal', { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.09, duration: 1.1 }, 1.25);
    return () => split.revert();
  }, [loaded]);

  const [l1, l2] = profile.heroHeading;
  return (
    <section id="home" className="hero" ref={root} aria-labelledby="hero-title">
      {/* BACK plane */}
      <div className="hero__back" aria-hidden="true">
        {bgOk && <img className="hero__photo" src={art.heroBg.src} alt="" onError={() => setBgOk(false)} />}
        <div className="hero__glow" />
        <div className="hero__cols">{Array.from({ length: 6 }).map((_, i) => <i key={i} />)}</div>
        <div className="hero__word-wrap" data-depth="0.35"><span className="hero__word">Safety</span></div>
      </div>

      {/* MIDDLE plane — real photo */}
      <div className="hero__portrait-wrap" data-depth="0.7" aria-hidden="true">
        <img className="hero__portrait" src={art.heroFg.src} alt="" width={928} height={928} fetchPriority="high" />
      </div>
      <div className="hero__fade" aria-hidden="true" />

      {/* FRONT plane */}
      <div className="hero__front">
        <div className="container hero__grid">
          <div className="hero__main">
            <p className="eyebrow">{profile.heroLabel}</p>
            <h1 className="h-display hero__title" id="hero-title">
              <span className="line"><span>{l1}</span></span>
              <span className="line"><span className="accent">{l2}</span></span>
            </h1>
            <p className="lead hero__support hero__reveal">{profile.heroSupport}</p>
            <div className="btn-row hero__ctas hero__reveal">
              <Button variant="primary" href="#projects">Explore my work</Button>
              <CvButton label="Download my CV" />
            </div>
          </div>

          <aside className="hero__side hero__reveal">
            <p className="hero__name">{profile.name}</p>
            <p className="hero__role">{profile.designation} · {profile.location}</p>
            <dl className="hero__meta">
              <div><dt>Current</dt><dd>Gulf Paramount Electrical Services Co. S.P.C.</dd></div>
              <div><dt>Certified</dt><dd>{profile.certificationsSummary}</dd></div>
            </dl>
          </aside>
        </div>
        <div className="container hero__foot hero__reveal">
          <span className="scroll-cue"><span className="scroll-cue__mouse" /> Scroll to explore</span>
          <span className="hero__coords">29.3759° N · 47.9774° E — Kuwait</span>
        </div>
      </div>
      <div className="hero__grain" aria-hidden="true" />
    </section>
  );
}
