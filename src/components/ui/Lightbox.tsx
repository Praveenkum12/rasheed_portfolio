import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import type { Photo } from '@/data/types';

type Props = { photos: Photo[]; index: number | null; onChange: (i: number | null) => void };

export function Lightbox({ photos, index, onChange }: Props) {
  const img = useRef<HTMLImageElement>(null);
  const open = index !== null && !!photos[index];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onChange(null); }
      if (e.key === 'ArrowRight') onChange(((index ?? 0) + 1) % photos.length);
      if (e.key === 'ArrowLeft') onChange(((index ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, index, photos.length, onChange]);

  useEffect(() => {
    if (img.current) gsap.fromTo(img.current, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.7 });
  }, [index]);

  if (!open || index === null) return null;
  const p = photos[index];
  const go = (d: number) => (e: React.MouseEvent) => { e.stopPropagation(); onChange((index + d + photos.length) % photos.length); };

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => onChange(null)}>
      <img ref={img} src={p.src} alt={p.alt} onClick={(e) => e.stopPropagation()} />
      <button className="lightbox__btn lightbox__close" aria-label="Close viewer" onClick={() => onChange(null)}><X /></button>
      {photos.length > 1 && (
        <>
          <button className="lightbox__btn lightbox__prev" aria-label="Previous image" onClick={go(-1)}><ChevronLeft /></button>
          <button className="lightbox__btn lightbox__next" aria-label="Next image" onClick={go(1)}><ChevronRight /></button>
        </>
      )}
      <p className="lightbox__cap">{p.caption || p.alt} · {index + 1} / {photos.length}</p>
    </div>,
    document.body,
  );
}
