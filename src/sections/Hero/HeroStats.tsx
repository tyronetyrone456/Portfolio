import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { certificates } from '@/data/certificates'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { prefersReducedMotion, selectPublished } from '@/utils'

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (prefersReducedMotion()) {
      node.textContent = String(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (value) => {
        node.textContent = String(Math.round(value))
      },
    })
    return () => controls.stop()
  }, [inView, to])

  return <span ref={ref}>0</span>
}

export function HeroStats() {
  const stats = [
    { label: 'Certificates', value: selectPublished(certificates).length },
    { label: 'Projects', value: selectPublished(projects).length },
    { label: 'Technologies', value: new Set(skillGroups.flatMap((g) => g.skills)).size },
  ].filter((stat) => stat.value > 0)

  return (
    <dl className="mt-10 flex max-w-md divide-x divide-border border-t border-border pt-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex-1 px-4 first:pl-0 last:pr-0">
          <dt className="text-xs font-medium tracking-wide text-subtle uppercase">{stat.label}</dt>
          <dd className="mt-1 font-display text-3xl font-semibold tabular-nums">
            <Counter to={stat.value} />
            <span className="text-accent">+</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
