import { motion } from 'motion/react'
import type { MouseEvent } from 'react'
import { LuArrowRight, LuMail } from 'react-icons/lu'
import { ease } from '../../animations/variants'
import { personal } from '../../data/personal'
import { scrollToSection } from '../../utils'
import { Button } from '../common/Button'
import { SplitHeading } from '../common/SplitHeading'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export function HeroContent() {
  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <div className="relative z-10">
      <motion.p {...fade(0.1)} className="flex items-center gap-3 text-lg font-medium text-fg/90 md:text-xl">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
        </span>
        {personal.greeting} {personal.firstName}
      </motion.p>

      <h1 className="sr-only">
        {personal.firstName} {personal.lastName} — {personal.headline.join(' ')}
      </h1>
      <SplitHeading
        as="p"
        immediate
        delay={0.2}
        lines={personal.headline.map((line, i) => (i === 0 ? line : <span key={i} className="text-lime">{line}</span>))}
        className="mt-6 !font-sans text-[clamp(2.6rem,5vw,4.6rem)] font-bold !leading-[1.02] !tracking-[-0.04em] text-fg"
      />

      <motion.p {...fade(0.55)} className="mt-7 max-w-lg text-lg leading-relaxed text-muted md:text-xl">
        {personal.tagline}
      </motion.p>

      <motion.div {...fade(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
        <Button href="#contact" onClick={go('contact')} icon={<LuMail className="size-4" />}>
          Let's Connect
        </Button>
        <Button href="#projects" variant="ghost" onClick={go('projects')} icon={<LuArrowRight className="size-4" />}>
          Explore My Work
        </Button>
      </motion.div>
    </div>
  )
}
