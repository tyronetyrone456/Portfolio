import { memo } from 'react'
import { motion } from 'framer-motion'
import { Award, CalendarDays } from 'lucide-react'
import { SampleBadge } from '@/components/SampleBadge/SampleBadge'
import { Tag } from '@/components/Tag/Tag'
import { Thumbnail } from '@/components/Thumbnail/Thumbnail'
import type { Certificate } from '@/types'
import { formatMonthYear, isSample } from '@/utils'
import { gridItemMotion } from '@/utils/motion'

interface CertificateCardProps {
  certificate: Certificate
  index: number
  onOpen: (certificate: Certificate) => void
}

export const CertificateCard = memo(function CertificateCard({
  certificate,
  index,
  onOpen,
}: CertificateCardProps) {
  const visibleSkills = certificate.skills.slice(0, 3)
  const extra = certificate.skills.length - visibleSkills.length

  return (
    <motion.article {...gridItemMotion(index)} className="h-full">
      <button
        type="button"
        onClick={() => onOpen(certificate)}
        aria-label={`View details for ${certificate.title}`}
        className="card card-interactive group flex h-full w-full flex-col overflow-hidden text-left"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-surface-2">
          <div className="size-full transition-transform duration-500 ease-out group-hover:scale-105">
            <Thumbnail
              src={certificate.image}
              alt={`Certificate: ${certificate.title}`}
              seed={certificate.id}
              icon={Award}
              label={certificate.platform}
            />
          </div>
          {isSample(certificate) && (
            <span className="absolute top-3 right-3">
              <SampleBadge />
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="flex items-center gap-1.5 text-xs text-subtle">
            <CalendarDays className="size-3.5" aria-hidden />
            {formatMonthYear(certificate.completedOn)}
            <span aria-hidden>·</span>
            {certificate.category}
          </p>
          <h3 className="mt-2 line-clamp-2 font-display text-base leading-snug font-semibold">
            {certificate.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {certificate.issuer} · {certificate.platform}
          </p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Skills learned">
            {visibleSkills.map((skill) => (
              <li key={skill}>
                <Tag>{skill}</Tag>
              </li>
            ))}
            {extra > 0 && (
              <li>
                <Tag>{`+${extra}`}</Tag>
              </li>
            )}
          </ul>
        </div>
      </button>
    </motion.article>
  )
})
