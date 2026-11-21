import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useStore } from '@/lib/store';

/** Two-part cursor (dot + lagging ring) with hover / "View" states. Desktop pointers only. */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const loaded = useStore('loaded');
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return;
    const el = root.current!;
    const dot = el.querySelector('.cursor__dot')!, ring = el.querySelector('.cursor__ring')!;
    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });
    gsap.set(el, { autoAlpha: 0 });
    let seen = false;
    const move = (e: PointerEvent) => {
      if (!seen) { seen = true; gsap.set([dot, ring], { x: e.clientX, y: e.clientY }); gsap.to(el, { autoAlpha: 1, duration: 0.4 }); }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest('[data-cursor], a, button') as HTMLElement | null;
      const mode = t?.dataset.cursor || (t ? 'hover' : '');
      el.classList.toggle('is-hover', mode === 'hover');
      el.classList.toggle('is-view', mode === 'view');
    };
    const hide = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    const show = () => gsap.to(el, { autoAlpha: 1, duration: 0.3 });
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerleave', hide);
    document.addEventListener('pointerenter', show);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('pointerenter', show);
    };
  }, []);
  return (
    <div className="cursor" ref={root} aria-hidden="true" style={{ visibility: loaded ? 'visible' : 'hidden' }}>
      <div className="cursor__dot" />
      <div className="cursor__ring"><span>View</span></div>
    </div>
  );
}
