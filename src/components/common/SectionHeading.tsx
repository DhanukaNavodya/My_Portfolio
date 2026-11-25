import type { ReactNode } from 'react'
import { cn } from '../../utils'
import { Reveal } from './Reveal'
import { SplitHeading } from './SplitHeading'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  lines: ReactNode[]
  description?: string
  align?: 'left' | 'split'
  className?: string
}

export function SectionHeading({ index, eyebrow, lines, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-14 md:mb-20',
        align === 'split' && 'grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end',
        className,
      )}
    >
      <div>
        <Reveal className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs text-lime">{index}</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <SplitHeading lines={lines} className="text-[clamp(2.1rem,6vw,5rem)] font-semibold text-fg" />
      </div>
      {description && (
        <Reveal delay={0.2}>
          <p className={cn('max-w-md text-base leading-relaxed text-muted md:text-lg', align === 'left' && 'mt-6')}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
