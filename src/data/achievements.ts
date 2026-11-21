import type { Achievement } from './types';

/**
 * Qualitative achievements. Only set `metric` (e.g. "24") when you have a verified number.
 * Never fabricate accident-reduction %, inspection totals or training head-counts.
 */
export const achievements: Achievement[] = [
  {
    id: 'campaigns',
    title: 'Safety campaigns delivered',
    description: 'Workforce awareness campaigns including hydration and PPE awareness.',
    metric: '',
    metricLabel: '',
    icon: 'megaphone',
  },
  {
    id: 'training',
    title: 'Training & toolbox talks',
    description: 'Toolbox talks on cranes, compressors, forklifts, work at height and life support.',
    metric: '',
    metricLabel: '',
    icon: 'users',
  },
  {
    id: 'inspections',
    title: 'Inspection programme',
    description: 'Routine workplace and monthly fire extinguisher inspections.',
    metric: '',
    metricLabel: '',
    icon: 'search',
  },
  {
    id: 'improvements',
    title: 'Workplace improvements',
    description: '5S implementation supporting organised, safer work areas.',
    metric: '',
    metricLabel: '',
    icon: 'trending',
  },
  {
    id: 'audit',
    title: 'Audit readiness',
    description: 'Documentation support for ISO 45001:2018 and ISO 14001:2015 preparation.',
    metric: '',
    metricLabel: '',
    icon: 'clipboard',
  },
  {
    id: 'emergency',
    title: 'Emergency preparedness',
    description: 'Fire evacuation drills and emergency response readiness.',
    metric: '',
    metricLabel: '',
    icon: 'siren',
  },
];
