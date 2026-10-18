import { Download, ExternalLink, FileText } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { Reveal } from '@/components/Reveal/Reveal'
import { Section } from '@/components/Section/Section'
import { certificates } from '@/data/certificates'
import { timeline } from '@/data/education'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { skillGroups } from '@/data/skills'
import { useResumeStatus } from '@/hooks/useResumeAvailable'
import { selectPublished } from '@/utils'
import { ResumeSummary } from './ResumeSummary'
import type { SummaryRow } from './ResumeSummary'

const publishedProjects = selectPublished(projects)
const publishedCertificates = selectPublished(certificates)
const entries = selectPublished(timeline).filter((e) => e.title.trim())
const experience = entries.filter((e) => ['internship', 'freelance', 'volunteer'].includes(e.type))

const rows: SummaryRow[] = [
  {
    label: 'Education',
    value: entries.filter((e) => e.type === 'education').map((e) => e.title),
  },
  { label: 'Skills', value: skillGroups.map((g) => g.title) },
  { label: 'Projects', value: publishedProjects.map((p) => p.title) },
  { label: 'Certificates', value: publishedCertificates.map((c) => c.title) },
  { label: 'Experience', value: experience.map((e) => e.title) },
]

export function Resume() {
  const status = useResumeStatus()

  return (
    <Section
      id="resume"
      eyebrow="08 / Resume"
      title="Resume"
      description="A concise summary of my education, skills, projects, and experience."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <ResumeSummary rows={rows} />
        </Reveal>

        <Reveal delay={0.1}>
          {status === 'available' ? (
            <div className="card overflow-hidden">
              <object
                data={`${site.resume.path}#view=FitH`}
                type="application/pdf"
                aria-label="Resume PDF preview"
                className="hidden h-[460px] w-full md:block"
              >
                <span className="sr-only">PDF preview is not supported in this browser.</span>
              </object>
              <div className="flex flex-col gap-3 p-5 sm:flex-row md:border-t md:border-border">
                <Button
                  href={site.resume.path}
                  download={site.resume.downloadName}
                  icon={Download}
                  iconPosition="left"
                >
                  Download Resume
                </Button>
                <Button href={site.resume.path} variant="secondary" icon={ExternalLink}>
                  Open in new tab
                </Button>
              </div>
            </div>
          ) : status === 'missing' ? (
            <EmptyState
              icon={FileText}
              title="Resume coming soon"
              description="My downloadable resume will be available here shortly. In the meantime, the highlights are listed beside this card."
              devHint={`Add your PDF at public${site.resume.path} (path is set in src/data/site.ts).`}
            />
          ) : (
            <div className="card h-72 animate-pulse bg-surface-2" aria-hidden />
          )}
        </Reveal>
      </div>
    </Section>
  )
}
