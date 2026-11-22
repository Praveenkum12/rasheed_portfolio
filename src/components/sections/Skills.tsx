import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { skills } from '@/data/skills';

export function Skills() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    // Giant outline word drifts behind the section
    gsap.fromTo('.bigword', { xPercent: 8 }, { xPercent: -28, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.utils.toArray<HTMLElement>('.skill-col').forEach((col, i) => {
      gsap.from(col.querySelector('h3'), { y: 40, opacity: 0, duration: 1.1, delay: i * 0.1, scrollTrigger: { trigger: col, start: 'top 85%', once: true } });
      // each list lights up item by item as it travels up the screen
      gsap.fromTo(col.querySelectorAll('li'), { opacity: 0.15, x: -12 }, { opacity: 1, x: 0, stagger: 0.12, ease: 'none',
        scrollTrigger: { trigger: col, start: 'top 80%', end: 'bottom 55%', scrub: true } });
    });
  });

  const cols = [
    { title: 'Technical', items: skills.technical },
    { title: 'Management', items: skills.management },
    { title: 'Software & tools', items: skills.software },
  ];

  return (
    <section id="skills" className="section" ref={root} aria-labelledby="skills-title">
      <div className="sheet-shade" aria-hidden="true" />
      <div className="bigword" aria-hidden="true">Competence</div>
      <div className="container">
        <SectionHeading index="07" label="Skills & Competencies" id="skills-title" title="Skills & competencies."
          lead="Practical field skills combined with the communication and coordination that make safety programmes stick." />
        <div className="skills">
          {cols.map((c) => (
            <div className="skill-col" key={c.title}>
              <h3>{c.title} <small>{String(c.items.length).padStart(2, '0')}</small></h3>
              {c.items.length ? (
                <ul className="skill-list">{c.items.map((s) => <li key={s}>{s}<ArrowRight size={16} /></li>)}</ul>
              ) : (
                <p className="pending" style={{ marginTop: 16 }}>Verified software and tools will be listed here.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
