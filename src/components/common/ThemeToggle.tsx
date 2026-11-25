import { AnimatePresence, motion } from 'motion/react'
import type { MouseEvent } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { setTheme, useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils'

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> }
}

/**
 * Light/dark switch. Where the View Transitions API exists, the new theme is revealed
 * as a circle expanding from the button; otherwise it switches instantly.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const doc = document as ViewTransitionDoc
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!doc.startViewTransition || reduced) {
      setTheme(next)
      return
    }
    const x = e.clientX || window.innerWidth / 2
    const y = e.clientY || 40
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = doc.startViewTransition(() => setTheme(next))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {})
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        'relative grid size-9 place-items-center overflow-hidden rounded-full border border-line-strong text-fg transition-colors hover:border-lime/60 hover:text-lime',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? <LuMoon className="size-4" /> : <LuSun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
