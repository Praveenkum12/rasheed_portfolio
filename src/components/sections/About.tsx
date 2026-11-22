import { useRef } from 'react';
import { Check, GraduationCap, Award, Briefcase, MapPin } from 'lucide-react';
import { gsap, SplitText, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { Button, CvButton } from '@/components/ui/Button';
import { profile } from '@/data/profile';

export function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    // Statement: words light up as you read (scroll-scrubbed)
    const split = SplitText.create('.statement__text', { type: 'words', wordsClass: 'sw' });
    gsap.fromTo(split.words, { opacity: 0.14 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '.statement', start: 'top 75%', end: 'bottom 45%', scrub: true },
    });

    // Portrait: curtain wipe, de-zoom, corners, badge
    gsap.timeline({ scrollTrigger: { trigger: '.portrait__frame', start: 'top 80%', once: true } })
      .fromTo('.portrait__frame', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'inout' })
      .from('.portrait__frame img', { scale: 1.35, duration: 2, ease: 'expo' }, 0.1)
      .from('.portrait__corner', { scale: 0, stagger: 0.07, duration: 0.8, ease: 'back.out(2)' }, 0.7)
      .from('.portrait__badge', { x: 40, opacity: 0, duration: 1 }, 0.9);
    gsap.fromTo('.portrait__frame img', { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
    return () => split.revert();
  });

  const facts = [
    { icon: GraduationCap, k: 'Education', v: profile.education },
    { icon: Award, k: 'Certifications', v: profile.certificationsSummary },
    { icon: Briefcase, k: 'Designation', v: profile.designation },
    { icon: MapPin, k: 'Location', v: profile.location },
  ];

  return (
    <section id="about" className="section" ref={root} aria-labelledby="about-title">
      <div className="sheet-shade" aria-hidden="true" />
      <div className="container">
        <div className="statement">
          <p className="eyebrow"><span className="eyebrow__num">01</span> / About me</p>
          <p className="statement__text">{profile.aboutIntro}</p>
        </div>

        <div className="about">
          <div className="portrait">
            <div className="portrait__sticky">
              <div className="portrait__frame">
                <img src={profile.portrait} alt={profile.portraitAlt} width={928} height={928} loading="lazy" decoding="async" />
              </div>
              <i className="portrait__corner portrait__corner--tl" /><i className="portrait__corner portrait__corner--tr" />
              <i className="portrait__corner portrait__corner--bl" /><i className="portrait__corner portrait__corner--br" />
              <div className="portrait__badge">
                <Award size={28} strokeWidth={1.6} />
                <div><small>CERTIFIED</small><b>{profile.certificationsSummary}</b></div>
              </div>
            </div>
          </div>

          <div className="about__body">
            <h2 className="h-section" id="about-title" data-reveal="words" style={{ marginTop: 0 }}>{profile.aboutHeading}</h2>
            <p className="about__current" data-reveal="lines">{profile.aboutCurrent}</p>
            <div>
              <p className="label" style={{ color: 'var(--yellow)', marginBottom: 16 }}>My approach</p>
              <ul className="approach" data-reveal-stagger>
                {profile.approach.map((a) => <li key={a}><Check size={18} strokeWidth={2.6} />{a}</li>)}
              </ul>
            </div>
            <dl className="facts" data-reveal-stagger>
              {facts.map(({ icon: I, k, v }) => (
                <div className="fact" key={k}><I size={20} strokeWidth={1.7} /><div><dt>{k}</dt><dd>{v}</dd></div></div>
              ))}
            </dl>
            <div className="btn-row" data-reveal="up">
              <CvButton variant="primary" />
              <Button href="#contact">Get in touch</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
