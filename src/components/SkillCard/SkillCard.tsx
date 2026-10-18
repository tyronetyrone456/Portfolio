import { motion } from 'framer-motion'
import { AnimatedTag } from '@/components/Tag/Tag'
import { StaggerItem } from '@/components/Reveal/Reveal'
import type { SkillGroup } from '@/types'
import { stagger } from '@/utils/motion'

export function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = group.icon
  const headingId = `skill-${group.id}`

  return (
    <StaggerItem className="h-full">
      <article aria-labelledby={headingId} className="card card-interactive h-full p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
            <Icon className="size-5" aria-hidden />
          </span>
          <h3 id={headingId} className="font-display text-lg font-semibold">
            {group.title}
          </h3>
        </div>
        <motion.ul variants={stagger(0.04, 0.1)} className="mt-5 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <li key={skill}>
              <AnimatedTag>{skill}</AnimatedTag>
            </li>
          ))}
        </motion.ul>
      </article>
    </StaggerItem>
  )
}
