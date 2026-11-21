import { useEffect, useRef, useState } from 'react';

/** Becomes true once the element is near the viewport — used to defer heavy work. */
export function useInView<T extends Element>(rootMargin = '200px', once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting && once) io.disconnect();
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);
  return [ref, inView] as const;
}

/** Magnetic hover for buttons / icons. */
export function magnetic(el: HTMLElement, strength = 0.3) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  let raf = 0;
  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { el.style.transform = `translate3d(${x}px, ${y}px, 0)`; });
  };
  const leave = () => {
    el.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    el.style.transform = '';
    setTimeout(() => (el.style.transition = ''), 700);
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
  return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
}
