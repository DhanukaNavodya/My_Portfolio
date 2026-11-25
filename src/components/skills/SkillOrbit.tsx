import { AnimatePresence, motion } from 'motion/react'
import type { SkillCategory } from '../../types'

/**
 * A tilted 3D ring of technology logos orbiting a core — pure CSS 3D (crisp vector icons,
 * zero WebGL cost). Each icon counter-rotates so it always faces the viewer.
 */
export function SkillOrbit({ category }: { category: SkillCategory }) {
  const count = category.skills.length
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem] [perspective:1100px]" aria-hidden>
      {/* Core */}
      <div className="absolute inset-0 grid place-items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
            transition={{ duration: 0.5 }}
            className="grid size-40 place-items-center rounded-full border border-line-strong bg-[radial-gradient(circle_at_35%_30%,var(--color-ink-4),var(--color-ink-2)_70%)] text-center shadow-[0_0_80px_-10px_rgb(var(--glow)/0.25),inset_0_1px_0_rgba(255,255,255,0.08)] sm:size-44"
          >
            <div>
              <p className="display text-4xl font-semibold text-lime">{String(count).padStart(2, '0')}</p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">{category.label}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Orbit plane */}
      <div className="preserve-3d absolute inset-0" style={{ animation: 'orbit-spin 36s linear infinite' }}>
        <div className="absolute inset-[4%] rounded-full border border-lime/20" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-fg/10" />
        <AnimatePresence>
          {category.skills.map((skill, i) => {
            const angle = (360 / count) * i
            return (
              <div
                key={`${category.id}-${skill.name}`}
                className="preserve-3d absolute left-1/2 top-1/2"
                style={{ transform: `rotateZ(${angle}deg) translateX(min(13rem, 42vw)) rotateZ(${-angle}deg)` }}
              >
                <div className="preserve-3d" style={{ animation: 'counter-spin 36s linear infinite' }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="-ml-7 -mt-7 grid size-14 place-items-center rounded-2xl border border-line-strong bg-ink-3/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur"
                    style={{ color: skill.color ?? 'var(--color-lime)' }}
                  >
                    <skill.icon className="size-6" />
                  </motion.div>
                </div>
              </div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
