import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Check, FileText, Clock } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Media, tintFor } from '@/components/ui/Media';
import { Modal } from '@/components/ui/Modal';
import { Lightbox } from '@/components/ui/Lightbox';
import { projects, projectCategories } from '@/data/projects';
import { projectArt, categoryArt } from '@/data/assets';

const artOf = (p: Project) => p.coverImage
  ? { src: p.coverImage, illustrative: false, position: undefined }
  : { src: (projectArt[p.id] ?? categoryArt[p.category])?.src, illustrative: true, position: (projectArt[p.id] ?? categoryArt[p.category])?.position };
import type { Project } from '@/data/types';

function Pending({ children = 'To be added once verified.' }: { children?: string }) {
  return <p className="pending"><Clock size={16} /> {children}</p>;
}

function CaseStudy({ p }: { p: Project }) {
  const [lb, setLb] = useState<number | null>(null);
  const list = (items: string[]) => items.length
    ? <ul>{items.map((t) => <li key={t}><Check size={15} strokeWidth={2.6} />{t}</li>)}</ul>
    : <Pending />;
  return (
    <>
      <div className="modal__cover"><Media {...artOf(p)} alt={p.title} icon={p.icon} tint={tintFor(p.category)} eager /></div>
      <div className="modal__body">
        <div data-modal-reveal>
          <span className="proj__cat">{p.category}</span>
          <h2 className="case-title">{p.title}</h2>
          <p className="lead" style={{ marginTop: 16, maxWidth: 640 }}>{p.description}</p>
        </div>
        <div className="case-grid">
          <div className="case-block" data-modal-reveal><h3>Background</h3>{p.background ? <p>{p.background}</p> : <Pending />}</div>
          <div className="case-block" data-modal-reveal><h3>Objective</h3>{p.objective ? <p>{p.objective}</p> : <Pending />}</div>
          <div className="case-block" data-modal-reveal><h3>My responsibilities</h3>{list(p.responsibilities)}</div>
          <div className="case-block" data-modal-reveal><h3>Activities performed</h3>{list(p.activities)}</div>
        </div>
        <div className="case-block" data-modal-reveal>
          <h3>Photographs</h3>
          {p.gallery.length ? (
            <div className="gallery">
              {p.gallery.map((ph, i) => (
                <button key={ph.src} onClick={() => setLb(i)} data-cursor="view" aria-label={`Open photo: ${ph.alt}`}><img src={ph.src} alt={ph.alt} loading="lazy" /></button>
              ))}
            </div>
          ) : <Pending>Approved photographs will be added here.</Pending>}
        </div>
        {p.documents.length > 0 && (
          <div className="case-block" data-modal-reveal>
            <h3>Supporting documents</h3>
            <ul>{p.documents.map((d) => <li key={d.href}><FileText size={15} /><a href={d.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{d.label}</a></li>)}</ul>
          </div>
        )}
        <div className="case-grid">
          <div className="case-block" data-modal-reveal><h3>Results</h3>{p.outcome ? <p>{p.outcome}</p> : <Pending>Results will be published once verified — no invented figures.</Pending>}</div>
          <div className="case-block" data-modal-reveal><h3>Lessons learned</h3>{p.lessons ? <p>{p.lessons}</p> : <Pending />}</div>
        </div>
      </div>
      <Lightbox photos={p.gallery} index={lb} onChange={setLb} />
    </>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState<'featured' | 'az' | 'recent'>('featured');
  const [open, setOpen] = useState<Project | null>(null);
  useReveal(root);

  const list = useMemo(() => {
    const l = filter === 'All' ? [...projects] : projects.filter((p) => p.category === filter);
    if (sort === 'az') l.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'featured') l.sort((a, b) => Number(b.featured) - Number(a.featured));
    if (sort === 'recent') l.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return l;
  }, [filter, sort]);

  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>('.proj').forEach((card, i) => {
      gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
        .fromTo(card, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'inout', delay: (i % 2) * 0.12, clearProps: 'clipPath' })
        .from(card.querySelector('.media'), { scale: 1.3, duration: 1.8, ease: 'expo', clearProps: 'transform' }, '<')
        .from(card.querySelectorAll('.proj__overlay > *'), { y: 30, opacity: 0, stagger: 0.08, duration: 1 }, '-=1.1');
    });
  });

  // Smooth swap for filter / sort: fade the grid out, update, rise back in
  const change = (fn: () => void) => {
    if (busy.current) return;
    if (prefersReducedMotion()) { fn(); return; }
    busy.current = true;
    gsap.to(grid.current!.children, { opacity: 0, y: 18, duration: 0.3, stagger: 0.02, ease: 'power2.in', onComplete: fn });
  };
  useLayoutEffect(() => {
    if (!busy.current) return;
    gsap.fromTo(grid.current!.children, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.06, ease: 'expo', onComplete: () => { busy.current = false; } });
    ScrollTrigger.refresh();
  }, [filter, sort]);

  return (
    <section id="projects" className="section section--light" ref={root} aria-labelledby="proj-title">
      <div className="sheet-shade" aria-hidden="true" />
      <div className="container">
        <SectionHeading index="05" label="Project Portfolio" id="proj-title" title="Proof of work."
          lead="Selected HSE programmes presented as case studies — background, responsibilities, activities and verified results." />

        <div className="toolbar" data-reveal="up">
          <div className="filters" role="tablist" aria-label="Filter projects">
            {['All', ...projectCategories].map((c) => (
              <button key={c} role="tab" aria-selected={filter === c} className={`chip ${filter === c ? 'is-active' : ''}`} onClick={() => c !== filter && change(() => setFilter(c))}>{c}</button>
            ))}
          </div>
          <label className="sort">Sort
            <select value={sort} onChange={(e) => { const v = e.target.value as typeof sort; change(() => setSort(v)); }}>
              <option value="featured">Featured</option>
              <option value="az">A – Z</option>
              <option value="recent">Most recent</option>
            </select>
          </label>
        </div>

        <div className="proj-grid" ref={grid}>
          {list.map((p) => (
            <button key={p.id} data-flip-id={p.id} className={`proj proj--${p.size ?? 'md'}`} onClick={() => setOpen(p)} data-cursor="view" aria-haspopup="dialog" aria-label={`Open case study: ${p.title}`}>
              <Media {...artOf(p)} alt={p.title} icon={p.icon} tint={tintFor(p.category)} />
              {p.featured && <span className="tag tag--yellow proj__featured" style={{ background: 'rgba(8,13,19,0.7)' }}>Featured</span>}
              <span className="proj__open" aria-hidden="true"><ArrowUpRight size={22} /></span>
              <div className="proj__overlay">
                <span className="proj__cat">{p.category}</span>
                <h3 className="proj__title">{p.title}</h3>
                <p className="proj__desc">{p.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} label={open ? `Case study: ${open.title}` : 'Case study'}>
        {open && <CaseStudy p={open} />}
      </Modal>
    </section>
  );
}
