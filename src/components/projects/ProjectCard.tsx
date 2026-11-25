import { motion } from 'motion/react'
import { ease } from '../../animations/variants'
import type { Project } from '../../types'
import { Chip } from '../common/Chip'
import { TiltCard } from '../common/TiltCard'
import { ProjectLinks } from './ProjectLinks'
import { ProjectVisual } from './ProjectVisual'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, ease, delay: index * 0.06 }}
      className="h-full"
    >
      <TiltCard max={7} className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-2/60 transition-colors duration-500 hover:border-lime/25">
        <ProjectVisual project={project} className="aspect-[16/10]" />
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-lime">{project.category}</span>
            {project.year && <span className="font-mono text-[0.62rem] text-subtle">{project.year}</span>}
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-fg">{project.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div className="mt-6 border-t border-line pt-5">
            <ProjectLinks project={project} />
          </div>
        </div>
      </TiltCard>
    </motion.li>
  )
}
