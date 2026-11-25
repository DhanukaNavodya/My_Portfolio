import { cn } from '../../utils'

/** Infinite CSS marquee (paused automatically under reduced motion via the global rule). */
export function Marquee({ items, className, speed = 40 }: { items: string[]; className?: string; speed?: number }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="size-1.5 rotate-45 bg-lime/70" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn('relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]', className)}>
      <div className="flex w-max" style={{ animation: `marquee ${speed}s linear infinite` }}>
        {row()}
        {row(true)}
      </div>
    </div>
  )
}
