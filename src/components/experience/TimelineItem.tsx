import { motion } from 'motion/react'
import { ease, inView } from '../../animations/variants'
import type { Experience } from '../../types'
import { formatPeriod } from '../../utils'
import { Chip, SampleBadge } from '../common/Chip'

export function TimelineItem({ item }: { item: Experience }) {
  const current = !item.period.end
  return (
    <li className="relative grid gap-6 pb-20 pl-10 last:pb-0 md:grid-cols-[14rem_1fr] md:gap-12 md:pl-16">
      {/* Node */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 0.6, ease }}
        className="absolute left-0 top-1.5 grid size-[1.125rem] -translate-x-1/2 place-items-center rounded-full border border-lime/60 bg-ink md:left-0"
      >
        <span className={`size-1.5 rounded-full bg-lime ${current ? 'animate-pulse' : ''}`} />
      </motion.span>

      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView} transition={{ duration: 0.8, ease }}>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-lime">{formatPeriod(item.period)}</p>
        {item.employmentType && <p className="mt-2 text-sm text-subtle">{item.employmentType}</p>}
        {item.location && <p className="text-sm text-subtle">{item.location}</p>}
        <div className="mt-3">
          <SampleBadge show={item.isSample} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="group rounded-3xl border border-line bg-ink-2/50 p-6 transition-colors duration-500 hover:border-lime/25 hover:bg-ink-2 md:p-9"
      >
        <h3 className="display text-[clamp(1.35rem,2.4vw,2rem)] font-semibold text-fg">{item.position}</h3>
        <p className="mt-2 text-fg/70">{item.company}</p>
        <p className="mt-5 leading-relaxed text-muted">{item.summary}</p>

        <div className="mt-7 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 !text-[0.65rem]">Responsibilities</p>
            <ul className="space-y-2.5">
              {item.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed text-fg/80">
                  <span className="mt-2 h-px w-3 shrink-0 bg-lime/70" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {item.achievements.length > 0 && (
            <div>
              <p className="eyebrow mb-3 !text-[0.65rem]">Key achievements</p>
              <ul className="space-y-2.5">
                {item.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-fg/80">
                    <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-lime" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-6">
          {item.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </motion.div>
    </li>
  )
}
