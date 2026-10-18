import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

/** Shared props for cards inside filterable grids: reveal on scroll, animate layout changes. */
export function gridItemMotion(index: number) {
  return {
    layout: true,
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.45, ease: EASE, delay: (index % 3) * 0.06 },
  } as const
}
