import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { store } from '@/lib/store';
import { lockScroll } from '@/lib/smoothScroll';
import { profile } from '@/data/profile';
import { criticalImages } from '@/data/assets';

const STEPS = ['Initializing', 'Loading assets', 'Preparing experience', 'Ready'];

const loadImage = (src: string) => new Promise<void>((res) => {
  const img = new Image();
  img.onload = img.onerror = () => res();
  img.src = src;
  if (img.complete) res();
});

/**
 * Honest loader: progress = fonts + critical images actually loaded (never a fake timeline).
 * Always starts the visit at the top of the page and locks scrolling until the reveal.
 * All markup is styled in globals.css (.pl*) and visible from the very first paint.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    lockScroll(true);

    const el = root.current!;
    const reduced = prefersReducedMotion();
    const total = criticalImages.length + 1;
    let ready = 0, finished = false;
    const p = { v: 0 };

    const render = () => {
      el.style.setProperty('--p', String(p.v / 100));
      if (counter.current) counter.current.textContent = String(Math.round(p.v)).padStart(3, '0');
    };
    const advance = () => {
      ready = Math.min(total, ready + 1);
      setStep(Math.min(STEPS.length - 2, Math.floor((ready / total) * (STEPS.length - 1))));
      gsap.to(p, { v: (ready / total) * 100, duration: reduced ? 0 : 0.7, ease: 'power2.out', overwrite: true, onUpdate: render,
        onComplete: () => { if (ready >= total) exit(); } });
    };

    // Elements are visible by default; the intro only adds polish.
    const intro = reduced ? null : gsap.timeline({ defaults: { ease: 'expo' } })
      .fromTo('.pl__mark', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 })
      .fromTo('.pl__line > *', { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 0.9 }, 0.15);

    const exit = () => {
      if (finished) return;
      finished = true;
      setStep(STEPS.length - 1);
      const finish = () => {
        window.scrollTo(0, 0);
        lockScroll(false);
        store.set({ loaded: true });
        ScrollTrigger.refresh();
      };
      if (reduced) { finish(); setDone(true); return; }
      intro?.progress(1);
      gsap.timeline({ delay: 0.35, onComplete: () => setDone(true) })
        .to('.pl__line > *', { yPercent: -110, stagger: 0.05, duration: 0.55, ease: 'power3.in' })
        .to('.pl__mark', { scale: 1.1, opacity: 0, duration: 0.55, ease: 'power3.in' }, 0)
        .to('.pl__foot, .pl__bar', { opacity: 0, duration: 0.35 }, 0)
        .add(finish, 0.5)
        .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'inout' }, 0.45);
    };

    document.fonts.ready.then(advance);
    criticalImages.forEach((src) => loadImage(src).then(advance));
    const cap = setTimeout(() => { ready = total - 1; advance(); }, 6000);
    return () => { clearTimeout(cap); intro?.kill(); };
  }, []);

  if (done) return null;
  return (
    <div className="pl" ref={root} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="pl__center">
        <div className="pl__mark" aria-hidden="true">
          <span className="pl__mark-txt">{profile.initials}</span>
          <span className="pl__mark-fill"><span className="pl__mark-txt">{profile.initials}</span></span>
        </div>
        <div className="pl__line"><span>{profile.name}</span></div>
        <div className="pl__line pl__line--muted"><span>{profile.title} — {profile.location}</span></div>
      </div>
      <div className="pl__foot container">
        <span>{STEPS[step]}</span>
        <span className="pl__count"><span ref={counter}>000</span>%</span>
      </div>
      <div className="pl__bar" />
    </div>
  );
}
