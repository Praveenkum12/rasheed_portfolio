import { useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Media } from '@/components/ui/Media';
import { expertise } from '@/data/skills';
import { expertiseArt } from '@/data/assets';

const tint = ['steel', 'red', 'green', 'navy'] as const;

export function Expertise() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    // Desktop: pinned showcase — scroll steps through the four disciplines
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.xs__panel');
      const titles = gsap.utils.toArray<HTMLElement>('.xs__title');
      gsap.set(panels.slice(1), { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(titles.slice(1), { opacity: 0.22 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.xs', start: 'top top+=90', end: `+=${(panels.length - 1) * 90}%`, pin: true, scrub: 0.8, anticipatePin: 1 },
      });
      tl.to('.xs__progress i', { scaleY: 1, duration: panels.length - 1 }, 0);
      panels.slice(1).forEach((p, i) => {
        const at = i + 0.15;
        tl.to(p, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'power2.inOut' }, at)
          .fromTo(p.querySelector('.media img, .media__icon'), { scale: 1.25 }, { scale: 1, duration: 0.9 }, at)
          .from(p.querySelectorAll('.xs__items li'), { y: 24, opacity: 0, stagger: 0.04, duration: 0.3 }, at + 0.35)
          .to(titles[i], { opacity: 0.22, duration: 0.3 }, at)
          .to(titles[i + 1], { opacity: 1, duration: 0.3 }, at);
      });
      tl.to({}, { duration: 0.3 });
    });
    // Mobile / reduced: simple reveals
    mm.add('(max-width: 1023px)', () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('.xs__panel').forEach((p) => {
        gsap.from(p, { y: 60, opacity: 0, duration: 1.1, scrollTrigger: { trigger: p, start: 'top 85%', once: true } });
      });
    });
    return () => mm.revert();
  });

  return (
    <section id="expertise" className="section section--navy" ref={root} aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeading index="03" label="HSE Expertise" id="expertise-title" title="Areas of expertise."
          lead="Four disciplines that shape every working day — from the shop floor to the management system." />

        <div className="xs">
          <div className="xs__list" aria-hidden="true">
            <div className="xs__progress"><i /></div>
            {expertise.map((e, i) => (
              <div className="xs__title" key={e.id}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{e.title}</h3>
              </div>
            ))}
          </div>

          <div className="xs__stage">
            {expertise.map((e, i) => {
              const a = expertiseArt[e.id];
              return (
                <article className="xs__panel" key={e.id}>
                  <Media src={a?.src} alt={a?.alt ?? e.title} icon={e.icon} tint={tint[i % 4]} illustrative={a?.illustrative} position={a?.position} />
                  <div className="xs__shade" />
                  <div className="xs__content">
                    <span className="xs__num">{String(i + 1).padStart(2, '0')} / 04</span>
                    <h3 className="xs__heading">{e.title}</h3>
                    <ul className="xs__items">{e.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
