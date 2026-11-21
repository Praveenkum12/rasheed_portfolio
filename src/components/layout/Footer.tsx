import { ArrowUp } from 'lucide-react';
import { profile } from '@/data/profile';
import { contact } from '@/data/contact';
import { scrollTo } from '@/lib/smoothScroll';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__name">{profile.name}</p>
            <p className="muted" style={{ marginTop: 6 }}>{profile.title} · {contact.location}</p>
          </div>
          <div className="footer__links">
            {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('#about'); }}>About</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('#projects'); }}>Projects</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>Contact</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <button className="to-top" onClick={() => scrollTo(0)} data-cursor="hover">Back to top <ArrowUp size={14} /></button>
        </div>
      </div>
    </footer>
  );
}
