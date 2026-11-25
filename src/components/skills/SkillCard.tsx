import { motion } from 'motion/react'
import { ease } from '../../animations/variants'
import { skillsConfig } from '../../data/skills'
import type { Skill } from '../../types'
import { TiltCard } from '../common/TiltCard'

function LevelMeter({ level }: { level: number }) {
  const label = skillsConfig.levelLabels[Math.min(Math.max(level, 1), 5) - 1]
  return (
    <div className="mt-5 flex items-center justify-between gap-3">
      <div className="flex gap-1" role="img" aria-label={`${label}: ${level} of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0.3, opacity: 0.3 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease }}
            className={`h-3 w-1.5 origin-bottom rounded-full ${i < level ? 'bg-lime' : 'bg-fg/10'}`}
          />
        ))}
      </div>
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-subtle">{label}</span>
    </div>
  )
}

export function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease, delay: index * 0.05 }}
      className="[perspective:900px]"
    >
      <TiltCard max={12} className="h-full rounded-2xl border border-line bg-ink-2/80 p-5 transition-colors duration-500 hover:border-lime/30">
        <div className="flex items-center gap-4 [transform:translateZ(30px)]">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-ink-3"
            style={{ color: skill.color ?? 'var(--color-lime)', boxShadow: `0 0 28px -12px ${skill.color ?? 'var(--color-lime)'}` }}
          >
            <skill.icon className="size-5" />
          </span>
          <span className="font-display text-[0.95rem] font-medium text-fg">{skill.name}</span>
        </div>
        {skillsConfig.showLevels && (
          <div className="[transform:translateZ(18px)]">
            <LevelMeter level={skill.level} />
          </div>
        )}
      </TiltCard>
    </motion.li>
  )
}
