import { useMemo } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from './useMediaQuery'

export type QualityTier = 'none' | 'low' | 'high'

export interface DeviceCapabilities {
  /** 'none' = no WebGL → CSS fallback scene */
  tier: QualityTier
  isMobile: boolean
  reducedMotion: boolean
}

let webglSupport: boolean | undefined
function hasWebGL() {
  if (webglSupport !== undefined) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    webglSupport = !!gl
    ;(gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglSupport = false
  }
  return webglSupport
}

/**
 * Coarse capability detection used to scale the 3D experience.
 * Low tier: mobile / few cores / low memory / data-saver → lower DPR, no shadows, fewer particles.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const reducedMotion = usePrefersReducedMotion()

  return useMemo(() => {
    if (!hasWebGL()) return { tier: 'none', isMobile, reducedMotion }
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    const lowCores = (nav.hardwareConcurrency ?? 8) <= 4
    const lowMemory = (nav.deviceMemory ?? 8) <= 4
    const saveData = !!nav.connection?.saveData
    const tier: QualityTier = isMobile || lowCores || lowMemory || saveData ? 'low' : 'high'
    return { tier, isMobile, reducedMotion }
  }, [isMobile, reducedMotion])
}
