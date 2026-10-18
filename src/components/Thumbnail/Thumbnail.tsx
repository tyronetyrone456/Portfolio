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
      className={cn(
        'relative flex size-full flex-col items-center justify-center gap-2 overflow-hidden text-white/80',
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 25% 20%, hsl(${hue} 70% 55% / 0.55), transparent 60%), linear-gradient(135deg, hsl(${hue} 45% 18%), hsl(${(hue + 50) % 360} 50% 12%))`,
      }}
    >
      <Icon className="size-8 opacity-90" strokeWidth={1.5} />
      {label && (
        <span className="max-w-[80%] truncate font-mono text-[11px] tracking-wide uppercase opacity-70">
          {label}
        </span>
      )}
    </div>
  )
}
