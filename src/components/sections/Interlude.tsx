import { useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { interludeArt } from '@/data/assets';

/**
 * Cinematic interlude (pinned): a close-up photograph expands from a small card to
 * full-bleed while a three-beat line builds — the reverse of the hero's move.
 */
export function Interlude() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    const mobile = matchMedia('(max-width: 899px)').matches;
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root.current, start: 'top top', end: mobile ? '+=130%' : '+=170%', pin: true, scrub: 1.2, anticipatePin: 1 },
    });
    tl.fromTo('.interlude__frame', { clipPath: mobile ? 'inset(30% 12% 30% 12% round 18px)' : 'inset(26% 36% 26% 36% round 18px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.55, ease: 'power2.inOut' }, 0)
      .fromTo('.interlude__inner', { scale: 1.35 }, { scale: 1.05, duration: 0.8 }, 0)
      .fromTo('.interlude__grade', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.3);
    gsap.utils.toArray<HTMLElement>('.interlude__line').forEach((line, i) => {
      tl.fromTo(line, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.14, ease: 'power3.out' }, 0.45 + i * 0.13);
    });
    tl.fromTo('.interlude__meta', { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.85).to({}, { duration: 0.15 });
  });

  return (
    <section className="interlude" ref={root} aria-label="Safety principle">
      <div className="interlude__frame" aria-hidden="true">
        <div className="interlude__inner"><img src={interludeArt.src} alt="" loading="lazy" style={{ objectPosition: interludeArt.position }} /></div>
        <div className="interlude__grade" />
      </div>
      <div className="container interlude__text">
        <p className="interlude__line-wrap"><span className="interlude__line">Every task.</span></p>
        <p className="interlude__line-wrap"><span className="interlude__line">Every shift.</span></p>
        <p className="interlude__line-wrap"><span className="interlude__line accent">Everyone home safe.</span></p>
        <p className="interlude__meta">HSE · Kuwait <span>— Illustrative image</span></p>
      </div>
    </section>
  );
}
