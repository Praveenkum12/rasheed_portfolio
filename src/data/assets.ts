/**
 * Central image registry.
 * Missing files fall back to a branded gradient automatically — nothing breaks.
 *
 * `illustrative: true` marks AI-generated / stock art. It is labelled "Illustrative"
 * on the site so it is never mistaken for real evidence of completed work.
 * Real, approved workplace photos go in each activity/project's `coverImage` / `gallery`.
 */
export interface Art { src: string; alt: string; illustrative: boolean; position?: string }

/* ---- Illustrative library (one file each, reused with different crops) ---- */
const LIB = {
  campaign: '/images/activities/campaign.webp',     // workers at a hydration station
  bins: '/images/expertise/environment.webp',       // colour-coded segregation bins
  loto: '/images/expertise/occupational.webp',      // lockout / tagout on a panel
  clipboard: '/images/expertise/systems.webp',      // checklist, hard hat, glasses
  substation: '/images/hero/hero-bg.webp',          // facility at blue hour
  night: '/images/hero/contact-bg.webp',            // plant skyline at night
};
const ill = (src: string, alt: string, position?: string): Art => ({ src, alt, illustrative: true, position });

export const art = {
  heroBg: ill(LIB.night, 'Industrial plant skyline at night', '50% 60%'),
  heroFg: { src: '/images/profile/portrait-cutout.webp', alt: 'Mohamed Rasheed Ali', illustrative: false } as Art,
  contactBg: ill(LIB.substation, 'Industrial electrical facility at blue hour'),
};

export const expertiseArt: Record<string, Art> = {
  occupational: ill(LIB.loto, 'Gloved hands applying a lockout padlock to an electrical isolator'),
  fire: ill(LIB.night, 'Industrial site lit at night', '40% 50%'),
  environment: ill(LIB.bins, 'Colour-coded waste segregation bins on site'),
  systems: ill(LIB.clipboard, 'Safety inspection checklist with hard hat and glasses'),
};

/** Hero triptych side cards (Health · [Safety = hero photo] · Environment). */
export const triptych = [
  { src: LIB.campaign, label: 'Health', position: '55% 50%' },
  { src: LIB.bins, label: 'Environment', position: '50% 60%' },
];

/** Per-activity cover art — chosen so no two neighbouring cards repeat. */
export const activityArt: Record<string, Art> = {
  'hydration-campaign': ill(LIB.campaign, 'Workers at a hydration station on site'),
  '5s-implementation': ill(LIB.bins, 'Organised work area with floor markings', '50% 75%'),
  'eot-crane-toolbox': ill(LIB.loto, 'Electrical isolation during maintenance', '45% 50%'),
  'compressor-toolbox': ill(LIB.substation, 'Industrial plant equipment', '35% 70%'),
  'motor-rewinding': ill(LIB.night, 'Industrial workshop area at night', '70% 60%'),
  'forklift-safety': ill(LIB.clipboard, 'Safety checklist and PPE', '30% 50%'),
  'work-at-height': ill(LIB.substation, 'Elevated steel structures', '85% 35%'),
  'bls-training': ill(LIB.clipboard, 'Training checklist and PPE', '75% 40%'),
  'fire-evacuation': ill(LIB.night, 'Site lighting at night', '25% 50%'),
  'extinguisher-inspection': ill(LIB.loto, 'Inspection of site equipment', '80% 40%'),
};

/** Per-project cover art. */
export const projectArt: Record<string, Art> = {
  'hydration-campaign': ill(LIB.campaign, 'Hydration campaign on site'),
  'ppe-awareness': ill(LIB.loto, 'PPE in use: gloves, hi-vis and hard hat'),
  'workplace-inspections': ill(LIB.substation, 'Industrial facility inspection', '65% 60%'),
  '5s-implementation': ill(LIB.bins, 'Organised, segregated work area'),
  'fire-safety-programme': ill(LIB.night, 'Site at night', '50% 55%'),
  'hse-documentation': ill(LIB.clipboard, 'HSE documentation and checklist'),
  'iso-45001-14001': ill(LIB.substation, 'Facility-wide management systems', '50% 40%'),
};

/** Category fallback for new entries that have no specific art yet. */
export const categoryArt: Record<string, Art> = {
  'Safety Campaigns': ill(LIB.campaign, 'Safety campaign'),
  'Toolbox Talks': ill(LIB.loto, 'Toolbox talk topic'),
  'Workplace Inspections': ill(LIB.substation, 'Workplace inspection'),
  'Safety Training': ill(LIB.clipboard, 'Safety training'),
  'Fire Safety': ill(LIB.night, 'Fire safety'),
  '5S Implementation': ill(LIB.bins, '5S implementation'),
  'HSE Documentation': ill(LIB.clipboard, 'HSE documentation'),
  'Environmental Activities': ill(LIB.bins, 'Environmental activity'),
  'HSE Campaigns': ill(LIB.campaign, 'HSE campaign'),
  'Safety Management': ill(LIB.substation, 'Safety management'),
  Documentation: ill(LIB.clipboard, 'Documentation'),
  'Management Systems': ill(LIB.clipboard, 'Management systems'),
};

/** Images the preloader waits for (real progress). */
export const criticalImages = [art.heroBg.src, LIB.campaign, LIB.bins];
