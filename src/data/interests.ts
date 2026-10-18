import { Blocks, Database, Globe, LifeBuoy, PenTool, Server } from 'lucide-react'
import type { Interest } from '@/types'

/** Areas of interest and growth, not claims of professional services. */
export const interests: Interest[] = [
  {
    id: 'web',
    title: 'Website Development',
    description: 'Crafting responsive, accessible interfaces with modern tooling.',
    icon: Globe,
  },
  {
    id: 'api',
    title: 'Backend API Development',
    description: 'Designing REST APIs and the server logic behind them.',
    icon: Server,
  },
  {
    id: 'db',
    title: 'Database Management',
    description: 'Modelling data and writing queries that stay clear and reliable.',
    icon: Database,
  },
  {
    id: 'uiux',
    title: 'Basic UI/UX Prototyping',
    description: 'Sketching and prototyping interfaces before writing code.',
    icon: PenTool,
  },
  {
    id: 'systems',
    title: 'System Development',
    description: 'Analyzing requirements and building complete, working systems.',
    icon: Blocks,
  },
  {
    id: 'support',
    title: 'Technical Support & Troubleshooting',
    description: 'Diagnosing problems methodically and explaining the fix.',
    icon: LifeBuoy,
  },
]
