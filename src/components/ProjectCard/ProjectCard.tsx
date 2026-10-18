import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, FolderGit2 } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { GithubIcon } from '@/components/Icons/BrandIcons'
import { SampleBadge } from '@/components/SampleBadge/SampleBadge'
import { Tag } from '@/components/Tag/Tag'
import { Thumbnail } from '@/components/Thumbnail/Thumbnail'
import type { Project } from '@/types'
import { isSample } from '@/utils'
import { gridItemMotion } from '@/utils/motion'

const VISIBLE_TAGS = 4

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export const ProjectCard = memo(function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const extra = project.stack.length - VISIBLE_TAGS

  return (
    <motion.article {...gridItemMotion(index)} className="h-full">
      <div className="card card-interactive group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
          <div className="size-full transition-transform duration-500 ease-out group-hover:scale-105">
            <Thumbnail
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              seed={project.id}
              icon={FolderGit2}
              label={project.category}
            />
          </div>
          <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
            {project.category}
          </span>
          {isSample(project) && (
            <span className="absolute top-3 right-3">
              <SampleBadge />
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg leading-snug font-semibold">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.slice(0, VISIBLE_TAGS).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
            {extra > 0 && (
              <li>
                <Tag>{`+${extra}`}</Tag>
              </li>
            )}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowUpRight}
              onClick={() => onOpen(project)}
              aria-label={`View details for ${project.title}`}
            >
              Details
            </Button>
            {project.repoUrl && (
              <Button
                href={project.repoUrl}
                variant="ghost"
                size="sm"
                icon={GithubIcon}
                iconPosition="left"
                aria-label={`${project.title} source code on GitHub`}
              >
                Code
              </Button>
            )}
            {project.demoUrl && (
              <Button
                href={project.demoUrl}
                variant="ghost"
                size="sm"
                icon={ExternalLink}
                iconPosition="left"
                aria-label={`${project.title} live demo`}
              >
                Live
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
})
