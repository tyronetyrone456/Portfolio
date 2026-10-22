import type { ComponentType } from 'react'
import type { ReactNode } from 'react'
import { cn, isExternalUrl } from '@/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'sm'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  size?: Size
  icon?: ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
  /** Adds the `download` attribute with this file name. */
  download?: string
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

const base =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-sm hover:brightness-110',
  secondary:
    'border border-border-strong bg-surface text-fg hover:border-accent/60 hover:bg-surface-2',
  ghost: 'text-muted hover:bg-surface-2 hover:text-fg',
}

const sizes: Record<Size, string> = {
  md: 'px-5 text-sm',
  sm: 'min-h-10 px-4 text-sm',
}

export function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  download,
  disabled,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const iconEl = Icon && (
    <Icon
      className={cn(
        'size-4 shrink-0 transition-transform duration-200',
        iconPosition === 'right' && 'group-hover:translate-x-0.5',
      )}
    />
  )
  const content = (
    <>
      {iconPosition === 'left' && iconEl}
      {children}
      {iconPosition === 'right' && iconEl}
    </>
  )

  if (href) {
    const external = isExternalUrl(href)
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        download={download}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
