import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { SectionHeading } from '../components/common/SectionHeading'
import { TimelineItem } from '../components/experience/TimelineItem'
import { experiences } from '../data/experience'

export function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" aria-label="Professional experience" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          lines={['Where I have', <span key="accent" className="text-lime">built & shipped.</span>]}
          description="Roles, responsibilities and the outcomes that came from them."
          align="split"
        />

        <ol ref={listRef} className="relative ml-2 md:ml-4">
          {/* Track + animated fill */}
          <span aria-hidden className="absolute bottom-0 left-0 top-2 w-px bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-0 top-2 w-px origin-top bg-gradient-to-b from-lime via-lime to-lime/0 shadow-[0_0_12px_rgb(var(--glow)/0.6)]"
          />
          {experiences.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </section>
  )
}
