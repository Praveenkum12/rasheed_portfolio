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
    gsap.utils.toArray<HTMLElement>('.skill-col').forEach((col, i) => {
      gsap.timeline({ scrollTrigger: { trigger: col, start: 'top 82%', once: true }, delay: i * 0.12 })
        .from(col.querySelector('h3'), { y: 30, autoAlpha: 0, duration: 1 })
        .from(col.querySelectorAll('li'), { yPercent: 100, autoAlpha: 0, stagger: 0.05, duration: 0.9 }, 0.15);
    });
  });

  const cols = [
    { title: 'Technical', items: skills.technical },
    { title: 'Management', items: skills.management },
    { title: 'Software & tools', items: skills.software },
  ];

  return (
    <section id="skills" className="section" ref={root} aria-labelledby="skills-title">
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
