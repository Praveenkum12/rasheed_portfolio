import { useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/lib/icons';
import { achievements } from '@/data/achievements';

export function Achievements() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.from('.ach', { autoAlpha: 0, y: 60, stagger: { each: 0.08, grid: 'auto' }, duration: 1.2, scrollTrigger: { trigger: '.ach-grid', start: 'top 82%', once: true } });
    // Count-up only for verified numeric metrics
    gsap.utils.toArray<HTMLElement>('.ach__metric[data-n]').forEach((el) => {
      const n = parseFloat(el.dataset.n!), o = { v: 0 };
      gsap.to(o, { v: n, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true }, onUpdate: () => { el.textContent = Math.round(o.v) + (el.dataset.suffix || ''); } });
    });
  });

  return (
    <section id="achievements" className="section section--yellow" ref={root} aria-labelledby="ach-title">
      <div className="container">
        <SectionHeading index="08" label="Achievements" id="ach-title" title="Initiatives that matter."
          lead="Safety work delivered across campaigns, training, inspections and audit readiness. Figures appear only when verified." />
        <div className="ach-grid">
          {achievements.map((a, i) => {
            const num = a.metric.match(/^(\d+(?:\.\d+)?)(.*)$/);
            return (
              <article className="ach" key={a.id}>
                <span className="ach__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="ach__icon"><Icon name={a.icon} size={30} strokeWidth={1.5} /></span>
                {a.metric && (
                  <p className="ach__metric" {...(num ? { 'data-n': num[1], 'data-suffix': num[2] } : {})}>
                    {a.metric}{a.metricLabel && <small style={{ fontSize: '0.9rem', marginLeft: 8, color: 'var(--muted)' }}>{a.metricLabel}</small>}
                  </p>
                )}
                <h3 className="ach__title">{a.title}</h3>
                <p>{a.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
