import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Database, GitBranch, Globe, Terminal } from 'lucide-react'
import { profile } from '@/data/profile'
import { site } from '@/data/site'
import { EASE } from '@/utils/motion'

/** One line of the code card: [indent level, tokens]. */
const k = (t: string) => <span className="text-violet-700 dark:text-violet-300">{t}</span>
const s = (t: string) => <span className="text-emerald-700 dark:text-emerald-300">{t}</span>
const p = (t: string) => <span className="text-sky-700 dark:text-sky-300">{t}</span>
const m = (t: string) => <span className="text-subtle">{t}</span>

const lines: Array<[number, ReactNode]> = [
  [0, <>{k('const')} developer = {'{'}</>],
  [1, <>{p('name')}: {s('"Tyrone B. Fontanilla"')},</>],
  [1, <>{p('program')}: {s('"BSIT"')},</>],
  [1, <>{p('languages')}: [{s('"Python"')}, {s('"JavaScript"')}, {s('"SQL"')}],</>],
  [1, <>{p('focus')}: [{s('"Web"')}, {s('"Backend"')}, {s('"Databases"')}],</>],
  [1, <>{p('learning')}: {k('true')},</>],
  [0, <>{'}'}</>],
]

const chips = [
  { icon: Globe, label: 'Web', className: '-top-5 -left-3 sm:-left-8', delay: 0 },
  { icon: Database, label: 'SQL', className: 'top-1/3 -right-3 sm:-right-8', delay: 1.2 },
  { icon: GitBranch, label: 'Git', className: '-bottom-6 right-8 sm:right-12', delay: 0.6 },
]

export function HeroTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
      className="relative mx-auto w-full min-w-0 max-w-md lg:max-w-none"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="card relative overflow-hidden"
      >
        <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
          <span className="size-2.5 rounded-full bg-rose-400/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-amber-400/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-emerald-400/80" aria-hidden />
          <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-subtle">
            <Terminal className="size-3.5" aria-hidden />
            developer.ts
          </span>
        </div>
        <pre
          className="overflow-x-auto p-5 font-mono text-[13px] leading-7 lg:text-xs xl:text-sm"
          aria-label="Code snippet describing the developer"
        >
          <code className="block">
            {lines.map(([indent, content], i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.4 }}
                className="flex"
              >
                <span className="w-6 shrink-0 text-right text-subtle/70 select-none" aria-hidden>
                  {i + 1}
                </span>
                <span className="ml-4 whitespace-pre" style={{ paddingLeft: `${indent * 1.5}rem` }}>
                  {content}
                </span>
              </motion.span>
            ))}
            <span className="flex">
              <span className="w-6 shrink-0 text-right text-subtle/70 select-none" aria-hidden>
                {lines.length + 1}
              </span>
              <span className="caret ml-4 inline-block h-5 w-2 translate-y-1 bg-accent" aria-hidden />
            </span>
          </code>
        </pre>
        <p className="border-t border-border px-5 py-3 font-mono text-xs">
          {m('// always learning, always building')}
        </p>
      </motion.div>

      {profile.photo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="absolute -top-14 right-4 size-24 sm:right-8 lg:-top-28 lg:size-36"
        >
          <span className="ring-spin absolute -inset-[3px] rounded-full" aria-hidden />
          <img
            src={profile.photo}
            alt={`Portrait of ${site.name}`}
            width={144}
            height={144}
            className="relative size-full rounded-full border-4 border-bg object-cover object-top"
          />
        </motion.div>
      )}

      {chips.map(({ icon: Icon, label, className, delay }) => (
        <motion.span
          key={label}
          aria-hidden
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
          className={`absolute ${className} flex items-center gap-1.5 rounded-xl border border-border-strong bg-elev px-3 py-2 font-mono text-xs text-fg shadow-lg`}
        >
          <Icon className="size-3.5 text-accent" />
          {label}
        </motion.span>
      ))}
    </motion.div>
  )
}
