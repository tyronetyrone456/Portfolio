import { Award, BadgeCheck, FileText } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { SampleBadge } from '@/components/SampleBadge/SampleBadge'
import { Tag } from '@/components/Tag/Tag'
import { Thumbnail } from '@/components/Thumbnail/Thumbnail'
import { projects } from '@/data/projects'
import type { Certificate } from '@/types'
import { formatMonthYear, isSample } from '@/utils'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-subtle uppercase">{label}</dt>
      <dd className="mt-0.5 text-sm text-fg">{children}</dd>
    </div>
  )
}

export function CertificateDetails({ certificate }: { certificate: Certificate }) {
  const relatedProject = projects.find((p) => p.id === certificate.relatedProjectId)

  return (
    <div className="space-y-6">
      <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface-2">
        <Thumbnail
          src={certificate.image}
          alt={`Certificate: ${certificate.title}`}
          seed={certificate.id}
          icon={Award}
          label={certificate.platform}
          fit="contain"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Tag>{certificate.category}</Tag>
        {isSample(certificate) && <SampleBadge />}
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        <Row label="Issued by">{certificate.issuer}</Row>
        <Row label="Platform">{certificate.platform}</Row>
        <Row label="Completed">{formatMonthYear(certificate.completedOn)}</Row>
        {certificate.credentialId && <Row label="Credential ID">{certificate.credentialId}</Row>}
        {relatedProject && <Row label="Related project">{relatedProject.title}</Row>}
      </dl>

      {certificate.skills.length > 0 && (
        <div>
          <h4 className="mb-3 text-sm font-semibold">Skills learned</h4>
          <ul className="flex flex-wrap gap-2">
            {certificate.skills.map((skill) => (
              <li key={skill}>
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3 border-t border-border pt-5">
        {certificate.credentialUrl ? (
          <Button href={certificate.credentialUrl} icon={BadgeCheck}>
            Verify credential
          </Button>
        ) : (
          <p className="text-sm text-subtle">No public verification link has been added.</p>
        )}
        {certificate.pdf && (
          <Button href={certificate.pdf} variant="secondary" icon={FileText} iconPosition="left">
            View PDF
          </Button>
        )}
      </div>
    </div>
  )
}
