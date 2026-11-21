import { useRef, useState } from 'react';
import { Eye } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Lightbox } from '@/components/ui/Lightbox';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/lib/icons';
import { certifications } from '@/data/certifications';

/**
 * Certificate cards. Upload scans to /public/images/certifications and set `image`
 * in certifications.ts — the card then shows the scan and a full-size viewer.
 */
export function Certifications() {
  const root = useRef<HTMLElement>(null);
  const [lb, setLb] = useState<number | null>(null);
  useReveal(root);

  const viewable = certifications.filter((c) => c.image).map((c) => ({ src: c.image, alt: `${c.fullName} certificate`, caption: c.fullName, verified: true }));

  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    const st = { trigger: '.cert-grid', start: 'top 82%', once: true };
    gsap.from('.cert', { y: 90, opacity: 0, stagger: 0.12, duration: 1.3, scrollTrigger: st, clearProps: 'transform,opacity' });
    gsap.from('.cert__seal', { scale: 0, rotate: -90, stagger: 0.12, duration: 1.2, ease: 'back.out(1.6)', delay: 0.35, scrollTrigger: st });
  });

  return (
    <section id="certifications" className="section section--light" ref={root} aria-labelledby="cert-title">
      <div className="container">
        <SectionHeading index="06" label="Certifications" id="cert-title" title="Qualified & certified."
          lead="Professional HSE certifications and engineering education. Certificate scans open full-size once uploaded." />
        <div className="cert-grid">
          {certifications.map((c) => {
            const idx = viewable.findIndex((v) => v.src === c.image);
            return (
              <article className="cert" key={c.id}>
                <div className="cert__img">
                  {c.image
                    ? <img src={c.image} alt={`${c.fullName} certificate`} loading="lazy" />
                    : (<><span className="cert__seal"><Icon name={c.icon} size={40} strokeWidth={1.6} /></span><span className="cert__ribbon">{c.name}</span></>)}
                </div>
                <div className="cert__body">
                  <span className="label" style={{ color: c.kind === 'education' ? '#4a5868' : 'var(--navy)' }}>{c.kind === 'education' ? 'Education' : 'Certification'}</span>
                  <h3 className="cert__name" style={{ marginTop: 6 }}>{c.name}</h3>
                  <p className="cert__full">{c.fullName}</p>
                  {c.issuer && <p className="cert__issuer">{c.issuer}</p>}
                  {(c.date || c.credentialId) && (
                    <div className="cert__meta">
                      {c.date && <span>Completed: <b>{c.date}</b></span>}
                      {c.credentialId && <span>Credential: <b>{c.credentialId}</b></span>}
                    </div>
                  )}
                  <div className="cert__foot">
                    {c.image
                      ? <Button variant="dark" size="sm" onClick={() => setLb(idx)} icon="none"><Eye size={15} /> View certificate</Button>
                      : <span className="tag tag--muted">Scan available on request</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <Lightbox photos={viewable} index={lb} onChange={setLb} />
    </section>
  );
}
