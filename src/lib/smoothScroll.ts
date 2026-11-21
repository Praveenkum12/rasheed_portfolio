import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;
let locked = false;
let jumping = false;

/**
 * Inertial smooth scrolling. `lerp` (not duration) gives the heavy, cinematic
 * glide used by high-end sites: input is eased toward its target every frame.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion() || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.85, touchMultiplier: 1.4, smoothWheel: true });
  if (locked) lenis.stop();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

const resolve = (target: string | number | HTMLElement) => {
  if (typeof target === 'number') return target;
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
};

/** Full-screen wipe element, created once on demand. */
function wipe() {
  let el = document.querySelector<HTMLDivElement>('.wipe');
  if (!el) {
    el = document.createElement('div');
    el.className = 'wipe';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<i></i><b></b>';
    document.body.appendChild(el);
  }
  return el;
}

/**
 * Navigation scroll.
 *  • short hops (< ~1.6 screens): eased glide
 *  • long jumps: cinematic wipe → instant jump → reveal (never a blurred high-speed scroll)
 */
export function scrollTo(target: string | number | HTMLElement, offset = 0) {
  const y = resolve(target) + offset;
  const dist = Math.abs(y - window.scrollY);
  const reduced = prefersReducedMotion();

  if (reduced || !lenis) { window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' }); return; }
  if (dist < innerHeight * 1.6) {
    lenis.scrollTo(y, { duration: 1.1 + dist / innerHeight * 0.25, easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
    return;
  }
  if (jumping) return;
  jumping = true;
  const el = wipe();
  const [panel, bar] = [el.querySelector('i')!, el.querySelector('b')!];
  gsap.timeline({ onComplete: () => { jumping = false; } })
    .set(el, { visibility: 'visible' })
    .set([panel, bar], { transformOrigin: '50% 100%' })
    .fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: 0.45, ease: 'inout' })
    .fromTo(panel, { scaleY: 0 }, { scaleY: 1, duration: 0.55, ease: 'inout' }, 0.08)
    .add(() => { lenis!.scrollTo(y, { immediate: true, force: true }); ScrollTrigger.update(); })
    .set([panel, bar], { transformOrigin: '50% 0%' }, '+=0.12')
    .to(panel, { scaleY: 0, duration: 0.6, ease: 'inout' })
    .to(bar, { scaleY: 0, duration: 0.5, ease: 'inout' }, '<0.1')
    .set(el, { visibility: 'hidden' });
}

export const lockScroll = (lock: boolean) => {
  locked = lock;
  if (lenis) lock ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = lock ? 'hidden' : '';
};
