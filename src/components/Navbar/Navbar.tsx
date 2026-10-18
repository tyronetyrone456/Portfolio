import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { navItems, resolveNavId, sectionIds } from '@/data/navigation'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useResumeStatus } from '@/hooks/useResumeAvailable'
import { cn } from '@/utils'
import { EASE } from '@/utils/motion'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const activeId = resolveNavId(activeSection)
  const resumeStatus = useResumeStatus()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        solid
          ? 'border-border bg-bg/80 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-display font-semibold tracking-tight"
          aria-label={`${site.name}, back to top`}
        >
          <span className="grid size-9 place-items-center rounded-lg border border-border-strong bg-surface font-mono text-sm text-accent transition-colors group-hover:border-accent/60">
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = item.id === activeId
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                      active ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-surface-2"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {resumeStatus === 'available' && (
            <Button
              href={site.resume.path}
              download={site.resume.downloadName}
              variant="secondary"
              size="sm"
              icon={Download}
              iconPosition="left"
              className="hidden lg:inline-flex"
            >
              Resume
            </Button>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:text-fg lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <Container className="pt-3 pb-5">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {navItems.map((item) => {
                    const active = item.id === activeId
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? 'location' : undefined}
                          className={cn(
                            'flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-medium transition-colors',
                            active ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg',
                          )}
                        >
                          {item.label}
                          {active && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              {resumeStatus === 'available' && (
                <Button
                  href={site.resume.path}
                  download={site.resume.downloadName}
                  icon={Download}
                  iconPosition="left"
                  className="mt-4 w-full"
                >
                  Download Resume
                </Button>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
