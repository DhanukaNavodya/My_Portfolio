import { useEffect, useState } from 'react'
import type { SectionId } from '../types'

/**
 * Tracks which section currently crosses the middle band of the viewport.
 * One shared IntersectionObserver — no scroll listeners.
 */
export function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0])

  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        // Pick the first section (document order) that is inside the band.
        const next = ids.find((id) => visible.has(id))
        if (next) setActive(next)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.01] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}
