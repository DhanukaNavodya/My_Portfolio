import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Desktop-only cursor: a precise dot plus a trailing ring that expands over
 * interactive elements (anything clickable or tagged `data-cursor="hover"`).
 */
export function CustomCursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine) return
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setHovering(!!target?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'))
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-lime/70"
        style={{ x: reduced ? x : ringX, y: reduced ? y : ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 54 : 34,
          height: hovering ? 54 : 34,
          backgroundColor: hovering ? 'rgb(var(--glow)/0.08)' : 'rgb(var(--glow)/0)',
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
      <motion.div
        className="absolute left-0 top-0 size-1.5 rounded-full bg-lime"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  )
}
