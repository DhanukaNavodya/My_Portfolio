import { motion } from 'motion/react'
import { scrollToSection } from '../../utils'

export function ScrollIndicator({ show }: { show: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={() => scrollToSection('about')}
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : {}}
      transition={{ delay: 1.6, duration: 1 }}
      className="group flex items-center gap-3 text-muted transition-colors hover:text-fg"
      aria-label="Scroll to About section"
    >
      <span className="relative flex h-10 w-6 justify-center rounded-full border border-line-strong pt-2">
        <span className="h-2 w-[2px] rounded-full bg-lime" style={{ animation: 'scroll-dot 1.8s var(--ease-expo) infinite' }} />
      </span>
      <span className="eyebrow !text-[0.65rem] group-hover:text-fg">Scroll to explore</span>
    </motion.button>
  )
}
