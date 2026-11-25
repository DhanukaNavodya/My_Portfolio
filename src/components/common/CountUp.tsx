import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

/** Counts up once when scrolled into view. Writes to the DOM directly (no re-renders). */
export function CountUp({ to, suffix = '', duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduced) {
      el.textContent = `${to}${suffix}`
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, to, suffix, duration, reduced])

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  )
}
