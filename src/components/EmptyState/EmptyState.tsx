import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
  /** Instruction for the site owner. Only rendered in development builds. */
  devHint?: string
}

export function EmptyState({ icon: Icon, title, description, action, devHint }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-strong bg-surface/50 px-6 py-14 text-center">
      <span className="mb-5 grid size-14 place-items-center rounded-2xl border border-border bg-surface-2 text-accent">
        <Icon className="size-6" aria-hidden />
      </span>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
      {import.meta.env.DEV && devHint && (
        <p className="mt-6 rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-xs text-subtle">
          dev note: {devHint}
        </p>
      )}
    </div>
  )
}
