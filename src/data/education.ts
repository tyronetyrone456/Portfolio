import type { TimelineEntry } from '@/types'

/**
 * Timeline of confirmed education, training, and experience.
 * Entries with an empty `title` or `visible: false` are hidden automatically,
 * so the empty templates below cost nothing. Fill one in and set `confirmed: true`
 * to publish it.
 */
export const timeline: TimelineEntry[] = [
  {
    id: 'bsit',
    type: 'education',
    title: 'Bachelor of Science in Information Technology',
    // organization: 'Your university',
    // period: '20XX – Present',
    description:
      'Building skills through academic projects, hands-on programming, online courses, and certifications.',
    confirmed: true,
  },
  { id: 'achievement-template', type: 'achievement', title: '' },
  { id: 'training-template', type: 'training', title: '' },
  { id: 'internship-template', type: 'internship', title: '' },
  { id: 'freelance-template', type: 'freelance', title: '' },
  { id: 'volunteer-template', type: 'volunteer', title: '' },
]
