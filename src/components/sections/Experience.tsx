import { useRef, useState } from 'react';
import { MapPin, Calendar, Plus } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { Lightbox } from '@/components/ui/Lightbox';
import { experience } from '@/data/experience';

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const [lb, setLb] = useState<{ id: string; i: number | null }>({ id: '', i: null });
  useReveal(root);

  useGsap(root, () => {
    if (prefersReducedMotion()) { gsap.set('.timeline__fill', { scaleY: 1 }); return; }
    // Timeline line draws with scroll
    gsap.to('.timeline__fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: 0.6 } });
    gsap.utils.toArray<HTMLElement>('.timeline__item').forEach((item) => {
      gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 80%', once: true } })
        .from(item.querySelector('.timeline__node'), { scale: 0, duration: 0.8, ease: 'back.out(2.5)' })
        .from(item.querySelector('.xp-card'), { y: 80, autoAlpha: 0, duration: 1.3 }, 0.1)
        .from(item.querySelectorAll('.resp li'), { x: -20, autoAlpha: 0, stagger: 0.04, duration: 0.8 }, 0.5);
    });
  });

  return (
    <section id="experience" className="section section--light" ref={root} aria-labelledby="xp-title">
      <div className="grid-lines" aria-hidden="true">{Array.from({ length: 7 }).map((_, i) => <span key={i} />)}</div>
      <div className="container xp">
        <aside className="xp__aside">
          <p className="eyebrow"><span className="eyebrow__num">02</span> / Experience</p>
          <h2 className="h-section" id="xp-title" data-reveal="words">Professional experience.</h2>
          <p className="lead" data-reveal="lines">Hands-on HSE operations in an industrial electrical services environment — from daily inspections to management-system readiness.</p>
        </aside>

        <div className="timeline">
          <div className="timeline__track"><div className="timeline__fill" /></div>
          {experience.map((x) => (
            <article key={x.id} className={`timeline__item ${x.current ? 'is-current' : ''}`}>
              <span className="timeline__node" aria-hidden="true" />
              <div className="xp-card">
                <div className="xp-card__head">
                  <div>
                    <h3 className="xp-card__company">{x.company}</h3>
                    <p className="xp-card__role">{x.designation}</p>
                    <div className="xp-card__meta">
                      {x.location && <span><MapPin size={15} /> {x.location}</span>}
                      {(x.startDate || x.endDate) && <span><Calendar size={15} /> {[x.startDate, x.endDate].filter(Boolean).join(' — ')}</span>}
                    </div>
                  </div>
                  {x.current && <span className="tag tag--green" style={{ alignSelf: 'flex-start' }}>Current</span>}
                </div>

                <h4>Responsibilities &amp; activities</h4>
                <ol className="resp">{x.responsibilities.map((r) => <li key={r}>{r}</li>)}</ol>

                {x.contributions.length > 0 && (<>
                  <h4>Key contributions</h4>
                  <ul className="resp">{x.contributions.map((c) => <li key={c}>{c}</li>)}</ul>
                </>)}

                {x.photos.length > 0 && (<>
                  <h4>Site photographs</h4>
                  <div className="xp-photos gallery">
                    {x.photos.map((p, i) => (
                      <button key={p.src} onClick={() => setLb({ id: x.id, i })} data-cursor="view" aria-label={`Open photo: ${p.alt}`}>
                        <img src={p.src} alt={p.alt} loading="lazy" />
                      </button>
                    ))}
                  </div>
                  <Lightbox photos={x.photos} index={lb.id === x.id ? lb.i : null} onChange={(i) => setLb({ id: x.id, i })} />
                </>)}
              </div>
            </article>
          ))}

          {import.meta.env.DEV && experience.length < 2 && (
            <div className="timeline__item">
              <span className="timeline__node" aria-hidden="true" />
              <div className="xp-empty">
                <Plus size={26} />
                <div><b>Previous employment</b>Add earlier roles in <code>src/data/experience.ts</code> — this slot is only visible in development.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
