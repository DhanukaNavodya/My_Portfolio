import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../utils'

interface TiltCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode
  /** Maximum rotation in degrees. */
  max?: number
  glare?: boolean
}

/**
 * Perspective tilt that follows the pointer, with a soft specular highlight.
 * Uses motion values only — no React re-renders while moving.
 */
export function TiltCard({ max = 8, glare = true, className, children, style, ...rest }: TiltCardProps) {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springCfg = { stiffness: 180, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springCfg)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springCfg)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgb(var(--glow)/0.10), transparent 45%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: enabled ? rotateX : 0, rotateY: enabled ? rotateY : 0, transformPerspective: 1100, ...style }}
      className={cn('group preserve-3d relative will-change-transform', className)}
      {...rest}
    >
      {children}
      {glare && enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
