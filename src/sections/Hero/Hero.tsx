import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { profile } from '@/data/profile'
import { site } from '@/data/site'
import { useResumeStatus } from '@/hooks/useResumeAvailable'
import { cn } from '@/utils'
import { EASE, fadeUp, stagger } from '@/utils/motion'
import { HeroStats } from './HeroStats'

const badgeTone = {
  neutral: 'bg-accent',
  open: 'bg-emerald-500',
  busy: 'bg-amber-500',
} as const

export function Hero() {
  const resumeStatus = useResumeStatus()
  const { photo, facts } = profile

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-20"
    >
      <div className="hero-wash" aria-hidden />

      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <motion.div className="min-w-0" variants={stagger(0.08, 0.05)} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted"
          >
            <span className="relative flex size-2" aria-hidden>
              <span className={cn('absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping', badgeTone[site.availability.tone])} />
              <span className={cn('relative inline-flex size-2 rounded-full', badgeTone[site.availability.tone])} />
            </span>
            {site.availability.label}
          </motion.p>

          <motion.h1
            id="home-title"
            variants={fadeUp}
            className="mt-6 font-display text-5xl leading-[1.04] font-semibold tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            {site.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 font-mono text-sm font-medium text-accent">
            {site.title}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-xl leading-snug font-medium text-fg sm:text-2xl">
            {site.headline}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            {site.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#projects" icon={ArrowRight}>
              View my projects
            </Button>
            {resumeStatus === 'available' && (
              <Button
                href={site.resume.path}
                download={site.resume.downloadName}
                variant="secondary"
                icon={Download}
                iconPosition="left"
              >
                Download resume
              </Button>
            )}
            <Button href="#contact" variant="ghost" icon={Mail} iconPosition="left">
              Contact me
            </Button>
          </motion.div>
        </motion.div>

        <motion.aside
          aria-label="Profile summary"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="mx-auto w-full max-w-sm min-w-0 lg:max-w-none"
        >
          <div className="card overflow-hidden">
            {photo && (
              <img
                src={photo}
                alt={`Portrait of ${site.name}`}
                width={600}
                height={560}
                className="aspect-[6/5] w-full object-cover object-top"
              />
            )}
            <div className="p-6">
              <p className="text-lg font-semibold tracking-tight">{site.name}</p>
              <p className="mt-0.5 text-sm text-muted">{facts.degree}</p>
              {facts.location && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-subtle">
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  {facts.location}
                </p>
              )}
              <HeroStats />
            </div>
          </div>
        </motion.aside>
      </Container>
    </section>
  )
}
