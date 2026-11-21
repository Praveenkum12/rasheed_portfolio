/**
 * Central image registry. Drop files into /public/images/... using these exact names.
 * Missing files fall back to a branded gradient automatically — nothing breaks.
 *
 * `illustrative: true` marks AI-generated / stock art. It is labelled "Illustrative"
 * on the site so it is never mistaken for real evidence of completed work.
 * Real, approved workplace photos belong in each activity/project's `gallery` (verified: true).
 */
export interface Art { src: string; alt: string; illustrative: boolean; position?: string }

export const art = {
  heroBg: { src: '/images/hero/hero-bg.webp', alt: 'Industrial electrical facility at blue hour', illustrative: true, position: '60% 50%' },
  heroFg: { src: '/images/profile/portrait-cutout.webp', alt: 'Mohamed Rasheed Ali', illustrative: false },
  contactBg: { src: '/images/hero/contact-bg.webp', alt: 'Industrial site at night', illustrative: true },
  aboutBg: { src: '/images/hero/about-bg.webp', alt: 'Safety equipment detail', illustrative: true },
} satisfies Record<string, Art>;

export const expertiseArt: Record<string, Art> = {
  occupational: { src: '/images/expertise/occupational.webp', alt: 'Worker in full PPE inspecting electrical switchgear', illustrative: true },
  fire: { src: '/images/expertise/fire.webp', alt: 'Fire extinguishers and emergency equipment', illustrative: true },
  environment: { src: '/images/expertise/environment.webp', alt: 'Colour-coded waste segregation bins on site', illustrative: true },
  systems: { src: '/images/expertise/systems.webp', alt: 'HSE documentation and audit checklist on a clipboard', illustrative: true },
};

/** One illustrative cover per activity category — used until real photos are added. */
export const categoryArt: Record<string, Art> = {
  'Safety Campaigns': { src: '/images/activities/campaign.webp', alt: 'Workplace safety awareness campaign', illustrative: true },
  'Toolbox Talks': { src: '/images/activities/toolbox.webp', alt: 'Toolbox talk briefing with workers in PPE', illustrative: true },
  'Workplace Inspections': { src: '/images/activities/inspection.webp', alt: 'HSE officer conducting a workplace inspection', illustrative: true },
  'Safety Training': { src: '/images/activities/training.webp', alt: 'Safety training session', illustrative: true },
  'Fire Safety': { src: '/images/activities/fire.webp', alt: 'Fire extinguisher inspection', illustrative: true },
  '5S Implementation': { src: '/images/activities/5s.webp', alt: 'Organised workshop with shadow boards and floor markings', illustrative: true },
  'HSE Documentation': { src: '/images/activities/documentation.webp', alt: 'HSE documentation and reports', illustrative: true },
  'Environmental Activities': { src: '/images/activities/environment.webp', alt: 'Waste segregation area', illustrative: true },
  // Project categories map onto the same art
  'HSE Campaigns': { src: '/images/activities/campaign.webp', alt: 'Workplace safety awareness campaign', illustrative: true },
  'Safety Management': { src: '/images/activities/inspection.webp', alt: 'Workplace safety inspection', illustrative: true },
  Documentation: { src: '/images/activities/documentation.webp', alt: 'HSE documentation', illustrative: true },
  'Management Systems': { src: '/images/expertise/systems.webp', alt: 'ISO management system documentation', illustrative: true },
};

/** Images the preloader waits for (real progress). */
export const criticalImages = [art.heroBg.src, art.heroFg.src, '/images/profile/portrait.webp'];
