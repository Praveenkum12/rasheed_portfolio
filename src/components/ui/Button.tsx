import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { magnetic } from '@/animations/useScrollAnimation';
import { scrollTo } from '@/lib/smoothScroll';
import { profile } from '@/data/profile';

type Props = {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  size?: 'md' | 'sm';
  href?: string;
  onClick?: () => void;
  icon?: 'arrow' | 'external' | 'download' | 'none';
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function Button({ children, variant = 'ghost', size = 'md', href, onClick, icon = 'arrow', external, download, className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  useEffect(() => (ref.current ? magnetic(ref.current, 0.22) : undefined), []);
  const cls = `btn ${variant === 'primary' ? 'btn--primary' : variant === 'dark' ? 'btn--dark' : ''} ${size === 'sm' ? 'btn--sm' : ''} ${className}`;
  const Ico = icon === 'external' ? ArrowUpRight : icon === 'download' ? Download : ArrowRight;
  const inner = (<>{children}{icon !== 'none' && <Ico size={16} strokeWidth={2.4} />}</>);

  if (href) {
    const isHash = href.startsWith('#');
    return (
      <a ref={ref} className={cls} href={href} data-cursor="hover"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: '' } : {})}
        onClick={isHash ? (e) => { e.preventDefault(); scrollTo(href, 0); } : undefined}>
        {inner}
      </a>
    );
  }
  return <button ref={ref} type="button" className={cls} onClick={onClick} data-cursor="hover">{inner}</button>;
}

/** CV button: downloads the PDF when profile.cvUrl is set, otherwise routes to contact. */
export function CvButton({ variant = 'ghost', size = 'md', label }: { variant?: Props['variant']; size?: Props['size']; label?: string }) {
  return profile.cvUrl
    ? <Button variant={variant} size={size} href={profile.cvUrl} download icon="download">{label ?? 'Download CV'}</Button>
    : <Button variant={variant} size={size} href="#contact" icon="arrow">{label ? label.replace('Download', 'Request') : 'Request CV'}</Button>;
}
