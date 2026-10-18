import { motion } from 'framer-motion'
import { fadeUp } from '@/utils/motion'
import { cn } from '@/utils'

const classes =
  'inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted'

export function Tag({ children, className }: { children: string; className?: string }) {
  return <span className={cn(classes, className)}>{children}</span>
}

/** Tag that fades in as part of a staggered parent (`variants` flow down from the parent). */
export function AnimatedTag({ children }: { children: string }) {
  return (
    <motion.span
      variants={fadeUp}
      className={cn(
        classes,
        'transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-fg',
      )}
    >
      {children}
    </motion.span>
  )
}
