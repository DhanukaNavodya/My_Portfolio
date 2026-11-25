import type { Certification, Education } from '../types'

/**
 * Education, certifications and professional training.
 * TODO: these are SAMPLE entries — replace with your real education and credentials,
 * then remove `isSample`. Add `credentialUrl` to show a "Verify" link.
 */
export const education: Education[] = [
  {
    id: 'degree',
    institution: 'University Name',
    degree: 'Bachelor of Science (Hons)',
    field: 'Software Engineering',
    period: { start: '2019-01', end: '2023-01' },
    description: 'Summarise your focus areas, final-year project or notable coursework.',
    highlights: ['Software architecture', 'Data structures & algorithms', 'Distributed systems'],
    isSample: true,
  },
]

export const certifications: Certification[] = [
  {
    id: 'cert-cloud',
    name: 'Cloud certification name',
    issuer: 'Issuing organisation',
    date: '2024',
    kind: 'certification',
    isSample: true,
  },
  {
    id: 'cert-devops',
    name: 'DevOps / container certification name',
    issuer: 'Issuing organisation',
    date: '2024',
    kind: 'certification',
    isSample: true,
  },
  {
    id: 'training-1',
    name: 'Professional training or bootcamp',
    issuer: 'Provider',
    date: '2023',
    kind: 'training',
    isSample: true,
  },
]
