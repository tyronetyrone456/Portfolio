import { Section } from '@/components/Section/Section'
import { Stagger } from '@/components/Reveal/Reveal'
import { SkillCard } from '@/components/SkillCard/SkillCard'
import { skillGroups } from '@/data/skills'

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="02 / Skills"
      title="Technologies I work with"
      description="The languages, frameworks, and tools I use in my coursework and personal projects."
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {skillGroups.map((group) => (
          <SkillCard key={group.id} group={group} />
        ))}
      </Stagger>
    </Section>
  )
}
