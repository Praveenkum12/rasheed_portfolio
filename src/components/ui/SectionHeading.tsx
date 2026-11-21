import type { ReactNode } from 'react';

type Props = { index: string; label: string; title: ReactNode; lead?: ReactNode; id?: string };

export function SectionHeading({ index, label, title, lead, id }: Props) {
  return (
    <header className="section-head">
      <div>
        <p className="eyebrow"><span className="eyebrow__num">{index}</span> / {label}</p>
        <h2 className="h-section" id={id} data-reveal="words">{title}</h2>
      </div>
      {lead && <p className="lead" data-reveal="lines" data-delay="0.15">{lead}</p>}
    </header>
  );
}
