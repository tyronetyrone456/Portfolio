import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { GithubIcon } from '@/components/Icons/BrandIcons'
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal/Reveal'
import { SampleBadge } from '@/components/SampleBadge/SampleBadge'
import { Section } from '@/components/Section/Section'
import { Tag } from '@/components/Tag/Tag'
import { repositories } from '@/data/repositories'
import { site } from '@/data/site'
import { isSample, selectPublished } from '@/utils'

const { username, showContributionGraph } = site.github
const published = selectPublished(repositories)
const profileUrl = username ? `https://github.com/${username}` : ''

export function GitHub() {
  // Nothing real to show yet: skip the whole section rather than render an empty shell.
  if (!username && published.length === 0) return null

  return (
    <Section
      id="github"
      eyebrow="07 / GitHub"
      title="Open source & code"
      description="A selection of repositories and my developer activity."
    >
      {profileUrl && (
        <Reveal className="card mb-8 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface-2">
              <GithubIcon className="size-6" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold">@{username}</p>
              <p className="text-sm text-muted">GitHub profile</p>
            </div>
          </div>
          <Button href={profileUrl} variant="secondary" icon={ArrowUpRight}>
            View profile
          </Button>
        </Reveal>
      )}

      {profileUrl && showContributionGraph && (
        <Reveal className="card mb-8 overflow-x-auto p-5">
          <img
            src={`https://ghchart.rshah.org/${encodeURIComponent(username)}`}
            alt={`GitHub contribution graph for ${username}`}
            loading="lazy"
            className="min-w-[640px] dark:invert dark:hue-rotate-180"
          />
        </Reveal>
      )}

      {published.length > 0 && (
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {published.map((repo) => (
            <StaggerItem key={repo.id} className="h-full">
              <article className="card card-interactive flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="truncate font-mono text-base font-semibold">{repo.name}</h3>
                  {isSample(repo) && <SampleBadge />}
                </div>
                <p className="mt-2 text-sm text-muted">{repo.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {repo.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
                {repo.url && (
                  <div className="mt-auto pt-5">
                    <Button
                      href={repo.url}
                      variant="ghost"
                      size="sm"
                      icon={GithubIcon}
                      iconPosition="left"
                      aria-label={`${repo.name} repository on GitHub`}
                    >
                      Repository
                    </Button>
                  </div>
                )}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </Section>
  )
}
