# Tyrone B. Fontanilla — Portfolio

React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide.
A static site: all content lives in `src/data/`.

## Run it

```bash
cd portfolio
npm install        # first time only
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Sample vs. published content

Entries marked `confirmed: false` are **samples**. They show (with a "Sample" badge) only in `npm run dev`
and are **never included in the production view**. To publish an item: edit it to be accurate and set `confirmed: true`.
Set `visible: false` to hide something without deleting it. If nothing is published, a clean empty state is shown.

## Customize (one file each)

| What | File |
| --- | --- |
| Name, headline, intro, availability badge, resume path, contact email / form endpoint, GitHub username | `src/data/site.ts` |
| About text, university, year level, location, goals | `src/data/profile.ts` |
| Skills (add/remove strings) | `src/data/skills.ts` |
| Projects | `src/data/projects.ts` |
| Coursera certificates | `src/data/certificates.ts` |
| Education / training / internship / freelance / volunteer | `src/data/education.ts` |
| Interests | `src/data/interests.ts` |
| GitHub repository showcase | `src/data/repositories.ts` |
| LinkedIn and other links | `src/data/socialLinks.ts` |

### Add a certificate
Add an object to `certificates` with `confirmed: true`. Use real data only. `credentialUrl` is the official verify link.
Optional: put an image/PDF in `public/certificates/` and set `image: '/certificates/name.png'` / `pdf`.
Search, category filters, sorting, the details modal, and "Load more" (9 per page) work automatically.

### Add a project
Add an object to `projects` with `confirmed: true`. `repoUrl` and `demoUrl` are optional and hidden when missing.
Screenshots go in `public/projects/` (`image: '/projects/name.png'`).

### Resume
Copy your PDF to `public/resume.pdf` (or change `site.resume.path`). The Download buttons, preview, and nav link
appear automatically when the file exists and are hidden otherwise.

### Contact form
No backend is bundled, and the form never claims to have sent anything it did not.
- Set `site.contact.email` → the form opens the visitor's email app pre-filled (mailto) and says so.
- Or set `site.contact.formEndpoint` (e.g. a Formspree URL) → the form posts JSON there and reports success/failure.
- With neither set, the form validates and then explains that messaging is not set up.
A hidden honeypot field drops basic bot submissions.

### Other
- GitHub section appears once `site.github.username` is set or a repository is confirmed. `showContributionGraph: true`
  adds a graph from a third-party image service (ghchart.rshah.org); it is off by default.
- Social/Open Graph image: `public/og-image.svg`. Many platforms need a PNG, so export a 1200×630 `og-image.png`
  and update the two `og:image`/`twitter:image` tags in `index.html`. Add `og:url` once you have a domain.
- Theme: dark by default, toggle saved in `localStorage`. Colors are CSS variables at the top of `src/styles/index.css`.
- `prefers-reduced-motion` is respected (Framer `MotionConfig` + CSS).

## Structure

```
src/
  components/   reusable UI (Button, Navbar, Modal, ProjectCard, CertificateCard, ...)
  sections/     page sections (Hero, About, Skills, Projects, Certificates, Journey, ...)
  data/         all editable content
  hooks/        theme, toast, scroll-spy, focus trap, resume check
  types/        shared TypeScript types
  utils/        helpers and motion presets
  styles/       global CSS and design tokens
```
