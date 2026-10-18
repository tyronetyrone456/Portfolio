import type { SocialLink } from '@/types'
import { site } from './site'

/**
 * Add your profile URLs. Links with an empty `url` are hidden everywhere.
 * GitHub is built from `site.github.username`; email from `site.contact.email`.
 */
const githubUrl = site.github.username ? `https://github.com/${site.github.username}` : ''
const emailUrl = site.contact.email ? `mailto:${site.contact.email}` : ''

export const socialLinks: SocialLink[] = [
  { id: 'github', kind: 'github', label: 'GitHub', url: githubUrl },
  { id: 'linkedin', kind: 'linkedin', label: 'LinkedIn', url: '' },
  { id: 'email', kind: 'email', label: 'Email', url: emailUrl },
  // { id: 'facebook', kind: 'other', label: 'Facebook', url: 'https://...' },
]
