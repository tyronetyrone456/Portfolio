import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn, hueFromString } from '@/utils'

interface ThumbnailProps {
  src?: string
  alt: string
  /** Seeds the generated placeholder colour so each item looks distinct. */
  seed: string
  icon: LucideIcon
  label?: string
  fit?: 'cover' | 'contain'
  className?: string
}

/** Lazy image with a themed placeholder for missing or broken files. */
export function Thumbnail({
  src,
  alt,
  seed,
  icon: Icon,
  label,
  fit = 'cover',
  className,
}: ThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = Boolean(src) && failedSrc !== src

  if (showImage) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailedSrc(src ?? null)}
        className={cn('size-full', fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      />
    )
  }

  const hue = hueFromString(seed)
  return (
    <div
      aria-hidden
      className={cn('relative flex size-full flex-col items-center justify-center gap-3 overflow-hidden bg-surface-2', className)}
      style={{
        backgroundImage: `radial-gradient(60% 70% at 50% 0%, hsl(${hue} 60% 55% / 0.16), transparent 70%), radial-gradient(var(--border-strong) 1px, transparent 1px)`,
        backgroundSize: 'auto, 18px 18px',
      }}
    >
      <span className="grid size-12 place-items-center rounded-xl border border-border-strong bg-surface text-accent shadow-sm">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      {label && (
        <span className="max-w-[80%] truncate font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">
          {label}
        </span>
      )}
    </div>
  )
}
