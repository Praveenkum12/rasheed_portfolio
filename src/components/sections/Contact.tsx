import { useRef } from 'react';
import { Mail, MessageCircle, Linkedin, MapPin, ArrowUpRight, FileText } from 'lucide-react';
import { gsap, SplitText, prefersReducedMotion } from '@/lib/gsap';
import { useGsap } from '@/animations/useGsap';
import { useReveal } from '@/animations/useReveal';
import { CvButton } from '@/components/ui/Button';
import { contact } from '@/data/contact';
import { profile } from '@/data/profile';
import { art } from '@/data/assets';

export function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  useGsap(root, () => {
    if (prefersReducedMotion()) return;
    const split = SplitText.create('.contact__heading .ln', { type: 'chars', mask: 'chars' });
    gsap.from(split.chars, { yPercent: 120, stagger: 0.025, duration: 1.3, scrollTrigger: { trigger: '.contact__heading', start: 'top 80%', once: true } });
    // Headline lines glide in from opposite sides; the photo settles as the section arrives
    const st = { trigger: root.current, start: 'top bottom', end: 'top 20%', scrub: 1 };
    gsap.fromTo('.contact__heading .ln:nth-child(1)', { xPercent: -10 }, { xPercent: 0, ease: 'none', scrollTrigger: st });
    gsap.fromTo('.contact__heading .ln:nth-child(2)', { xPercent: 10 }, { xPercent: 0, ease: 'none', scrollTrigger: st });
    gsap.fromTo('.contact__bg', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    gsap.fromTo('.contact__glow', { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: true } });
    return () => split.revert();
  });

  const items = [
    contact.email && { icon: Mail, k: 'Email', v: contact.email, href: `mailto:${contact.email}` },
    contact.whatsapp && { icon: MessageCircle, k: 'WhatsApp', v: contact.phoneDisplay || `+${contact.whatsapp}`, href: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}` },
    contact.linkedin && { icon: Linkedin, k: 'LinkedIn', v: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: contact.linkedin },
    { icon: MapPin, k: 'Location', v: contact.location, href: '' },
  ].filter(Boolean) as { icon: typeof Mail; k: string; v: string; href: string }[];

  const missing = !contact.email || !contact.whatsapp || !contact.linkedin;

  return (
    <section id="contact" className="section contact" ref={root} aria-labelledby="contact-title">
      <div className="sheet-shade" aria-hidden="true" />
      <img className="contact__bg" src={art.contactBg.src} alt="" aria-hidden="true" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      <div className="contact__glow" aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <p className="eyebrow"><span className="eyebrow__num">09</span> / Contact</p>
        <h2 className="contact__heading" id="contact-title">
          <span className="ln" style={{ display: 'block' }}>Let&rsquo;s build</span>
          <span className="ln accent" style={{ display: 'block' }}>safer workplaces.</span>
        </h2>
        <div className="contact__grid">
          <div>
            <p className="lead" data-reveal="lines">For professional opportunities, HSE collaboration and industry connections, feel free to contact me.</p>
            <div className="btn-row" style={{ marginTop: 32 }} data-reveal="up">
              <CvButton variant="primary" />
              {contact.email && <a className="btn" href={`mailto:${contact.email}?subject=${encodeURIComponent('Opportunity for ' + profile.name)}`} data-cursor="hover">Send an email <ArrowUpRight size={16} /></a>}
            </div>
          </div>
          <div>
            <div className="contact-list" data-reveal-stagger>
              {items.map(({ icon: I, k, v, href }) => {
                const inner = (<>
                  <span className="contact-item__l"><span className="contact-item__ic"><I size={20} /></span><span><small>{k}</small><b>{v}</b></span></span>
                  {href && <ArrowUpRight size={22} />}
                </>);
                return href
                  ? <a key={k} className="contact-item" href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} data-cursor="hover">{inner}</a>
                  : <div key={k} className="contact-item">{inner}</div>;
              })}
            </div>
            {import.meta.env.DEV && missing && (
              <p className="dev-note"><FileText size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Dev note: add your email, WhatsApp and LinkedIn in <code>src/data/contact.ts</code> — empty fields are hidden in production.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
