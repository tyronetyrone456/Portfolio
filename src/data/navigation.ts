import type { NavItem } from '@/types'

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

/** Every section on the page, used for scroll-spy (superset of the nav). */
export const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'certificates',
  'journey',
  'interests',
  'github',
  'resume',
  'contact',
]

/** Sections that are not in the navbar highlight the closest preceding nav item. */
export function resolveNavId(sectionId: string): string {
  const navIds = new Set(navItems.map((item) => item.id))
  const index = sectionIds.indexOf(sectionId)
  for (let i = index; i >= 0; i--) {
    if (navIds.has(sectionIds[i])) return sectionIds[i]
  }
  return navItems[0].id
}
