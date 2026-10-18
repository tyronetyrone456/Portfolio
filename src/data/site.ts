/**
 * Global identity and feature configuration.
 * Edit values here; leave a string empty to switch that feature off.
 */
export const site = {
  name: 'Tyrone B. Fontanilla',
  initials: 'TF',
  title: 'IT Student | Aspiring Software Developer',
  headline: 'Building Digital Solutions Through Code and Creativity.',
  intro:
    "I'm a BSIT student passionate about web development, software development, and exploring technologies that solve real-world problems. I enjoy building projects, learning new tools, and continuously improving my technical skills.",

  /**
   * Small badge in the hero. Only change the label if it is true, e.g.
   * "Open to internships" with tone "open". Tones: neutral | open | busy.
   */
  availability: {
    label: 'BSIT student · Always learning',
    tone: 'neutral' as 'neutral' | 'open' | 'busy',
  },

  /** Sample (unconfirmed) projects/certificates/repos show only in `npm run dev`. */
  showSamples: import.meta.env.DEV,

  /** Put your PDF in /public and point to it here. Buttons hide if it is missing. */
  resume: {
    path: '/resume.pdf',
    downloadName: 'Tyrone-Fontanilla-Resume.pdf',
  },

  contact: {
    /** Public contact email. Leave empty until you want it shown. */
    email: 'tyronetyrone456@gmail.com',
    /**
     * Optional form backend (e.g. a Formspree URL: https://formspree.io/f/xxxx).
     * Empty = the form falls back to opening your email app via mailto.
     */
    formEndpoint: '',
  },

  github: {
    /** Your GitHub username (no URL). Empty hides profile links and the graph. */
    username: 'tyronetyrone456',
    /** Uses a third-party image service; only enabled when a username is set. */
    showContributionGraph: false,
  },
}
