import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { LuCheck } from 'react-icons/lu'
import { ease, inView } from '../../animations/variants'
import type { Project } from '../../types'
import { cn } from '../../utils'
import { Chip } from '../common/Chip'
import { Reveal } from '../common/Reveal'
import { TiltCard } from '../common/TiltCard'
import { ProjectLinks } from './ProjectLinks'
import { ProjectVisual } from './ProjectVisual'

/** Large cinematic layout with scroll-linked depth; alternates sides. */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const reversed = index % 2 === 1

  return (
    <article ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <motion.div
        style={{ y }}
        className={cn('lg:col-span-7', reversed && 'lg:order-2')}
        initial={{ clipPath: 'inset(12% 12% 12% 12% round 28px)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
        viewport={inView}
        transition={{ duration: 1.3, ease }}
      >
        <TiltCard max={6} className="overflow-hidden rounded-[28px] border border-line">
          <ProjectVisual project={project} className="aspect-[16/11]" />
          <span className="absolute left-5 top-5 rounded-full border border-fg/10 bg-ink/70 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg/80 backdrop-blur">
            {project.category}
          </span>
        </TiltCard>
      </motion.div>

      <div className={cn('lg:col-span-5', reversed && 'lg:order-1')}>
        <Reveal>
          <p className="font-mono text-xs text-lime">Featured — {String(index + 1).padStart(2, '0')}</p>
          <h3 className="display mt-4 text-[clamp(1.8rem,3.6vw,3rem)] font-semibold text-fg">{project.name}</h3>
          <p className="mt-5 text-lg leading-relaxed text-fg/80">{project.summary}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-7 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-fg/85">
                <span className="grid size-5 place-items-center rounded-full bg-lime/15 text-lime">
                  <LuCheck className="size-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div className="mt-8">
            <ProjectLinks project={project} />
          </div>
        </Reveal>
      </div>
    </article>
  )
}
