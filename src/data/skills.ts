import type { IconName } from './types';

export const expertise: { id: string; title: string; icon: IconName; items: string[] }[] = [
  {
    id: 'occupational',
    title: 'Occupational Safety',
    icon: 'hardhat',
    items: [
      'Hazard identification',
      'Risk assessment',
      'Workplace inspections',
      'PPE compliance',
      'Work permit awareness',
      'Work at height',
      'Electrical safety',
      'Lifting operations',
    ],
  },
  {
    id: 'fire',
    title: 'Fire & Emergency Safety',
    icon: 'flame',
    items: [
      'Fire extinguisher inspections',
      'Fire prevention',
      'Emergency evacuation',
      'Fire safety awareness',
      'Basic life support awareness',
    ],
  },
  {
    id: 'environment',
    title: 'Environmental Management',
    icon: 'leaf',
    items: [
      'Waste segregation',
      'Environmental awareness',
      'Material handling',
      'Environmental documentation',
      'ISO 14001 awareness',
    ],
  },
  {
    id: 'systems',
    title: 'HSE Management Systems',
    icon: 'shield',
    items: [
      'ISO 45001:2018',
      'ISO 14001:2015',
      'HSE documentation',
      'Internal audit preparation',
      'Safety reporting',
      'Corrective action tracking',
    ],
  },
];

export const skills = {
  technical: [
    'HSE inspections',
    'Risk assessment',
    'Toolbox talks',
    'HSE reporting',
    'Fire safety',
    'Incident reporting',
    'PPE management',
    'Safety documentation',
  ],
  management: [
    'Safety awareness',
    'Communication',
    'Team coordination',
    'Problem solving',
    'Continuous improvement',
    'Compliance support',
  ],
  /** Add only software/tools you have verified experience with, e.g. 'Microsoft Excel'. */
  software: [] as string[],
};
