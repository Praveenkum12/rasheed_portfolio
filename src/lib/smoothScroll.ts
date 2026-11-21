import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;
let locked = false;

export function initSmoothScroll() {
  if (prefersReducedMotion() || lenis) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  if (locked) lenis.stop();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollTo(target: string | number | HTMLElement, offset = 0) {
  if (lenis) lenis.scrollTo(target as never, { offset, duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (typeof el === 'number') window.scrollTo({ top: el, behavior: 'smooth' });
    else (el as HTMLElement | null)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export const lockScroll = (lock: boolean) => {
  locked = lock;
  if (lenis) lock ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = lock ? 'hidden' : '';
};
