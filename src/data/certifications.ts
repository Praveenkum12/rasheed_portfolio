import type { Certification } from './types';

/**
 * Upload scans to /public/images/certifications (e.g. nebosh.webp) and set `image`.
 * Until then a placeholder card is shown — no fake certificates are generated.
 * Add as many entries as you like; the grid grows automatically.
 */
export const certifications: Certification[] = [
  {
    id: 'nebosh',
    name: 'NEBOSH',
    fullName: 'NEBOSH Certificate', // confirm exact title, e.g. "NEBOSH International General Certificate"
    issuer: 'National Examination Board in Occupational Safety and Health',
    date: '',
    credentialId: '',
    image: '',
    kind: 'certification',
    icon: 'shield',
  },
  {
    id: 'iosh',
    name: 'IOSH',
    fullName: 'IOSH Certificate', // confirm exact title, e.g. "IOSH Managing Safely"
    issuer: 'Institution of Occupational Safety and Health',
    date: '',
    credentialId: '',
    image: '',
    kind: 'certification',
    icon: 'award',
  },
  {
    id: 'be-ece',
    name: 'BE ECE',
    fullName: 'BE Electronics & Communication Engineering',
    issuer: '', // add university name
    date: '',
    credentialId: '',
    image: '',
    kind: 'education',
    icon: 'grad',
  },
];

/** Number of empty "add certificate" slots shown after real entries (set 0 to hide). */
export const certificateSlots = 0;
