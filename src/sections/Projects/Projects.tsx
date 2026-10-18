import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { FilterChips } from '@/components/FilterChips/FilterChips'
import { GithubIcon } from '@/components/Icons/BrandIcons'
import { Modal } from '@/components/Modal/Modal'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { Reveal } from '@/components/Reveal/Reveal'
import { Section } from '@/components/Section/Section'
import { projects } from '@/data/projects'
import { socialLinks } from '@/data/socialLinks'
import { PROJECT_CATEGORIES } from '@/types'
import type { Project } from '@/types'
import { selectPublished } from '@/utils'
import { ProjectDetails } from './ProjectDetails'

const ALL = 'All'
const published = selectPublished(projects)
const categories = PROJECT_CATEGORIES.filter((c) => published.some((p) => p.category === c))
const counts: Record<string, number> = {
  [ALL]: published.length,
  ...Object.fromEntries(categories.map((c) => [c, published.filter((p) => p.category === c).length])),
}
const githubUrl = socialLinks.find((l) => l.kind === 'github')?.url

export function Projects() {
  const [category, setCategory] = useState<string>(ALL)
  const [selected, setSelected] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(
    () => (category === ALL ? published : published.filter((p) => p.category === category)),
    [category],
  )

  const openProject = useCallback((project: Project) => {
    setSelected(project)
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <Section
      id="projects"
      eyebrow="03 / Projects"
      title="Things I've built"
      description="Systems and applications from my coursework and personal practice, each one a chance to apply what I'm learning."
    >
      {published.length === 0 ? (
        <Reveal>
          <EmptyState
            icon={FolderGit2}
            title="Projects are on the way"
            description="I'm preparing write-ups of the systems I've built. Check back soon."
            action={
              githubUrl && (
                <Button href={githubUrl} variant="secondary" icon={GithubIcon} iconPosition="left">
                  Visit my GitHub
                </Button>
              )
            }
            devHint="Set confirmed: true on an entry in src/data/projects.ts to publish it."
          />
        </Reveal>
      ) : (
        <>
          <Reveal className="mb-8">
            <FilterChips
              label="Filter projects by category"
              groupId="projects"
              options={[ALL, ...categories]}
              value={category}
              onChange={setCategory}
              counts={counts}
            />
          </Reveal>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onOpen={openProject} />
              ))}
            </AnimatePresence>
          </motion.div>

          <Modal open={modalOpen} onClose={closeModal} title={selected?.title ?? 'Project details'}>
            {selected && <ProjectDetails project={selected} />}
          </Modal>
        </>
      )}
    </Section>
  )
}
