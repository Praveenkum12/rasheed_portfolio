import { useEffect } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Page-wide cinematic layer (runs once, after every section has built its own triggers).
 *
 *  1. Depth parallax — every framed image drifts inside its frame as it crosses the viewport.
 *     Animates `.media__inner` only (never the <img>, which owns a CSS hover transition).
 *  2. Sheet stacking — as each rounded section sheet slides up, the section beneath it
 *     sinks into shadow (opacity on `.sheet-shade`; no transforms, so pins stay intact).
 */
export function useCinematic() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // 1 — image depth parallax
      gsap.utils.toArray<HTMLElement>('.media__inner').forEach((el) => {
        if (el.closest('.xs__panel, .modal, .hero')) return;
        gsap.fromTo(el, { yPercent: -7, scale: 1.16 }, {
          yPercent: 7, scale: 1.16, ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // 2 — stacked sheets: shade the section being covered
      gsap.utils.toArray<HTMLElement>('main > section, main > .pin-spacer > section').forEach((sec) => {
        const shade = sec.querySelector<HTMLElement>(':scope > .sheet-shade');
        const host = sec.parentElement?.classList.contains('pin-spacer') ? sec.parentElement : sec;
        const next = host.nextElementSibling as HTMLElement | null;
        if (!shade || !next) return;
        gsap.fromTo(shade, { opacity: 0 }, {
          opacity: 0.7, ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);
}
