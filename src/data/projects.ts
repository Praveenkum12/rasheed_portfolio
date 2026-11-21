import type { Project, ProjectCategory } from './types';

export const projectCategories: ProjectCategory[] = [
  'HSE Campaigns',
  'Safety Management',
  'Fire Safety',
  'Documentation',
  'Management Systems',
];

/**
 * Case studies. Never invent results — leave outcome/lessons "" until verified.
 * Put images in /public/images/projects. documents: only company-approved, non-confidential files.
 */
const base = {
  date: '',
  coverImage: '',
  gallery: [],
  background: '',
  objective: '',
  responsibilities: [] as string[],
  activities: [] as string[],
  documents: [],
  outcome: '',
  lessons: '',
};

export const projects: Project[] = [
  {
    ...base,
    id: 'hydration-campaign',
    title: 'HSE Hydration Campaign',
    category: 'HSE Campaigns',
    description: 'Workplace hydration awareness initiative.',
    activities: ['Hydration awareness', 'Safety awareness posters'],
    featured: true,
    icon: 'droplet',
    size: 'lg',
  },
  {
    ...base,
    id: 'ppe-awareness',
    title: 'PPE Awareness',
    category: 'HSE Campaigns',
    description: 'Campaign promoting correct selection and use of personal protective equipment.',
    featured: false,
    icon: 'hardhat',
    size: 'sm',
  },
  {
    ...base,
    id: 'workplace-inspections',
    title: 'Workplace Safety Inspections',
    category: 'Safety Management',
    description: 'Planned inspections, HSE observations and corrective action follow-up.',
    activities: ['Workplace safety inspections', 'HSE observations', 'Corrective actions'],
    featured: true,
    icon: 'search',
    size: 'md',
  },
  {
    ...base,
    id: '5s-implementation',
    title: '5S Implementation',
    category: 'Safety Management',
    description: 'Structured housekeeping and workplace organisation programme.',
    featured: false,
    icon: 'grid',
    size: 'md',
  },
  {
    ...base,
    id: 'fire-safety-programme',
    title: 'Fire Safety Programme',
    category: 'Fire Safety',
    description: 'Fire extinguisher inspection, evacuation drills, equipment maintenance and KFF inspection preparation.',
    activities: [
      'Fire extinguisher inspection',
      'Fire evacuation',
      'Firefighting equipment maintenance',
      'KFF inspection preparation',
    ],
    featured: true,
    icon: 'flame',
    size: 'lg',
  },
  {
    ...base,
    id: 'hse-documentation',
    title: 'HSE Documentation',
    category: 'Documentation',
    description: 'Risk assessments, incident reports, SDS records, waste segregation and monthly HSE reports.',
    activities: ['Risk assessments', 'Incident reports', 'SDS documentation', 'Waste segregation', 'HSE monthly reports'],
    featured: false,
    icon: 'file',
    size: 'sm',
  },
  {
    ...base,
    id: 'iso-45001-14001',
    title: 'ISO 45001 & ISO 14001 Preparation',
    category: 'Management Systems',
    description: 'Audit documentation, objectives and targets for occupational health & safety and environmental systems.',
    activities: ['ISO 45001 preparation', 'ISO 14001 preparation', 'Audit documentation', 'Objectives and targets'],
    featured: true,
    icon: 'shield',
    size: 'xl',
  },
];
