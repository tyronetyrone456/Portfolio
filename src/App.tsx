import { MotionConfig } from 'framer-motion'
import { CommandPalette } from '@/components/CommandPalette/CommandPalette'
import { Footer } from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'
import { PointerFx } from '@/components/PointerFx/PointerFx'
import { ScrollProgress } from '@/components/ScrollProgress/ScrollProgress'
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop'
import { TechMarquee } from '@/components/TechMarquee/TechMarquee'
import { ThemeProvider } from '@/hooks/useTheme'
import { ToastProvider } from '@/hooks/useToast'
import { About } from '@/sections/About/About'
import { Certificates } from '@/sections/Certificates/Certificates'
import { Contact } from '@/sections/Contact/Contact'
import { GitHub } from '@/sections/GitHub/GitHub'
import { Hero } from '@/sections/Hero/Hero'
import { Interests } from '@/sections/Interests/Interests'
import { Journey } from '@/sections/Journey/Journey'
import { Projects } from '@/sections/Projects/Projects'
import { Skills } from '@/sections/Skills/Skills'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        {/* "user" disables transform/layout animation for people who prefer reduced motion. */}
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only z-[100] rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
          >
            Skip to content
          </a>
          <div className="bg-grid" aria-hidden />
          <PointerFx />
          <ScrollProgress />
          <Navbar />
          <CommandPalette />
          <main id="main">
            <Hero />
            <TechMarquee />
            <About />
            <Skills />
            <Projects />
            <Certificates />
            <Journey />
            <Interests />
            <GitHub />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </MotionConfig>
      </ToastProvider>
    </ThemeProvider>
  )
}
