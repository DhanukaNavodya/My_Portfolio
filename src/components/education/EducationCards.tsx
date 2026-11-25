import { motion } from 'motion/react'
import { LuArrowUpRight, LuAward, LuBadgeCheck, LuGraduationCap } from 'react-icons/lu'
import { ease, inView } from '../../animations/variants'
import type { Certification, Education } from '../../types'
import { formatPeriod } from '../../utils'
import { Chip, SampleBadge } from '../common/Chip'
import { TiltCard } from '../common/TiltCard'

export function EducationCard({ item }: { item: Education }) {
  return (
    <TiltCard max={5} className="h-full overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-ink-3 to-ink-2 p-7 md:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.14),transparent)]" />
      <div className="relative flex h-full flex-col [transform:translateZ(24px)]">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-2xl border border-lime/30 bg-lime/10 text-lime">
            <LuGraduationCap className="size-6" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{formatPeriod(item.period)}</span>
        </div>
        <h3 className="display mt-10 text-[clamp(1.5rem,2.8vw,2.3rem)] font-semibold text-fg">{item.degree}</h3>
        {item.field && <p className="mt-2 text-lg text-lime">{item.field}</p>}
        <p className="mt-4 text-fg/70">{item.institution}</p>
        {item.description && <p className="mt-5 max-w-xl leading-relaxed text-muted">{item.description}</p>}
        {item.highlights && (
          <div className="mt-7 flex flex-wrap gap-1.5">
            {item.highlights.map((h) => (
              <Chip key={h}>{h}</Chip>
            ))}
          </div>
        )}
        <div className="mt-auto pt-8">
          <SampleBadge show={item.isSample} />
        </div>
      </div>
    </TiltCard>
  )
}

export function CertificationCard({ item, index }: { item: Certification; index: number }) {
  const Icon = item.kind === 'certification' ? LuBadgeCheck : LuAward
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.8, ease, delay: index * 0.08 }}
    >
      <TiltCard max={8} className="h-full rounded-2xl border border-line bg-ink-2/70 p-6 transition-colors duration-500 hover:border-lime/25">
        <div className="flex h-full flex-col [transform:translateZ(18px)]">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl border border-line bg-ink-3 text-lime">
              <Icon className="size-5" />
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-subtle">
              {item.kind === 'certification' ? 'Certification' : 'Training'}
            </span>
          </div>
          <h4 className="mt-6 font-display text-[1.02rem] font-medium leading-snug text-fg">{item.name}</h4>
          <p className="mt-2 text-sm text-muted">
            {item.issuer} · {item.date}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-6">
            <SampleBadge show={item.isSample} />
            {item.credentialUrl && (
              <a
                href={item.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-lime hover:underline"
              >
                Verify <LuArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.li>
  )
}
