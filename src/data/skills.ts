import { Braces, Database, Layers, Lightbulb, Wrench } from 'lucide-react'
import type { SkillGroup } from '@/types'

/** Add or remove strings freely. No proficiency levels are claimed. */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: Braces,
    skills: ['Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    icon: Layers,
    skills: ['Django', 'Flask', 'React', 'Bootstrap', 'Node.js', 'Express.js'],
  },
  {
    id: 'backend',
    title: 'Database & Backend',
    icon: Database,
    skills: ['MySQL', 'MongoDB', 'REST API Development', 'CRUD Operations', 'Database Design'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: [
      'Git',
      'GitHub',
      'Visual Studio Code',
      'Postman / Thunder Client',
      'Figma',
      'Linux & Ubuntu',
    ],
  },
  {
    id: 'other',
    title: 'Other IT Skills',
    icon: Lightbulb,
    skills: [
      'Responsive Web Design',
      'UI/UX Fundamentals',
      'Software Development',
      'Debugging & Troubleshooting',
      'Technical Documentation',
      'System Analysis & Design',
    ],
  },
]
