import { Check, ExternalLink, FolderGit2 } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { GithubIcon } from '@/components/Icons/BrandIcons'
import { SampleBadge } from '@/components/SampleBadge/SampleBadge'
import { Tag } from '@/components/Tag/Tag'
import { Thumbnail } from '@/components/Thumbnail/Thumbnail'
import type { Project } from '@/types'
import { isSample } from '@/utils'

export function ProjectDetails({ project }: { project: Project }) {
  const hasLinks = Boolean(project.repoUrl || project.demoUrl)

  return (
    <div className="space-y-6">
      <div className="aspect-video overflow-hidden rounded-xl border border-border">
        <Thumbnail
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          seed={project.id}
          icon={FolderGit2}
          label={project.category}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Tag>{project.category}</Tag>
        {isSample(project) && <SampleBadge />}
      </div>

      <p className="text-muted">{project.description}</p>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Key features</h4>
        <ul className="grid gap-2 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Technology stack</h4>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </div>

      {hasLinks ? (
        <div className="flex flex-wrap gap-3 border-t border-border pt-5">
          {project.repoUrl && (
            <Button href={project.repoUrl} icon={GithubIcon} iconPosition="left">
              View source
            </Button>
          )}
          {project.demoUrl && (
            <Button href={project.demoUrl} variant="secondary" icon={ExternalLink}>
              Live demo
            </Button>
          )}
        </div>
      ) : (
        <p className="border-t border-border pt-5 text-sm text-subtle">
          Repository and demo links will be added when available.
        </p>
      )}
    </div>
  )
}
