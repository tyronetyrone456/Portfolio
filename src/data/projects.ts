import type { Project } from '@/types'

/**
 * HOW TO ADD A PROJECT
 *  1. Copy an entry and give it a unique `id`.
 *  2. Set `confirmed: true` once you have really built it. Until then it is
 *     treated as a sample and only appears in `npm run dev`.
 *  3. Add `repoUrl` / `demoUrl` only if they exist. Missing links are hidden.
 *  4. Optional screenshot: drop it in /public/projects and set `image`.
 * Set `visible: false` to hide a project without deleting it.
 *
 * The entries below are EDITABLE SAMPLES. Edit the stack and details to match
 * what you actually built.
 */
export const projects: Project[] = [
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
  {
    id: 'retail-inventory-system',
    title: 'Retail Inventory Management System',
    summary: 'Manage products, inventory, orders, customers, and sales in one place.',
    description:
      'A retail management application for tracking stock levels alongside the orders, customers, and sales that affect them.',
    category: 'Web Development',
    stack: ['Django', 'Python', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Product and stock tracking',
      'Order management',
      'Customer records',
      'Sales overview',
    ],
    confirmed: false,
  },
  {
    id: 'warehouse-management-system',
    title: 'Warehouse Management System',
    summary:
      'A database-driven app for products, suppliers, customers, employees, deliveries, and payments.',
    description:
      'A relational, database-driven application that models the day-to-day operations of a warehouse, from suppliers to deliveries and payments.',
    category: 'Database Systems',
    stack: ['Flask', 'SQL', 'Bootstrap', 'JavaScript'],
    features: [
      'Supplier and customer records',
      'Employee management',
      'Delivery tracking',
      'Payment records',
    ],
    confirmed: false,
  },
  {
    id: 'student-enrollment-system',
    title: 'Student Enrollment Management System',
    summary: 'A student information and enrollment app with CRUD operations and an API.',
    description:
      'A student information system with enrollment workflows, built around CRUD operations and exposed through API endpoints.',
    category: 'Academic Projects',
    stack: ['Django', 'Python', 'Relational database'],
    features: ['Student records (CRUD)', 'Enrollment management', 'API endpoints'],
    confirmed: false,
  },
  {
    id: 'expense-tracker-api',
    title: 'Expense Tracker API',
    summary: 'A REST API for managing and tracking expenses.',
    description:
      'A backend service that exposes REST endpoints for recording, updating, and reviewing expenses.',
    category: 'Backend Development',
    stack: ['Node.js', 'Express.js', 'MongoDB'],
    features: [
      'REST API endpoints',
      'Create, read, update, delete expenses',
      'MongoDB persistence',
    ],
    confirmed: false,
  },
  {
    id: 'responsive-ecommerce',
    title: 'Responsive E-Commerce Website',
    summary: 'A responsive online store with product listings, search, and category filters.',
    description:
      'A storefront interface focused on browsing: product listings, search, category filtering, and product detail views that adapt to any screen size.',
    category: 'Web Development',
    stack: ['React', 'JavaScript', 'HTML', 'CSS'],
    features: ['Product listings', 'Search', 'Category filters', 'Product details'],
    confirmed: false,
  },
  {
    id: 'room-rate-calculator',
    title: 'Room Rate Calculator',
    summary: 'A booking cost calculator with room types and automatic totals.',
    description:
      'A small booking tool that applies pricing rules to different room types and calculates the total automatically.',
    category: 'Web Development',
    stack: ['React', 'JavaScript'],
    features: ['Room types', 'Pricing rules', 'Automatic total calculation'],
    confirmed: false,
  },
]
