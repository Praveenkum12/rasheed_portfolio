import type { RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from './useGsap';

/**
 * Declarative scroll reveals for a section. Mark elements with:
 *   data-reveal="lines"   – masked line-by-line text rise (SplitText)
 *   data-reveal="words"   – masked word rise (for big headings)
 *   data-reveal="up"      – fade + rise
 *   data-reveal="fade"    – opacity only
 *   data-reveal="clip"    – image/curtain wipe (clip-path)
 *   data-reveal="rule"    – horizontal line draw
 *   data-reveal-stagger   – on a parent: children rise in sequence
 *   data-delay="0.2"      – optional delay (seconds)
 */
export function useReveal(scope: RefObject<HTMLElement>, deps: unknown[] = []) {
  useGsap(scope, () => {
    const root = scope.current!;
    if (prefersReducedMotion()) return;
    const q = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T & HTMLElement>(s));
    const st = (el: Element, start = 'top 86%') => ({ trigger: el, start, once: true });
    const delay = (el: HTMLElement) => parseFloat(el.dataset.delay || '0');

    q('[data-reveal="lines"], [data-reveal="words"]').forEach((el) => {
      const words = el.dataset.reveal === 'words';
      SplitText.create(el, {
        type: words ? 'lines,words' : 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit(self) {
          return gsap.from(words ? self.words : self.lines, {
            yPercent: 115,
            rotate: words ? 4 : 0,
            duration: words ? 1.3 : 1.15,
            stagger: words ? 0.06 : 0.09,
            delay: delay(el),
            scrollTrigger: st(el),
          });
        },
      });
    });

    q('[data-reveal="up"]').forEach((el) =>
      gsap.from(el, { y: 48, autoAlpha: 0, duration: 1.2, delay: delay(el), scrollTrigger: st(el) }));

    q('[data-reveal="fade"]').forEach((el) =>
      gsap.from(el, { autoAlpha: 0, duration: 1.4, delay: delay(el), ease: 'power2.out', scrollTrigger: st(el) }));

    q('[data-reveal="clip"]').forEach((el) =>
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'inout', delay: delay(el), scrollTrigger: st(el, 'top 80%') }));

    q('[data-reveal="rule"]').forEach((el) =>
      gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'inout', delay: delay(el), scrollTrigger: st(el) }));

    q('[data-reveal-stagger]').forEach((el) =>
      gsap.from(el.children, { y: 60, autoAlpha: 0, duration: 1.1, stagger: 0.08, delay: delay(el), scrollTrigger: st(el, 'top 85%') }));

    // Section eyebrows: draw rule then type in
    q('.eyebrow').forEach((el) => {
      const tl = gsap.timeline({ scrollTrigger: st(el, 'top 90%') });
      tl.from(el, { autoAlpha: 0, x: -20, duration: 1 });
    });

    ScrollTrigger.refresh();
  }, deps);
}
