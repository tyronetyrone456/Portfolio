import { motion } from 'framer-motion'
import { cn } from '@/utils'

interface FilterChipsProps {
  /** Accessible name for the group. */
  label: string
  /** Unique per group; scopes the animated highlight. */
  groupId: string
  options: string[]
  value: string
  onChange: (value: string) => void
  counts?: Record<string, number>
}

export function FilterChips({ label, groupId, options, value, onChange, counts }: FilterChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              'relative min-h-10 rounded-lg border px-4 text-sm font-medium transition-colors',
              active
                ? 'border-transparent text-white'
                : 'border-border bg-surface text-muted hover:border-border-strong hover:text-fg',
            )}
          >
            {active && (
              <motion.span
                layoutId={`chip-${groupId}`}
                className="bg-brand absolute inset-0 rounded-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">
              {option}
              {counts && counts[option] !== undefined && (
                <span className={cn('ml-1.5 text-xs', active ? 'text-white/80' : 'text-subtle')}>
                  {counts[option]}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
