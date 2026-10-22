import { Compass, GraduationCap, MapPin, School, Sparkles, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/Reveal/Reveal'
import { Section } from '@/components/Section/Section'
import { Tag } from '@/components/Tag/Tag'
import { profile } from '@/data/profile'

function Fact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value?: string }) {
  return (
    <div className="flex items-start gap-3.5 py-4 first:pt-0 last:pb-0">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-medium tracking-wide text-subtle uppercase">{label}</dt>
        <dd className={value ? 'mt-0.5 text-sm text-fg' : 'mt-0.5 text-sm text-subtle italic'}>
          {value ?? 'To be added'}
        </dd>
      </div>
    </div>
  )
}

export function About() {
  const { facts, bio, photo } = profile
  const factRows = [
    { icon: GraduationCap, label: 'Degree program', value: facts.degree },
    { icon: School, label: 'University', value: facts.university },
    { icon: Sparkles, label: 'Year level', value: facts.yearLevel },
    { icon: MapPin, label: 'Location', value: facts.location },
    { icon: Target, label: 'Professional goals', value: facts.goals },
    { icon: Compass, label: 'Focus', value: 'Web, backend, and database development' },
  ].filter((fact) => fact.value)

  return (
    <Section
      id="about"
      eyebrow="01 / About"
      title="A student who builds to learn"
      description="A little context on who I am and where I'm heading."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <Reveal className="space-y-5 text-base text-muted sm:text-lg">
          {bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="pt-2">
            <p className="mb-3 text-sm font-medium text-fg">Career interests</p>
            <ul className="flex flex-wrap gap-2">
              {facts.careerInterests.map((interest) => (
                <li key={interest}>
                  <Tag>{interest}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <dl className="card mt-8 divide-y divide-border p-6">
            {factRows.map((fact) => (
              <Fact key={fact.label} {...fact} />
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          {photo && (
            <figure className="card relative overflow-hidden">
              <img
                src={photo}
                alt="Portrait of Tyrone Fontanilla"
                width={600}
                height={750}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-black/55 px-4 py-2.5 text-sm text-white backdrop-blur-md">
                <span className="font-medium">Tyrone B. Fontanilla</span>
                <span className="font-mono text-xs text-white/70">BSIT</span>
              </figcaption>
            </figure>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
