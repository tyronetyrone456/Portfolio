import type { LucideIcon } from 'lucide-react'

/**
 * Items that can be hidden or held back until confirmed.
 * - `visible: false` hides an item everywhere.
 * - `confirmed: false` marks a sample/placeholder: shown only while developing
 *   (see `showSamples` in data/site.ts) and never in the production build.
 */
export interface Publishable {
  visible?: boolean
  confirmed?: boolean
}

export const PROJECT_CATEGORIES = [
  'Web Development',
  'Backend Development',
  'Database Systems',
  'Mobile Development',
  'UI/UX Design',
  'Academic Projects',
] as const
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export interface Project extends Publishable {
  id: string
  title: string
  summary: string
  description: string
  category: ProjectCategory
  stack: string[]
  features: string[]
  /** Path under /public, e.g. "/projects/my-app.png" */
  image?: string
  repoUrl?: string
  demoUrl?: string
}

export const CERTIFICATE_CATEGORIES = [
  'Web Development',
  'Python',
  'Databases',
  'IT Support',
  'Cybersecurity',
  'Cloud Computing',
  'Data Analytics',
  'AI',
  'Professional Skills',
] as const
export type CertificateCategory = (typeof CERTIFICATE_CATEGORIES)[number]

export interface Certificate extends Publishable {
  id: string
  title: string
  issuer: string
  platform: string
  /** ISO date: "YYYY-MM" or "YYYY-MM-DD" */
  completedOn: string
  category: CertificateCategory
  skills: string[]
  /** Path under /public, e.g. "/certificates/python.png" */
  image?: string
  /** Path under /public to a PDF copy of the certificate */
  pdf?: string
  credentialUrl?: string
  credentialId?: string
  /** `id` of a project in data/projects.ts */
  relatedProjectId?: string
}

export interface SkillGroup {
  id: string
  title: string
  icon: LucideIcon
  skills: string[]
}

export type TimelineType =
  | 'education'
  | 'achievement'
  | 'training'
  | 'internship'
  | 'freelance'
  | 'volunteer'

export interface TimelineEntry extends Publishable {
  id: string
  type: TimelineType
  /** Entries with an empty title are hidden automatically. */
  title: string
  organization?: string
  period?: string
  description?: string
  highlights?: string[]
}

export interface Interest {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface Repository extends Publishable {
  id: string
  name: string
  description: string
  tags: string[]
  url?: string
}

export type SocialKind = 'github' | 'linkedin' | 'email' | 'other'

export interface SocialLink {
  id: string
  kind: SocialKind
  label: string
  /** Leave empty to hide the link everywhere. */
  url: string
}

export interface NavItem {
  id: string
  label: string
}
