import type { Project } from '@/types'

/**
 * HOW TO ADD A PROJECT
 *  1. Copy an entry and give it a unique `id`.
 *  2. Set `confirmed: true` once you have really built it. Until then it is
 *     treated as a sample and only appears in `npm run dev`.
 *  3. Add `repoUrl` / `demoUrl` only if they exist. Missing links are hidden.
 *  4. Optional screenshot: drop it in /public/projects and set `image`.
 * Set `visible: false` to hide a project without deleting it.
 */
export const projects: Project[] = [
  {
    id: 'bookshelf-app',
    title: 'BookShelf: Personal Reading Tracker',
    summary: 'An Android app for tracking the books you want to read, are reading, and have finished.',
    description:
      'BookShelf is a native Android app that lets readers build a personal library, track reading progress page by page, rate and favorite books, and search their collection. Data is stored on the device with Room, and each user has their own account and profile.',
    category: 'Mobile Development',
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'Navigation Compose', 'MVVM'],
    features: [
      'User registration, login, and profile editing',
      'Add books with genre, rating, and synopsis',
      'Reading status: Want to Read, Reading, Completed',
      'Page-by-page progress tracking',
      'Favorites and search by title, author, or genre',
      'Local storage with Room',
    ],
    confirmed: true,
  },
  {
    id: 'academic-advising-scheduler',
    title: 'AdviSched: Academic Advising and Consultation Scheduling',
    summary: 'A cross-platform app for booking consultations between students and faculty advisers.',
    description:
      'AdviSched lets students schedule consultations with faculty advisers, while advisers manage their availability and appointments. It runs as a web app and a mobile app from one Expo codebase, backed by a Django REST API.',
    category: 'Academic Projects',
    stack: ['React Native', 'Expo', 'TypeScript', 'NativeWind', 'Django', 'Django REST Framework', 'PostgreSQL'],
    features: [
      'Appointment booking',
      'Faculty availability management',
      'Meetings and consultation tracking',
      'Push notifications',
      'Activity logs',
      'PDF and Excel export',
    ],
    image: '/projects/advisched.jpg',
    repoUrl: 'https://github.com/tyronetyrone456/AdviSched',
    demoUrl: 'https://advi-sched.vercel.app/',
    confirmed: true,
  },
]
