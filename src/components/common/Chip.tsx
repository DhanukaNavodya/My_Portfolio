import type { ReactNode } from 'react'
import { cn } from '../../utils'

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-fg/[0.02] px-3 py-1 font-mono text-[0.68rem] tracking-wide text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Marks example content so it is never mistaken for a real claim. */
export function SampleBadge({ show }: { show?: boolean }) {
  if (!show) return null
  return (
    <span
      title="Example content — replace it in src/data"
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-lime/40 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-lime/80"
    >
      <span className="size-1 rounded-full bg-lime/80" />
      Sample
    </span>
  )
}
