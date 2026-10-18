/**
 * Personal facts for the About section.
 * Anything left `undefined` renders as a "To be added" placeholder.
 */
export const profile = {
  bio: [
    "I'm pursuing a Bachelor of Science in Information Technology, and I like turning ideas into working software. I'm building my skills through academic projects, hands-on programming, online courses, and certifications. Each one is a chance to learn a new tool or sharpen a habit.",
    'I\'m drawn to web development, backend systems, and database design. I enjoy understanding how the pieces of a system fit together, from the interface people see to the data underneath.',
  ],
  facts: {
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    university: undefined as string | undefined,
    yearLevel: undefined as string | undefined,
    location: undefined as string | undefined,
    careerInterests: [
      'Web development',
      'Software development',
      'Backend & APIs',
      'Database systems',
    ],
    goals: undefined as string | undefined,
  },
}
