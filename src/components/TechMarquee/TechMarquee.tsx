import { skillGroups } from '@/data/skills'

const items = Array.from(new Set(skillGroups.flatMap((group) => group.skills)))

/** Infinite, pausable ticker of the stack. Duplicated once so the loop is seamless. */
export function TechMarquee() {
  return (
    <div
      className="marquee relative border-y border-border bg-elev/40 py-4 backdrop-blur-sm"
      role="region"
      aria-label="Technologies"
    >
      <ul className="marquee-track flex w-max items-center gap-10 font-mono text-sm text-muted" aria-hidden>
        {[...items, ...items].map((item, i) => (
          <li key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="transition-colors hover:text-fg">{item}</span>
            <span className="size-1 rounded-full bg-accent/60" />
          </li>
        ))}
      </ul>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
