/**
 * Design tokens for code that cannot read CSS variables cheaply (WebGL, canvas).
 * Keep in sync with the @theme block in src/styles/index.css.
 */
export const colors = {
  ink: '#080A09',
  ink2: '#0D100E',
  ink3: '#141815',
  metal: '#2B312D',
  fg: '#F1F4EF',
  muted: '#9AA29C',
  lime: '#C6FF4D',
  limeDeep: '#8FBF2A',
} as const

export const easing = {
  expo: [0.16, 1, 0.3, 1] as const,
  quart: [0.76, 0, 0.24, 1] as const,
}

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
