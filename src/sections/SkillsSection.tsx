import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Reveal } from '../components/common/Reveal'
import { SectionHeading } from '../components/common/SectionHeading'
import { SkillCard } from '../components/skills/SkillCard'
import { SkillOrbit } from '../components/skills/SkillOrbit'
import { allSkills, skillCategories } from '../data/skills'
import type { SkillCategoryId } from '../types'
import { cn } from '../utils'

export function SkillsSection() {
  const [activeId, setActiveId] = useState<SkillCategoryId>(skillCategories[0].id)
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0]

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.06),transparent)]" />
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Technical skills"
          lines={['A toolkit built for', <span key="accent" className="text-lime">the whole stack.</span>]}
          description={`${allSkills.length} technologies across ${skillCategories.length} disciplines — pick a category to explore.`}
          align="split"
        />
        <h3 id="skills-title" className="sr-only">
          Skills by category
        </h3>

        {/* Category tabs */}
        <Reveal>
          <div role="tablist" aria-label="Skill categories" className="glass mb-14 inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]">
            {skillCategories.map((cat) => {
              const selected = cat.id === activeId
              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  id={`tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    'relative shrink-0 rounded-full px-4 py-2.5 text-[0.8rem] font-medium transition-colors duration-300 sm:px-5',
                    selected ? 'text-on-lime' : 'text-muted hover:text-fg',
                  )}
                >
                  {selected && (
                    <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <SkillOrbit category={active} />
          </Reveal>

          <div id="skills-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`}>
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 max-w-md text-lg leading-relaxed text-muted"
              >
                <span className="text-fg">{active.label}.</span> {active.description}
              </motion.p>
            </AnimatePresence>
            <ul className="grid grid-cols-1 gap-3 xs:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {active.skills.map((skill, i) => (
                  <SkillCard key={`${active.id}-${skill.name}`} skill={skill} index={i} />
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
