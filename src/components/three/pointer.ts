/**
 * Window-level normalised pointer (-1..1), shared by every 3D scene.
 * The hero canvas sits behind DOM content, so R3F's own pointer would never see the mouse.
 */
export const pointer = { x: 0, y: 0 }

let subscribers = 0
const onMove = (e: PointerEvent) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
}

export function subscribePointer() {
  if (subscribers++ === 0) window.addEventListener('pointermove', onMove, { passive: true })
  return () => {
    if (--subscribers === 0) window.removeEventListener('pointermove', onMove)
  }
}
