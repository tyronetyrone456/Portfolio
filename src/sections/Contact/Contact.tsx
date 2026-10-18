import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { SocialIcon } from '@/components/Icons/BrandIcons'
import { Reveal } from '@/components/Reveal/Reveal'
import { Section } from '@/components/Section/Section'
import { site } from '@/data/site'
import { socialLinks } from '@/data/socialLinks'
import { useToast } from '@/hooks/useToast'
import { isExternalUrl } from '@/utils'
import { ContactForm } from './ContactForm'

const rowClass =
  'flex min-h-14 items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3'

export function Contact() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const email = site.contact.email

  // Email, GitHub, and LinkedIn always get a row; other configured links follow.
  const core = (['email', 'github', 'linkedin'] as const).map(
    (kind) => socialLinks.find((l) => l.kind === kind) ?? { id: kind, kind, label: kind, url: '' },
  )
  const extras = socialLinks.filter((l) => l.kind === 'other' && l.url)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast('Email address copied.', 'success')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast('Could not copy automatically. Please copy it manually.', 'error')
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="09 / Contact"
      title="Let's connect"
      description="Questions, opportunities, or just want to talk tech? I'd like to hear from you."
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <ul className="space-y-3">
            {[...core, ...extras].map((link) => {
              const label = link.kind === 'email' ? 'Email' : link.label
              const value = link.kind === 'email' ? email : link.url.replace(/^https?:\/\/(www\.)?/, '')
              return (
                <li key={link.id} className="flex items-center gap-2">
                  {link.url ? (
                    <a
                      href={link.url}
                      {...(isExternalUrl(link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`${rowClass} flex-1 transition-colors hover:border-accent/60`}
                    >
                      <SocialIcon kind={link.kind} className="size-5 shrink-0 text-accent" />
                      <span className="min-w-0">
                        <span className="block text-xs text-subtle">{label}</span>
                        <span className="block truncate text-sm">{value}</span>
                      </span>
                    </a>
                  ) : (
                    <div className={`${rowClass} flex-1 border-dashed`}>
                      <SocialIcon kind={link.kind} className="size-5 shrink-0 text-subtle" />
                      <span className="min-w-0">
                        <span className="block text-xs text-subtle">{label}</span>
                        <span className="block text-sm text-subtle italic">Coming soon</span>
                      </span>
                    </div>
                  )}
                  {link.kind === 'email' && email && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="grid size-14 shrink-0 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent/60 hover:text-fg"
                    >
                      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  )
}
