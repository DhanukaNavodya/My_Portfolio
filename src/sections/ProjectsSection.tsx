import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Reveal } from '../components/common/Reveal'
import { SectionHeading } from '../components/common/SectionHeading'
import { FeaturedProject } from '../components/projects/FeaturedProject'
import { ProjectCard } from '../components/projects/ProjectCard'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../types'
import { cn } from '../utils'

const featured = projects.filter((p) => p.featured).slice(0, 2)
const rest = projects.filter((p) => !featured.includes(p))

export function ProjectsSection() {
  const categories = useMemo(() => Array.from(new Set(rest.map((p) => p.category))), [])
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')
  const visible = filter === 'All' ? rest : rest.filter((p) => p.category === filter)

  return (
    <section id="projects" aria-label="Featured projects" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Featured projects"
          lines={['Selected work,', <span key="accent" className="text-lime">engineered to scale.</span>]}
          description="A cross-section of the systems I design and build — from enterprise platforms to cloud pipelines."
          align="split"
        />

        <div className="flex flex-col gap-28 md:gap-40">
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-28 md:mt-40">
            <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h3 className="display text-2xl font-semibold text-fg md:text-4xl">More projects</h3>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
                {(['All', ...categories] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={filter === c}
                    onClick={() => setFilter(c)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-300',
                      filter === c ? 'border-lime bg-lime text-on-lime' : 'border-line-strong text-muted hover:border-lime/50 hover:text-fg',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
            <motion.ul layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        )}
      </div>
    </section>
  )
}
