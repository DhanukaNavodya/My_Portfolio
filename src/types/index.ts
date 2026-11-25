import type { IconType } from 'react-icons'

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export interface SocialLink {
  label: string
  href: string
  icon: IconType
  /** Short handle shown next to the link, e.g. "@username" */
  handle?: string
}

/** `auto` derives the number from the other data files instead of hard-coding it. */
export type StatSource = number | 'auto:years' | 'auto:projects' | 'auto:technologies'

export interface Stat {
  label: string
  value: StatSource
  suffix?: string
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  role: string
  greeting: string
  /** Large hero heading, one entry per line. */
  headline: string[]
  photo: { src: string; srcSmall?: string; alt: string }
  tagline: string
  email: string
  location?: string
  availability?: string
  resumeUrl?: string
  socials: SocialLink[]
  about: {
    headline: string
    intro: string
    background: string
    interests: string[]
    goals: string
    philosophy: { title: string; body: string }[]
  }
  stats: Stat[]
}

export type SkillCategoryId = 'frontend' | 'backend' | 'database' | 'devops' | 'tools'

export interface Skill {
  name: string
  icon: IconType
  /** 1–5. Rendered only when `skillsConfig.showLevels` is true. */
  level: number
  /** Brand-ish colour used for the icon glow; falls back to the accent. */
  color?: string
}

export interface SkillCategory {
  id: SkillCategoryId
  label: string
  description: string
  skills: Skill[]
}

export type ProjectCategory =
  | 'Enterprise Applications'
  | 'HR Management Systems'
  | 'POS Systems'
  | 'Microservices'
  | 'AI & Machine Learning'
  | 'Cloud & DevOps'

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  summary: string
  description: string
  stack: string[]
  highlights: string[]
  /** Optional screenshot path (e.g. /images/projects/pos.webp). A generated visual is used when absent. */
  image?: string
  links: { github?: string; demo?: string }
  featured?: boolean
  year?: string
  /** Marks example content that should be replaced with real work. Shows a small "Sample" tag. */
  isSample?: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  period: { start: string; end?: string } // ISO yyyy-mm; no end = present
  location?: string
  employmentType?: string
  summary: string
  responsibilities: string[]
  achievements: string[]
  stack: string[]
  isSample?: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  field?: string
  period: { start: string; end?: string }
  description?: string
  highlights?: string[]
  isSample?: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credentialUrl?: string
  kind: 'certification' | 'training'
  isSample?: boolean
}
