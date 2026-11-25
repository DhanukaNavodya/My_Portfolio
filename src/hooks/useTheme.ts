import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'
const META_COLORS: Record<Theme, string> = { dark: '#080A09', light: '#F3F4F1' }
const listeners = new Set<() => void>()

/** The <html data-theme> attribute is the source of truth (set pre-paint by index.html). */
const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme])
  listeners.forEach((l) => l())
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage unavailable (private mode) — theme still applies for this visit */
  }
  apply(theme)
}

// Follow the OS setting until the visitor picks a theme explicitly.
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    if (!stored) apply(e.matches ? 'light' : 'dark')
  })
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export const getTheme = read
export const subscribeTheme = subscribe

export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
}
