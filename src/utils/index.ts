import type { Publishable } from '@/types'
import { site } from '@/data/site'

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Keeps visible items; unconfirmed samples only count while `showSamples` is on. */
export function selectPublished<T extends Publishable>(items: T[]): T[] {
  return items.filter((item) => item.visible !== false && (item.confirmed || site.showSamples))
}

export function isSample(item: Publishable): boolean {
  return !item.confirmed
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

/** Formats "YYYY-MM" or "YYYY-MM-DD" as "Mar 2025"; falls back to the raw value. */
export function formatMonthYear(iso: string): string {
  const date = new Date(iso.length === 7 ? `${iso}-01T00:00:00` : `${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(date)
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** Stable hue (0-359) derived from a string, for generated image placeholders. */
export function hueFromString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) % 360
  return hash
}
