import { motion, type HTMLMotionProps } from 'motion/react'
import { fadeUp, inView } from '../../animations/variants'

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number
}

/** Scroll-triggered fade + rise. Motion automatically respects prefers-reduced-motion via MotionConfig. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={inView} custom={delay} {...rest}>
      {children}
    </motion.div>
  )
}
