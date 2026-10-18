import { Section } from '@/components/Section/Section'
import { Stagger } from '@/components/Reveal/Reveal'
import { SkillCard } from '@/components/SkillCard/SkillCard'
import { skillGroups } from '@/data/skills'

/** Three per row on wide screens; a short last row stretches to fill it, so the grid never ends in a hole. */
function spanFor(index: number, total: number): string {
  const leftover = total % 3
  const inLastRow = leftover > 0 && index >= total - leftover
  if (!inLastRow) return 'lg:col-span-2'
  return leftover === 1 ? 'lg:col-span-6' : 'lg:col-span-3'
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 / Skills"
      title="Technologies I work with"
      description="The languages, frameworks, and tools I use in my coursework and personal projects."
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6" gap={0.08}>
        {skillGroups.map((group, index) => (
          <SkillCard key={group.id} group={group} className={spanFor(index, skillGroups.length)} />
        ))}
      </Stagger>
    </Section>
  )
}
