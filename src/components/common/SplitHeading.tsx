import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { inView, lineReveal } from '../../animations/variants'
import { cn } from '../../utils'

interface SplitHeadingProps {
  /** Each entry is rendered as its own masked line. */
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean
}

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p }

/**
 * Cinematic masked line-by-line reveal for display type.
 * The in-view trigger lives on the (unclipped) heading element; the lines inherit the
 * variant state. Observing the translated lines directly would never fire, because they
 * start fully clipped by their overflow mask.
 */
export function SplitHeading({
  lines,
  as = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: SplitHeadingProps) {
  const Tag = tags[as]
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: inView }

  return (
    <Tag className={cn('display', className)} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span className={cn('block will-change-transform', lineClassName)} variants={lineReveal} custom={delay + i * stagger}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
