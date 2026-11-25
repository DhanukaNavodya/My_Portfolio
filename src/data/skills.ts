import { FaAws } from 'react-icons/fa6'
import { LuBoxes, LuInfinity, LuWaypoints } from 'react-icons/lu'
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import type { SkillCategory } from '../types'

/** Toggle skill-level visualisation and edit the scale labels here. */
export const skillsConfig = {
  showLevels: true,
  levelLabels: ['Familiar', 'Working', 'Proficient', 'Advanced', 'Expert'] as const,
}

/**
 * Technology showcase. `level` is 1–5 — TODO: tune these to your honest self-assessment.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Accessible, performant interfaces with modern component architecture.',
    skills: [
      { name: 'React', icon: SiReact, level: 4, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, level: 4, color: 'var(--color-fg)' },
      { name: 'JavaScript', icon: SiJavascript, level: 4, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, level: 4, color: '#3178C6' },
      { name: 'HTML', icon: SiHtml5, level: 5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, level: 4, color: '#663399' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 4, color: '#38BDF8' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'Service design, clean APIs and resilient business logic.',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 4, color: '#5FA04E' },
      { name: 'Express.js', icon: SiExpress, level: 4, color: 'var(--color-fg)' },
      { name: 'Python', icon: SiPython, level: 3, color: '#FFD43B' },
      { name: 'REST APIs', icon: LuWaypoints, level: 4 },
      { name: 'Microservices', icon: LuBoxes, level: 3 },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    description: 'Relational and document data modelling, indexing and query tuning.',
    skills: [
      { name: 'MySQL', icon: SiMysql, level: 4, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, level: 4, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 3, color: '#4169E1' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    description: 'Containerised delivery pipelines and cloud infrastructure.',
    skills: [
      { name: 'AWS', icon: FaAws, level: 3, color: '#FF9900' },
      { name: 'Docker', icon: SiDocker, level: 4, color: '#2496ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, level: 3, color: '#2088FF' },
      { name: 'CI/CD', icon: LuInfinity, level: 3 },
      { name: 'Linux', icon: SiLinux, level: 3, color: '#FCC624' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    description: 'The daily toolkit for collaboration, testing and documentation.',
    skills: [
      { name: 'Git', icon: SiGit, level: 4, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, level: 4, color: 'var(--color-fg)' },
      { name: 'Postman', icon: SiPostman, level: 4, color: '#FF6C37' },
      { name: 'Swagger', icon: SiSwagger, level: 3, color: '#85EA2D' },
      { name: 'VS Code', icon: VscVscode, level: 5, color: '#22A6F2' },
    ],
  },
]

export const allSkills = skillCategories.flatMap((c) => c.skills)
