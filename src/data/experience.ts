import type { Experience } from './types';

export const experience: Experience[] = [
  {
    id: 'gulf-paramount',
    company: 'Gulf Paramount Electrical Services Company S.P.C.',
    designation: 'HSE Officer',
    location: 'Kuwait',
    startDate: '', // add verified start date, e.g. "Mar 2024"
    endDate: 'Present',
    current: true,
    responsibilities: [
      'Workplace safety inspections',
      'Toolbox talks',
      'HSE documentation',
      'Safety campaigns',
      '5S implementation',
      'Fire safety inspections',
      'Emergency preparedness',
      'ISO 45001:2018 preparation',
      'ISO 14001:2015 preparation',
      'HSE coordination and reporting',
    ],
    contributions: [], // add verified key contributions
    photos: [], // add approved site photos: { src, alt, verified: true }
  },
  // Add previous employment here — the timeline renders it automatically.
  // {
  //   id: 'previous-company',
  //   company: '',
  //   designation: '',
  //   location: '',
  //   startDate: '',
  //   endDate: '',
  //   current: false,
  //   responsibilities: [],
  //   contributions: [],
  //   photos: [],
  // },
];
