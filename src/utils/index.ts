import { allSkills } from '../data/skills'
import { experiences } from '../data/experience'
import { projects } from '../data/projects'
import type { SectionId, StatSource } from '../types'

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2023-04" → "Apr 2023"; "2024" → "2024" */
export function formatMonth(value: string) {
  const [y, m] = value.split('-')
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y
}

export function formatPeriod(period: { start: string; end?: string }) {
  return `${formatMonth(period.start)} — ${period.end ? formatMonth(period.end) : 'Present'}`
}

function yearsOfExperience() {
  if (!experiences.length) return 0
  const earliest = experiences.map((e) => new Date(`${e.period.start}-01`).getTime()).sort((a, b) => a - b)[0]
  return Math.max(0, Math.floor((Date.now() - earliest) / (365.25 * 24 * 3600 * 1000)))
}

/** Resolves `auto:*` stats from the data files so numbers are never invented. */
export function resolveStat(value: StatSource): number {
  switch (value) {
    case 'auto:years':
      return yearsOfExperience()
    case 'auto:projects':
      return projects.length
    case 'auto:technologies':
      return allSkills.length
    default:
      return value
  }
}

export function scrollToSection(id: SectionId | string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Scroll the document itself (not scrollIntoView, which can also shift the mobile
  // visual viewport and push the fixed header off-screen). Offset = CSS scroll-padding-top.
  const offset = id === 'home' ? 0 : parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' })
  history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`)
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/** True when the intro preloader should be skipped entirely (reduced motion). */
export const skipIntro = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
