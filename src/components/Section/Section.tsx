import type { ReactNode } from 'react'
import { Container } from '@/components/Container/Container'
import { SectionHeading } from '@/components/SectionHeading/SectionHeading'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
}

/** Standard page section: divider, container, and animated heading. */
export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className="relative py-20 sm:py-28">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <Container>
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} description={description} />
        {children}
      </Container>
    </section>
  )
}
