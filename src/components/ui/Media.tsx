import { useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import type { IconName } from '@/data/types';
import { Icon } from '@/lib/icons';

const tints: Record<string, [string, string]> = {
  red: ['#4a1820', '#120a0d'],
  navy: ['#123f69', '#08131f'],
  steel: ['#1f3349', '#0a121b'],
  olive: ['#3b3416', '#100f08'],
  green: ['#15402a', '#08130d'],
};

type Props = {
  src?: string;
  alt: string;
  icon: IconName;
  tint?: keyof typeof tints;
  /** true = AI/stock art, false = real photo */
  illustrative?: boolean;
  verified?: boolean;
  className?: string;
  eager?: boolean;
  sizes?: string;
  /** CSS object-position for art direction / crops */
  position?: string;
};

/**
 * Image with a cinematic fallback. If the file is missing the frame shows a
 * branded gradient + line icon instead of a broken image. Illustrative art gets a
 * discreet label so it is never presented as genuine evidence of work.
 */
export function Media({ src, alt, icon, tint = 'steel', illustrative, verified, className = '', eager, sizes, position }: Props) {
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);
  const [c1, c2] = tints[tint];
  return (
    <div className={`media ${className}`} style={{ background: `radial-gradient(120% 90% at 70% 20%, ${c1}, ${c2})` }}>
      {!failed && (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" sizes={sizes}
          style={position ? { objectPosition: position } : undefined}
          className={loaded ? 'is-loaded' : ''} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
      )}
      {failed && (
        <>
          <div className="media__grain" />
          <div className="media__icon"><Icon name={icon} strokeWidth={0.9} /></div>
          <span className="sr-only">{alt}</span>
        </>
      )}
      {!failed && illustrative && <span className="media__tag">Illustrative</span>}
      {!failed && verified && <span className="media__tag media__tag--verified"><BadgeCheck size={11} /> On-site photo</span>}
    </div>
  );
}

export const tintFor = (category: string): keyof typeof tints =>
  /fire/i.test(category) ? 'red' : /campaign/i.test(category) ? 'navy' : /training/i.test(category) ? 'olive' : /environment/i.test(category) ? 'green' : 'steel';
