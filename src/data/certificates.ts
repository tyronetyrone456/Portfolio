import type { Certificate } from '@/types'

/**
 * HOW TO ADD A CERTIFICATE
 *  1. Add an entry with `confirmed: true`, using details from your real
 *     certificate. Never invent titles, dates, IDs, or links.
 *  2. `credentialUrl` is the official verification link (for Coursera, the
 *     certificate's share URL). Omit it if you do not have one.
 *  3. Optional thumbnail: put an image in /public/certificates and set `image`.
 *     Optional PDF: put it in /public/certificates and set `pdf`.
 *  4. `relatedProjectId` can reference a project `id` from projects.ts.
 *
 * Only the placeholder below exists today. It is hidden in production until
 * you replace it with real entries marked `confirmed: true`.
 */
export const certificates: Certificate[] = [
  {
    id: 'sample-certificate',
    title: 'Sample Certificate Title (replace me)',
    issuer: 'Issuing Organization',
    platform: 'Coursera',
    completedOn: '2000-01',
    category: 'Professional Skills',
    skills: ['Sample skill'],
    confirmed: false,
  },
]
