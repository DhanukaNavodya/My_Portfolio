import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { LuMail } from 'react-icons/lu'
import type { NavItem, PersonalInfo } from '../types'

/**
 * Personal information — the only place your name, links and bio live.
 *
 * TODO (before publishing): replace every value marked `TODO` with your real details.
 * Statistics marked `auto:*` are computed from the other data files, so they stay honest.
 */
export const personal: PersonalInfo = {
  firstName: 'Dhanuka',
  lastName: 'Navodya',
  role: 'Software Engineer',
  greeting: "Hey, I'm",
  headline: ['Software Engineer', '& Full-Stack Developer'],
  photo: {
    src: '/images/profile.webp',
    srcSmall: '/images/profile-480.webp',
    alt: 'Portrait of Dhanuka Navodya',
  },
  tagline:
    'Building scalable digital experiences through clean code, creative engineering, and modern technologies.',

  email: 'hello@example.com', // TODO: your real email address
  location: undefined, // TODO: e.g. 'Colombo, Sri Lanka' — hidden while undefined
  availability: 'Open to new opportunities',
  resumeUrl: undefined, // TODO: e.g. '/resume.pdf' (put the file in /public) — button hidden while undefined

  socials: [
    // TODO: point these at your real profiles
    { label: 'GitHub', href: 'https://github.com/', icon: FaGithub, handle: 'github.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: FaLinkedinIn, handle: 'linkedin.com' },
    { label: 'Email', href: 'mailto:hello@example.com', icon: LuMail, handle: 'hello@example.com' },
  ],

  about: {
    headline: 'I engineer software that scales quietly and feels effortless to use.',
    intro:
      'I am a software engineer who enjoys the full journey of a product — from shaping the data model and the API contract to polishing the last interaction on screen.',
    background:
      'My work sits across the stack: React and TypeScript on the front, Node.js and Python services on the back, relational and document databases underneath, and containerised deployments on the cloud. I care about systems that stay maintainable long after the first release.',
    interests: [
      'Distributed systems & microservices',
      'Interactive 3D on the web',
      'Developer experience & tooling',
      'Applied machine learning',
      'Cloud-native infrastructure',
    ],
    goals:
      'I want to keep growing into a product-minded engineer who leads technical direction — building platforms that teams can confidently extend and users genuinely enjoy.',
    philosophy: [
      {
        title: 'Clarity over cleverness',
        body: 'Readable code is a feature. I optimise for the next engineer who opens the file.',
      },
      {
        title: 'Measure, then optimise',
        body: 'Performance work starts with a profiler, not a hunch — and ends with a number.',
      },
      {
        title: 'Ship in small, safe steps',
        body: 'Automated tests and CI/CD turn big launches into a series of boring, reversible changes.',
      },
    ],
  },

  stats: [
    { label: 'Years of Experience', value: 'auto:years', suffix: '+' },
    { label: 'Projects Completed', value: 'auto:projects', suffix: '+' },
    { label: 'Technologies Used', value: 'auto:technologies', suffix: '' },
  ],
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const fullName = `${personal.firstName} ${personal.lastName}`
