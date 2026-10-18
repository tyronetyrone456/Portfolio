import { Container } from '@/components/Container/Container'
import { SocialIcon } from '@/components/Icons/BrandIcons'
import { navItems } from '@/data/navigation'
import { site } from '@/data/site'
import { socialLinks } from '@/data/socialLinks'
import { isExternalUrl } from '@/utils'

export function Footer() {
  const links = socialLinks.filter((link) => link.url)

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {links.length > 0 && (
          <ul className="flex gap-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  aria-label={link.label}
                  {...(isExternalUrl(link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="grid size-11 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent/60 hover:text-fg"
                >
                  <SocialIcon kind={link.kind} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
      <Container className="mt-8 flex flex-col gap-1 text-xs text-subtle sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </Container>
    </footer>
  )
}
