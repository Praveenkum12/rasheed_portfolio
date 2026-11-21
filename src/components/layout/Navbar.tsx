import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { scrollTo, lockScroll } from '@/lib/smoothScroll';
import { useStore } from '@/lib/store';
import { profile } from '@/data/profile';
import { contact } from '@/data/contact';
import { CvButton } from '@/components/ui/Button';

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const loaded = useStore('loaded');
  const wasOpen = useRef(false);

  // Scrolled state, hide-on-scroll-down, progress bar, active section tracking
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    triggers.push(ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate(self) {
        const y = self.scroll();
        nav.current?.classList.toggle('is-scrolled', y > 40);
        nav.current?.classList.toggle('is-hidden', self.direction === 1 && y > window.innerHeight * 0.9 && !open);
        gsap.set('.progress', { scaleX: self.progress });
      },
    }));
    // map sections incl. ones without nav links to closest nav item
    const spy: [string, string][] = [['home', 'home'], ['about', 'about'], ['experience', 'experience'], ['expertise', 'expertise'], ['activities', 'expertise'], ['projects', 'projects'], ['certifications', 'certifications'], ['skills', 'certifications'], ['achievements', 'certifications'], ['contact', 'contact']];
    spy.forEach(([sec, link]) => {
      const el = document.getElementById(sec);
      if (el) triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 45%', end: 'bottom 45%', onToggle: (s) => s.isActive && setActive(link) }));
    });
    return () => triggers.forEach((t) => t.kill());
  }, [open]);

  // Entrance after preloader
  useEffect(() => {
    if (!loaded || prefersReducedMotion()) return;
    gsap.from(nav.current!.querySelectorAll('.brand, .nav__link, .nav__cta, .nav__burger'), { y: -30, autoAlpha: 0, stagger: 0.05, duration: 1, delay: 1.4 });
  }, [loaded]);

  // Mobile menu animation
  useEffect(() => {
    const el = menu.current!;
    if (open || wasOpen.current) lockScroll(open);
    wasOpen.current = open;
    const reduced = prefersReducedMotion();
    if (open) {
      gsap.timeline()
        .set(el, { visibility: 'visible' })
        .to(el, { clipPath: 'inset(0 0 0% 0)', duration: reduced ? 0 : 0.8, ease: 'inout' })
        .fromTo(el.querySelectorAll('.menu__link span'), { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 0.9 }, '-=0.35')
        .fromTo(el.querySelector('.menu__foot'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, '-=0.6');
    } else {
      gsap.timeline()
        .to(el, { clipPath: 'inset(0 0 100% 0)', duration: reduced ? 0 : 0.7, ease: 'inout' })
        .set(el, { visibility: 'hidden' });
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    setTimeout(() => scrollTo(`#${id}`), wasOpen ? 450 : 0);
  };

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <header className={`nav ${open ? 'is-open' : ''}`} ref={nav}>
        <div className="container nav__inner">
          <a href="#home" className="brand" onClick={go('home')} aria-label={`${profile.name} — home`} data-cursor="hover">
            <span className="brand__mark">{profile.initials}</span>
            <span className="brand__text"><b>HSE / PORTFOLIO</b><span>{profile.name}</span></span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={`nav__link ${active === n.id ? 'is-active' : ''}`} aria-current={active === n.id ? 'true' : undefined} data-cursor="hover">{n.label}</a>
            ))}
          </nav>
          <div className="nav__cta"><CvButton size="sm" /></div>
          <button className="nav__burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <span className="burger"><i /><i /><i /></span>
          </button>
        </div>
      </header>
      <div className="menu" id="mobile-menu" ref={menu} aria-hidden={!open}>
        <nav className="menu__links" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="menu__link" tabIndex={open ? 0 : -1}>
              <span><small>0{i + 1}</small> {n.label}</span>
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <CvButton variant="primary" />
          <span>{profile.title} · {contact.location}</span>
        </div>
      </div>
    </>
  );
}
