import { motion } from 'framer-motion'
import { Award, Download, FolderGit2, Mail } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { site } from '@/data/site'
import { useResumeStatus } from '@/hooks/useResumeAvailable'
import { cn } from '@/utils'
import { fadeUp, stagger } from '@/utils/motion'
import { HeroTerminal } from './HeroTerminal'

const badgeTone = {
  neutral: 'bg-accent',
  open: 'bg-emerald-500',
  busy: 'bg-amber-500',
} as const

export function Hero() {
  const resumeStatus = useResumeStatus()
  const nameParts = site.name.split(' ')
  const lastName = nameParts.pop()
  const leadingNames = nameParts.join(' ')

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative flex min-h-dvh items-center overflow-hidden pt-24 pb-24 sm:pb-28"
    >
      <div className="glow glow-a" aria-hidden />
      <div className="glow glow-b" aria-hidden />

      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div className="min-w-0" variants={stagger(0.1, 0.1)} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted"
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
            className="mt-6 font-display text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {leadingNames} <span className="gradient-text">{lastName}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 font-mono text-sm text-accent sm:text-base">
            {site.title}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-display text-2xl leading-snug font-medium text-fg sm:text-3xl"
          >
            {site.headline}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base text-muted sm:text-lg">
            {site.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#projects" icon={FolderGit2}>
              View My Projects
            </Button>
            <Button href="#certificates" variant="secondary" icon={Award}>
              Explore My Certificates
            </Button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {resumeStatus === 'available' && (
              <Button
                href={site.resume.path}
                download={site.resume.downloadName}
                variant="ghost"
                icon={Download}
                iconPosition="left"
              >
                Download Resume
              </Button>
            )}
            <Button href="#contact" variant="ghost" icon={Mail} iconPosition="left">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        <HeroTerminal />
      </Container>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="scroll-hint absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-subtle transition-colors hover:text-fg sm:flex"
      >
        Scroll
        <span className="flex h-9 w-6 justify-center rounded-full border border-border-strong pt-2" aria-hidden>
          <span className="scroll-dot block h-1.5 w-1 rounded-full bg-accent" />
        </span>
      </a>
    </section>
  )
}
