import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ease } from '../../animations/variants'
import { fullName } from '../../data/personal'

const YEAR = new Date().getFullYear()

/**
 * Intro page transition: a short counter that wipes away to reveal the site.
 * It never waits on the 3D assets — the hero streams them in behind the scenes.
 * Render it only when `skipIntro()` is false.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const start = performance.now()
    const duration = 1300
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setShow(false), 180)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 md:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow">{fullName}</span>
            <span className="eyebrow">Portfolio — {YEAR}</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 self-center overflow-hidden bg-line">
              <motion.div className="h-full origin-left bg-lime" style={{ scaleX: count / 100 }} />
            </div>
            <span className="display text-[clamp(3rem,12vw,9rem)] font-semibold tabular-nums text-fg">
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
