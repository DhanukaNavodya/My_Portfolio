import type { Experience } from '../types'

/**
 * Professional experience timeline (most recent first).
 *
 * TODO: these are SAMPLE entries showing the supported fields — replace them with your real
 * roles and remove `isSample`. Dates use `yyyy-mm`; omit `end` for a current role.
 * "Years of Experience" in the About section is derived from the earliest `start` date.
 */
export const experiences: Experience[] = [
  {
    id: 'role-current',
    company: 'Company Name',
    position: 'Software Engineer',
    period: { start: '2023-01' },
    employmentType: 'Full-time',
    summary: 'Describe the product, the team and your scope in one or two sentences.',
    responsibilities: [
      'Build and maintain full-stack features across the web client and REST services.',
      'Design database schemas and write performant queries.',
      'Review pull requests and contribute to CI/CD pipelines.',
    ],
    achievements: ['Add a measurable outcome here, e.g. a performance or reliability improvement.'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    isSample: true,
  },
  {
    id: 'role-previous',
    company: 'Company Name',
    position: 'Associate / Intern Software Engineer',
    period: { start: '2022-01', end: '2022-12' },
    employmentType: 'Internship',
    summary: 'Describe what you worked on and what you learned.',
    responsibilities: [
      'Implemented UI components and integrated them with backend APIs.',
      'Wrote unit and integration tests for new features.',
    ],
    achievements: ['Add a concrete contribution you are proud of.'],
    stack: ['JavaScript', 'Express.js', 'MySQL', 'Git'],
    isSample: true,
  },
]
