import type { Transition, Variants } from 'motion/react'
import { easing } from '../styles/tokens'

export const ease = easing.expo

export const transitions = {
  smooth: { duration: 0.9, ease } satisfies Transition,
  quick: { duration: 0.45, ease } satisfies Transition,
  spring: { type: 'spring', stiffness: 260, damping: 26 } satisfies Transition,
}

/** Fade + rise, used by <Reveal>. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { ...transitions.smooth, delay } }),
}

/** Masked line reveal for display typography. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: (delay: number = 0) => ({ y: '0%', transition: { duration: 1.1, ease, delay } }),
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay: number = 0) => ({ opacity: 1, scale: 1, transition: { ...transitions.smooth, delay } }),
}

/** Default viewport options for scroll-triggered reveals. */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
