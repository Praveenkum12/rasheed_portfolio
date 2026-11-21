import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, ImagePlus, ChevronDown } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Media, tintFor } from '@/components/ui/Media';
import { Modal } from '@/components/ui/Modal';
import { Lightbox } from '@/components/ui/Lightbox';
import { Button } from '@/components/ui/Button';
import { activities, activityCategories } from '@/data/activities';
import { activityArt, categoryArt } from '@/data/assets';
import type { Activity } from '@/data/types';

const INITIAL = 6;

/** Cover = real photo if provided, else illustrative category art. */
const coverOf = (a: Activity) => {
  if (a.coverImage) return { src: a.coverImage, illustrative: false, position: undefined };
  const art = activityArt[a.id] ?? categoryArt[a.category];
  return { src: art?.src, illustrative: true, position: art?.position };
};

export function Activities() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<Activity | null>(null);
  const [lb, setLb] = useState<number | null>(null);
  useReveal(root);

  const used = activityCategories.filter((c) => activities.some((a) => a.category === c));
  const filtered = filter === 'All' ? activities : activities.filter((a) => a.category === filter);
  const list = showAll || filter !== 'All' ? filtered : filtered.slice(0, INITIAL);

  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.from('.act-card', { y: 70, opacity: 0, stagger: 0.08, duration: 1.2, clearProps: 'transform,opacity', scrollTrigger: { trigger: grid.current, start: 'top 85%', once: true } });
  });

  // Smooth swap: current cards drift out, state changes, new cards rise in
  const swap = (apply: () => void) => {
    if (busy.current) return;
    if (prefersReducedMotion()) { apply(); return; }
    busy.current = true;
    gsap.to(grid.current!.querySelectorAll('.act-card'), {
      opacity: 0, y: 18, duration: 0.3, stagger: 0.02, ease: 'power2.in',
      onComplete: () => { apply(); },
    });
  };
  useLayoutEffect(() => {
    if (!busy.current) return;
    const cards = grid.current!.querySelectorAll('.act-card');
    gsap.fromTo(cards, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'expo', clearProps: 'transform,opacity', onComplete: () => { busy.current = false; } });
    ScrollTrigger.refresh();
  }, [filter, showAll]);

  return (
    <section id="activities" className="section" ref={root} aria-labelledby="act-title">
      <div className="container">
        <SectionHeading index="04" label="HSE Activities" id="act-title" title="On-site safety activities."
          lead="Campaigns, toolbox talks, inspections and training delivered in the field. Open any activity for details and photographs." />

        <div className="filters" role="tablist" aria-label="Filter activities" data-reveal="up">
          {['All', ...used].map((c) => (
            <button key={c} role="tab" aria-selected={filter === c} className={`chip ${filter === c ? 'is-active' : ''}`}
              onClick={() => c !== filter && swap(() => setFilter(c))}>
              {c}<sup>{c === 'All' ? activities.length : activities.filter((a) => a.category === c).length}</sup>
            </button>
          ))}
        </div>

        <div className="act-grid" ref={grid}>
          {list.map((a) => {
            const cover = coverOf(a);
            return (
              <button key={a.id} className="act-card" onClick={() => setOpen(a)} data-cursor="view" aria-haspopup="dialog">
                <Media src={cover.src} alt={a.title} icon={a.icon} tint={tintFor(a.category)} illustrative={cover.illustrative} position={cover.position} />
                <span className="act-card__cat" style={{ position: 'absolute' }}>{a.category}</span>
                <div className="act-card__body">
                  <h3 className="act-card__title">{a.title}</h3>
                  <p className="act-card__desc">{a.description}</p>
                  <div className="act-card__foot">
                    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Calendar size={13} /> {a.date || 'Kuwait'}</span>
                    <b>View details <ArrowRight size={14} /></b>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filter === 'All' && activities.length > INITIAL && (
          <div className="act-more">
            <Button onClick={() => swap(() => setShowAll((s) => !s))} icon="none">
              {showAll ? 'Show fewer' : `View all ${activities.length} activities`}
              <ChevronDown size={16} style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform .5s' }} />
            </Button>
          </div>
        )}
      </div>

      <Modal open={!!open} onClose={() => { setOpen(null); setLb(null); }} label={open?.title ?? 'Activity'}>
        {open && (() => {
          const cover = coverOf(open);
          return (
            <>
              <div className="modal__cover"><Media src={cover.src} alt={open.title} icon={open.icon} tint={tintFor(open.category)} illustrative={cover.illustrative} position={cover.position} eager /></div>
              <div className="modal__body">
                <div data-modal-reveal>
                  <span className="proj__cat">{open.category}</span>
                  <h2 className="case-title">{open.title}</h2>
                  {open.date && <p className="muted" style={{ marginTop: 12 }}>{open.date}</p>}
                </div>
                <div className="case-block" data-modal-reveal>
                  <h3>Overview</h3>
                  <p>{open.description}</p>
                  {open.details && <p style={{ marginTop: 12 }}>{open.details}</p>}
                </div>
                <div className="case-block" data-modal-reveal>
                  <h3>On-site photographs</h3>
                  {open.gallery.length ? (
                    <div className="gallery">
                      {open.gallery.map((p, i) => (
                        <button key={p.src} onClick={() => setLb(i)} data-cursor="view" aria-label={`Open photo: ${p.alt}`}><img src={p.src} alt={p.alt} loading="lazy" /></button>
                      ))}
                    </div>
                  ) : (
                    <p className="pending"><ImagePlus size={18} /> Approved site photographs will be added here.</p>
                  )}
                </div>
              </div>
              <Lightbox photos={open.gallery} index={lb} onChange={setLb} />
            </>
          );
        })()}
      </Modal>
    </section>
  );
}
