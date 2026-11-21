import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { lockScroll } from '@/lib/smoothScroll';

type Props = { open: boolean; onClose: () => void; label: string; children: ReactNode };

/** Side-sheet modal with GSAP enter/exit, focus trap, Esc to close and scroll lock. */
export function Modal({ open, onClose, label, children }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closing = useRef(false);
  const closeRef = useRef<() => void>(() => {});

  closeRef.current = () => {
    if (closing.current || !root.current) return;
    closing.current = true;
    if (prefersReducedMotion()) { onClose(); return; }
    const panel = root.current.querySelector('.modal__panel');
    const backdrop = root.current.querySelector('.modal__backdrop');
    gsap.timeline({ onComplete: onClose })
      .to(panel, { xPercent: 100, duration: 0.7, ease: 'inout' })
      .to(backdrop, { autoAlpha: 0, duration: 0.4 }, '-=0.35');
  };

  useEffect(() => {
    if (!open || !root.current) return;
    closing.current = false;
    lastFocus.current = document.activeElement as HTMLElement;
    lockScroll(true);
    const el = root.current;
    const panel = el.querySelector('.modal__panel') as HTMLElement;
    panel.scrollTop = 0;
    if (!prefersReducedMotion()) {
      gsap.timeline()
        .from(el.querySelector('.modal__backdrop'), { autoAlpha: 0, duration: 0.5, ease: 'power2.out' })
        .from(panel, { xPercent: 100, duration: 0.95, ease: 'expo' }, 0)
        .from(el.querySelectorAll('[data-modal-reveal]'), { y: 40, autoAlpha: 0, stagger: 0.06, duration: 0.9 }, 0.35);
    }
    (el.querySelector('.modal__close') as HTMLElement | null)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
      if (e.key !== 'Tab') return;
      const f = Array.from(el.querySelectorAll<HTMLElement>('button, a[href], select, [tabindex]:not([tabindex="-1"])'));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lockScroll(false);
      lastFocus.current?.focus();
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="modal" ref={root} role="dialog" aria-modal="true" aria-label={label}>
      <div className="modal__backdrop" onClick={() => closeRef.current()} />
      <div className="modal__panel" data-lenis-prevent>
        <button className="modal__close" onClick={() => closeRef.current()} aria-label="Close" data-cursor="hover"><X size={22} /></button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
