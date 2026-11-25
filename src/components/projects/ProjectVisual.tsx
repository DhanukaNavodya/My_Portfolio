import type { ReactNode } from 'react'
import type { Project, ProjectCategory } from '../../types'
import { cn } from '../../utils'

/**
 * Generated, category-specific UI composition used when a project has no screenshot.
 * It's an abstract illustration — not a fake product screenshot — and animates on hover.
 */
const bar = 'rounded-full bg-fg/10'
const ACCENT = 'var(--color-lime)'
const fg = (pct: number) => `color-mix(in srgb, var(--color-fg) ${pct}%, transparent)`
const accent = (pct: number) => `color-mix(in srgb, var(--color-lime) ${pct}%, transparent)`

function Frame({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="absolute inset-[7%] flex flex-col overflow-hidden rounded-xl border border-fg/10 bg-ink/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03]">
      <div className="flex items-center gap-1.5 border-b border-fg/5 px-3 py-2">
        <span className="size-1.5 rounded-full bg-fg/20" />
        <span className="size-1.5 rounded-full bg-fg/20" />
        <span className="size-1.5 rounded-full bg-lime/80" />
        <span className="ml-3 font-mono text-[0.55rem] text-fg/30">{title}</span>
      </div>
      <div className="relative flex-1 p-[5%]">{children}</div>
    </div>
  )
}

const visuals: Record<ProjectCategory, () => ReactNode> = {
  'Enterprise Applications': () => (
    <div className="flex h-full gap-[5%]">
      <div className="flex w-[22%] flex-col gap-2">
        {[70, 90, 55, 80, 60].map((w, i) => (
          <span key={i} className={cn('h-1.5', bar, i === 1 && '!bg-lime/70')} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-[6%]">
        <div className="grid grid-cols-3 gap-2">
          {['bg-lime/80', 'bg-fg/15', 'bg-fg/10'].map((c, i) => (
            <div key={i} className="rounded-md border border-fg/5 bg-fg/[0.03] p-2">
              <span className={cn('block h-1 w-1/2 rounded-full', c)} />
              <span className="mt-2 block h-2.5 w-3/4 rounded bg-fg/15" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-between rounded-md border border-fg/5 bg-fg/[0.02] p-2">
          {[0, 1, 2, 3, 4].map((r) => (
            <div key={r} className="flex items-center gap-2">
              <span className={cn('size-1.5 rounded-full', r === 2 ? 'bg-lime' : 'bg-fg/20')} />
              <span className={cn('h-1 flex-1', bar)} />
              <span className="h-1 w-[18%] rounded-full bg-fg/15 transition-all duration-700 group-hover:w-[28%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  'HR Management Systems': () => (
    <div className="flex h-full flex-col items-center justify-center gap-[10%]">
      <div className="grid size-10 place-items-center rounded-full border border-lime/60 bg-lime/10">
        <span className="size-4 rounded-full bg-lime/80" />
      </div>
      <div className="relative flex w-full justify-around">
        <span className="absolute -top-[30%] left-[16%] right-[16%] h-px bg-fg/15" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 transition-transform duration-700 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="size-7 rounded-full border border-fg/15 bg-fg/10" />
            <span className={cn('h-1 w-10', bar)} />
            <span className="h-1 w-6 rounded-full bg-fg/5" />
          </div>
        ))}
      </div>
      <div className="flex w-full gap-1">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className={cn('h-3 flex-1 rounded-sm', [2, 3, 9].includes(i) ? 'bg-lime/70' : 'bg-fg/[0.07]')} />
        ))}
      </div>
    </div>
  ),
  'POS Systems': () => (
    <div className="flex h-full gap-[6%]">
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={cn('rounded-md border border-fg/5 transition-colors duration-500', i === 11 ? 'bg-lime/80' : 'bg-fg/[0.05] group-hover:bg-fg/[0.08]')} />
        ))}
      </div>
      <div className="flex w-[38%] flex-col gap-2 rounded-md border border-dashed border-fg/15 bg-fg/[0.02] p-2.5">
        {[80, 60, 70, 50].map((w, i) => (
          <div key={i} className="flex justify-between gap-2">
            <span className={cn('h-1', bar)} style={{ width: `${w}%` }} />
            <span className="h-1 w-3 rounded-full bg-fg/20" />
          </div>
        ))}
        <span className="mt-auto h-px bg-fg/15" />
        <div className="flex justify-between">
          <span className="h-1.5 w-8 rounded-full bg-fg/30" />
          <span className="h-1.5 w-6 rounded-full bg-lime" />
        </div>
      </div>
    </div>
  ),
  Microservices: () => (
    <svg viewBox="0 0 200 120" className="h-full w-full">
      <g style={{ stroke: fg(18) }} strokeWidth="1" fill="none">
        <path d="M100 60 L40 25 M100 60 L40 95 M100 60 L160 25 M100 60 L160 95 M40 25 L40 95 M160 25 L160 95" />
      </g>
      <path d="M100 60 L160 25" strokeWidth="1.5" strokeDasharray="4 4" style={{ stroke: ACCENT, animation: 'dash-flow 1.2s linear infinite' }} />
      {[
        [100, 60, 14, true],
        [40, 25, 9, false],
        [40, 95, 9, false],
        [160, 25, 9, false],
        [160, 95, 9, false],
      ].map(([x, y, r, core], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r={(r as number) + 5} fill="none" style={{ stroke: core ? accent(40) : fg(8) }} />
          <rect x={(x as number) - (r as number)} y={(y as number) - (r as number)} width={(r as number) * 2} height={(r as number) * 2} rx="4" style={{ fill: core ? ACCENT : 'var(--color-ink-4)', stroke: fg(15) }} />
        </g>
      ))}
    </svg>
  ),
  'AI & Machine Learning': () => (
    <svg viewBox="0 0 200 120" className="h-full w-full" preserveAspectRatio="none">
      {[20, 45, 70, 95].map((y) => (
        <line key={y} x1="0" x2="200" y1={y} y2={y} style={{ stroke: fg(6) }} />
      ))}
      <path d="M0 95 C 30 90, 40 60, 70 66 S 110 40, 130 48 S 170 20, 200 18" fill="none" style={{ stroke: fg(35) }} strokeWidth="1.5" />
      <path
        d="M0 98 C 30 86, 45 70, 72 70 S 112 46, 132 42 S 172 28, 200 12"
        fill="none"
        style={{ stroke: ACCENT }}
        strokeWidth="2"
      />
      <circle cx="200" cy="12" r="3" style={{ fill: ACCENT }} />
      <circle cx="200" cy="12" r="7" fill="none" style={{ stroke: ACCENT }} strokeOpacity="0.5" className="origin-[200px_12px] transition-transform duration-700 group-hover:scale-150" />
      <path d="M0 98 C 30 86, 45 70, 72 70 S 112 46, 132 42 S 172 28, 200 12 L200 120 L0 120 Z" fill="url(#ai-fill)" />
      <defs>
        <linearGradient id="ai-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: ACCENT }} stopOpacity="0.18" />
          <stop offset="1" style={{ stopColor: ACCENT }} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  'Cloud & DevOps': () => (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center">
        {['Test', 'Build', 'Ship', 'Run'].map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  'grid size-8 place-items-center rounded-lg border text-[0.5rem] font-mono transition-colors duration-500',
                  i < 3 ? 'border-lime/50 bg-lime/15 text-lime' : 'border-fg/15 bg-fg/5 text-fg/40 group-hover:border-lime/50 group-hover:text-lime',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[0.5rem] uppercase tracking-widest text-fg/35">{label}</span>
            </div>
            {i < 3 && <span className="mx-1 mb-5 h-px flex-1 bg-gradient-to-r from-lime/60 to-fg/10" />}
          </div>
        ))}
      </div>
      <div className="space-y-1.5 rounded-md border border-fg/5 bg-ink/40 p-2 font-mono text-[0.5rem] text-fg/35">
        <p>
          <span className="text-lime">✓</span> tests passed
        </p>
        <p>
          <span className="text-lime">✓</span> image built
        </p>
        <p className="text-fg/50">→ deploying to production_</p>
      </div>
    </div>
  ),
}

export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden bg-ink-2', className)}>
      <div className="grid-backdrop absolute inset-0 opacity-70" />
      <div className="absolute -right-1/4 -top-1/4 size-3/4 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.14),transparent)] transition-transform duration-1000 group-hover:scale-125" />
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} preview`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:scale-105"
        />
      ) : (
        <Frame title={project.id}>{visuals[project.category]()}</Frame>
      )}
    </div>
  )
}
