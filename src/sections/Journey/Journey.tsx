import { Briefcase, BookOpen, GraduationCap, HeartHandshake, Laptop, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/Reveal/Reveal'
import { SampleBadge } from '@/components/SampleBadge/SampleBadge'
import { Section } from '@/components/Section/Section'
import { Tag } from '@/components/Tag/Tag'
import { timeline } from '@/data/education'
import type { TimelineType } from '@/types'
import { isSample, selectPublished } from '@/utils'

const typeMeta: Record<TimelineType, { label: string; icon: LucideIcon }> = {
  education: { label: 'Education', icon: GraduationCap },
  achievement: { label: 'Achievement', icon: Trophy },
  training: { label: 'Training', icon: BookOpen },
  internship: { label: 'Internship', icon: Briefcase },
  freelance: { label: 'Freelance', icon: Laptop },
  volunteer: { label: 'Volunteer IT', icon: HeartHandshake },
}

// Entries without a title are blank templates and are skipped automatically.
const entries = selectPublished(timeline).filter((entry) => entry.title.trim().length > 0)

export function Journey() {
  if (entries.length === 0) return null

  return (
    <Section
      id="journey"
      eyebrow="05 / Journey"
      title="Education & experience"
      description="Confirmed milestones along the way. More will appear here as I add them."
    >
      <Stagger gap={0.1}>
          <ol className="relative space-y-6 border-l border-border-strong pl-8 sm:pl-10">
            {entries.map((entry) => {
              const { label, icon: Icon } = typeMeta[entry.type]
              return (
                <li key={entry.id} className="relative">
                  <span
                    className="absolute top-5 -left-[2.65rem] grid size-9 place-items-center rounded-xl border border-border-strong bg-elev text-accent sm:-left-[3.15rem]"
                    aria-hidden
                  >
                    <Icon className="size-4" />
                  </span>
                  <StaggerItem>
                    <article className="card p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag>{label}</Tag>
                        {entry.period && <span className="text-sm text-subtle">{entry.period}</span>}
                        {isSample(entry) && <SampleBadge />}
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold">{entry.title}</h3>
                      {entry.organization && (
                        <p className="text-sm text-accent">{entry.organization}</p>
                      )}
                      {entry.description && <p className="mt-2 text-muted">{entry.description}</p>}
                      {entry.highlights && entry.highlights.length > 0 && (
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                          {entry.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </StaggerItem>
                </li>
              )
            })}
          </ol>
      </Stagger>
    </Section>
  )
}
