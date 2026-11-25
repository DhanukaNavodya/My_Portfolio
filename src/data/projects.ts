import type { Project } from '../types'

/**
 * Project showcase.
 *
 * These entries are SAMPLE projects that illustrate the supported categories and layout.
 * TODO: replace them with your real work. Remove `isSample`, then add:
 *   - `links.github` / `links.demo`  → buttons appear automatically (hidden while undefined)
 *   - `image: '/images/projects/<file>.webp'` → replaces the generated visual preview
 *   - `featured: true` → large cinematic layout (first two featured projects)
 */
export const projects: Project[] = [
  {
    id: 'enterprise-suite',
    name: 'Enterprise Operations Suite',
    category: 'Enterprise Applications',
    summary: 'A modular back-office platform for approvals, reporting and role-based workflows.',
    description:
      'Example of a multi-tenant enterprise application: configurable workflow engine, granular role-based access control, audit trails, and a reporting dashboard backed by a REST API.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    highlights: ['Role-based access control', 'Configurable approval workflows', 'Audit logging'],
    links: {},
    featured: true,
    isSample: true,
  },
  {
    id: 'hr-platform',
    name: 'People & HR Management',
    category: 'HR Management Systems',
    summary: 'Employee lifecycle, leave, attendance and payroll-ready exports in one place.',
    description:
      'Example of an HR management system covering onboarding, leave and attendance tracking, organisational charts and payroll-ready exports with a clean self-service portal.',
    stack: ['Next.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
    highlights: ['Leave & attendance tracking', 'Self-service employee portal', 'Org chart visualisation'],
    links: {},
    featured: true,
    isSample: true,
  },
  {
    id: 'retail-pos',
    name: 'Retail POS Terminal',
    category: 'POS Systems',
    summary: 'Fast checkout, inventory sync and offline-first sales for retail counters.',
    description:
      'Example of a point-of-sale system with barcode checkout, inventory synchronisation, receipt printing and an offline-first queue that reconciles when connectivity returns.',
    stack: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    highlights: ['Offline-first sales queue', 'Inventory sync', 'Shift & cash reports'],
    links: {},
    isSample: true,
  },
  {
    id: 'order-services',
    name: 'Order Processing Services',
    category: 'Microservices',
    summary: 'Event-driven services for orders, payments and notifications.',
    description:
      'Example of a microservice architecture: independently deployable order, payment and notification services communicating through events, each with its own datastore and API documentation.',
    stack: ['Node.js', 'Docker', 'PostgreSQL', 'Swagger'],
    highlights: ['Event-driven communication', 'Service-level OpenAPI docs', 'Containerised deploys'],
    links: {},
    isSample: true,
  },
  {
    id: 'ml-insights',
    name: 'Demand Forecasting Insights',
    category: 'AI & Machine Learning',
    summary: 'A Python model service that forecasts demand and surfaces it in a dashboard.',
    description:
      'Example of an applied ML project: a Python forecasting service exposed through an API, with a lightweight dashboard that compares predictions against actuals.',
    stack: ['Python', 'REST APIs', 'React', 'PostgreSQL'],
    highlights: ['Forecasting pipeline', 'Model-serving API', 'Prediction vs actual charts'],
    links: {},
    isSample: true,
  },
  {
    id: 'cloud-pipeline',
    name: 'Cloud Delivery Pipeline',
    category: 'Cloud & DevOps',
    summary: 'Infrastructure and CI/CD that takes a commit to production safely.',
    description:
      'Example of a cloud & DevOps setup: containerised services, automated test and build stages with GitHub Actions, and environment promotion on AWS.',
    stack: ['AWS', 'Docker', 'GitHub Actions', 'Linux'],
    highlights: ['Automated test → build → deploy', 'Environment promotion', 'Container images'],
    links: {},
    isSample: true,
  },
]
