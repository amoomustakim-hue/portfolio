import { useSyncExternalStore } from 'react'

/** Home, /about, /blog and /blog/:slug on the History API: enough for this site without a routing library. */
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

export type Route = { page: 'home' } | { page: 'about' } | { page: 'blog' } | { page: 'post'; slug: string } | { page: 'missing' }

export function route(path: string): Route {
  if (path === '/' || path === '') return { page: 'home' }
  if (/^\/about\/?$/.test(path)) return { page: 'about' }
  if (/^\/blog\/?$/.test(path)) return { page: 'blog' }
  const m = path.match(/^\/blog\/([^/]+)\/?$/)
  if (m) return { page: 'post', slug: decodeURIComponent(m[1]!) }
  return { page: 'missing' }
}

/** A link that moves inside the site without a reload. */
export function onLink(e: React.MouseEvent<HTMLAnchorElement>) {
  const a = e.currentTarget
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return
  const url = new URL(a.href)
  if (url.origin !== location.origin) return
  e.preventDefault()
  if (url.pathname === location.pathname && url.hash) {
    document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', url.hash)
    return
  }
  navigate(url.pathname + url.hash)
}
