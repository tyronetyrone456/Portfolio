import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CornerDownLeft, Download, Mail, Moon, Search, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { site } from '@/data/site'
import { socialLinks } from '@/data/socialLinks'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useResumeStatus } from '@/hooks/useResumeAvailable'
import { useTheme } from '@/hooks/useTheme'
import { cn, isExternalUrl, prefersReducedMotion } from '@/utils'
import { EASE } from '@/utils/motion'

interface Command {
  id: string
  label: string
  group: 'Go to' | 'Actions' | 'Links'
  icon: LucideIcon
  hint?: string
  run: () => void
}

const OPEN_EVENT = 'open-command-palette'

/** Lets any button open the palette without prop drilling. */
export function openCommandPalette(): void {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, toggleTheme } = useTheme()
  const resumeStatus = useResumeStatus()

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  useFocusTrap(panelRef, open, close)

  // Declared after the trap so it wins: the trap focuses the dialog, we then move into the search box.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  const commands = useMemo<Command[]>(() => {
    const goTo = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }
    const list: Command[] = navItems.map((item) => ({
      id: `go-${item.id}`,
      label: item.label,
      group: 'Go to',
      icon: ArrowUpRight,
      run: goTo(item.id),
    }))
    list.push({
      id: 'theme',
      label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
      group: 'Actions',
      icon: theme === 'dark' ? Sun : Moon,
      run: toggleTheme,
    })
    if (resumeStatus === 'available') {
      list.push({
        id: 'resume',
        label: 'Download resume',
        group: 'Actions',
        icon: Download,
        run: () => {
          const a = document.createElement('a')
          a.href = site.resume.path
          a.download = site.resume.downloadName
          a.click()
        },
      })
    }
    for (const link of socialLinks.filter((l) => l.url)) {
      list.push({
        id: `link-${link.id}`,
        label: link.kind === 'email' ? 'Send an email' : `Open ${link.label}`,
        group: 'Links',
        icon: link.kind === 'email' ? Mail : ArrowUpRight,
        hint: link.kind === 'email' ? site.contact.email : undefined,
        run: () => {
          if (isExternalUrl(link.url)) window.open(link.url, '_blank', 'noopener,noreferrer')
          else window.location.href = link.url
        },
      })
    }
    return list
  }, [theme, toggleTheme, resumeStatus])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands
  }, [commands, query])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const runCommand = (command: Command | undefined) => {
    if (!command) return
    close()
    // Let the dialog unlock page scroll before navigating.
    requestAnimationFrame(() => command.run())
  }

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      runCommand(results[active])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(event) => event.target === event.currentTarget && close()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="card w-full max-w-xl overflow-hidden bg-elev outline-none"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-subtle" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections and actions"
                aria-label="Search commands"
                className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-subtle"
              />
              <kbd className="hidden rounded-md border border-border-strong px-1.5 py-0.5 font-mono text-[11px] text-subtle sm:block">
                Esc
              </kbd>
            </div>

            <ul ref={listRef} role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-subtle">No results</li>}
              {results.map((command, index) => {
                const Icon = command.icon
                const showGroup = index === 0 || results[index - 1].group !== command.group
                const isActive = index === active
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && (
                      <p className="px-3 pt-3 pb-1.5 text-[11px] font-medium tracking-wider text-subtle uppercase">
                        {command.group}
                      </p>
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseMove={() => setActive(index)}
                      onClick={() => runCommand(command)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                        isActive ? 'bg-surface-2 text-fg' : 'text-muted',
                      )}
                    >
                      <Icon className={cn('size-4 shrink-0', isActive ? 'text-accent' : 'text-subtle')} aria-hidden />
                      <span className="flex-1 truncate">{command.label}</span>
                      {command.hint && <span className="truncate text-xs text-subtle">{command.hint}</span>}
                      {isActive && <CornerDownLeft className="size-3.5 shrink-0 text-subtle" aria-hidden />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
