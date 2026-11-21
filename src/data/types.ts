/**
 * Content types for the portfolio.
 * All personal content lives in /src/data — layout components never hard-code it.
 * Leave any field you have not verified as an empty string "" or empty array [].
 * Empty fields are hidden automatically on the live site.
 */

export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  designation: string;
  company: string;
  location: string;
  heroLabel: string;
  heroHeading: [string, string];
  heroSupport: string;
  aboutHeading: string;
  aboutIntro: string;
  aboutCurrent: string;
  approach: string[];
  education: string;
  certificationsSummary: string;
  portrait: string;
  portraitAlt: string;
  /** Path to CV inside /public, e.g. "/documents/resume.pdf". Leave "" until the file is uploaded. */
  cvUrl: string;
  seo: { title: string; description: string; url: string };
}

export interface Experience {
  id: string;
  company: string;
  designation: string;
  location: string;
  startDate: string;
  endDate: string; // "Present" for current role
  current: boolean;
  responsibilities: string[];
  contributions: string[];
  photos: Photo[];
  logo?: string;
}

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
  /** true = real, approved workplace photograph. false = illustrative only. */
  verified: boolean;
}

export type ActivityCategory =
  | 'Safety Campaigns'
  | 'Toolbox Talks'
  | 'Workplace Inspections'
  | 'Safety Training'
  | 'Fire Safety'
  | '5S Implementation'
  | 'HSE Documentation'
  | 'Environmental Activities';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  description: string;
  date: string;
  coverImage: string;
  gallery: Photo[];
  details: string;
  icon: IconName;
}

export type ProjectCategory = 'HSE Campaigns' | 'Safety Management' | 'Fire Safety' | 'Documentation' | 'Management Systems';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  date: string;
  coverImage: string;
  gallery: Photo[];
  background: string;
  objective: string;
  responsibilities: string[];
  activities: string[];
  documents: { label: string; href: string }[];
  outcome: string;
  lessons: string;
  featured: boolean;
  icon: IconName;
  size?: 'xl' | 'lg' | 'md' | 'sm';
}

export interface Certification {
  id: string;
  name: string;
  fullName: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  kind: 'certification' | 'education';
  icon: IconName;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  /** Only fill metric when you have a verified number. */
  metric: string;
  metricLabel: string;
  icon: IconName;
}

export interface Contact {
  email: string;
  /** International format digits only, e.g. "96512345678" */
  whatsapp: string;
  phoneDisplay: string;
  linkedin: string;
  location: string;
}

export type IconName =
  | 'hardhat' | 'flame' | 'leaf' | 'shield' | 'droplet' | 'grid' | 'megaphone' | 'zap' | 'alert'
  | 'lifebuoy' | 'extinguisher' | 'clipboard' | 'file' | 'search' | 'award' | 'grad' | 'users'
  | 'target' | 'trending' | 'recycle' | 'siren' | 'eye' | 'book';
