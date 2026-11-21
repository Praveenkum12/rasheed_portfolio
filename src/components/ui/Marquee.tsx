import { useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';

/** Infinite marquee whose speed & direction react to scroll velocity. */
export function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    const track = root.current!.querySelector('.marquee__track') as HTMLElement;
    const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
    let dir = 1;
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        const v = self.getVelocity();
        if (v !== 0) dir = v > 0 ? 1 : -1;
        const boost = Math.min(Math.abs(v) / 300, 5);
        gsap.timeline({ overwrite: true })
          .to(loop, { timeScale: dir * (1 + boost), duration: 0.3 })
          .to(loop, { timeScale: dir, duration: 1.2 });
      },
    });
    return () => st.kill();
  });

  const half = [...items, ...items];
  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee__track">
        {[...half, ...half].map((t, i) => (
          <span className="marquee__item" key={i}>
            {t}
            <i className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
