import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../utils'

/**
 * Mounts children only while the box is near the viewport and unmounts them after it leaves,
 * so off-screen WebGL contexts are released (R3F disposes the scene graph on unmount).
 */
export function LazyMount({ children, className, rootMargin = '200px' }: { children: ReactNode; className?: string; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={cn('relative', className)}>
      {near && children}
    </div>
  )
}
