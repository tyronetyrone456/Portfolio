import { Section } from '@/components/Section/Section'
import { Stagger, StaggerItem } from '@/components/Reveal/Reveal'
import { interests } from '@/data/interests'

export function Interests() {
  return (
    <Section
      id="interests"
      eyebrow="06 / Interests"
      title="Where I'm growing"
      description="Areas I'm actively exploring and building skills in."
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {interests.map(({ id, title, description, icon: Icon }) => (
          <StaggerItem key={id} className="h-full">
            <article className="card card-interactive h-full p-6">
              <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
