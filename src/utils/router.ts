import { useSyncExternalStore } from 'react'

/**
 * A two-route router (home and /work/:slug) on the History API — enough for
 * this site, without a routing dependency.
 */
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

window.addEventListener('popstate', emit)

export function navigate(path: string) {
  if (path === location.pathname + location.hash) return
  history.pushState(null, '', path)
  emit()
}

export function usePath() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => location.pathname,
  )
}

export function matchWork(path: string) {
  const m = path.match(/^\/work\/([^/]+)\/?$/)
  return m ? decodeURIComponent(m[1]) : null
}
