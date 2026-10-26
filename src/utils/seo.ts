import { SEO, SITE_URL } from '../config/site'

/**
 * Keeps the head in step with the route, so a case study shared or indexed
 * after client-side navigation carries its own title, description and URL.
 */
function setTag(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

export function setMeta({ title, description, path }: { title: string; description: string; path: string }) {
  const url = SITE_URL + path
  document.title = title
  setTag('meta[name="description"]', 'content', description)
  setTag('link[rel="canonical"]', 'href', url)
  setTag('meta[property="og:url"]', 'content', url)
  setTag('meta[property="og:title"]', 'content', title)
  setTag('meta[property="og:description"]', 'content', description)
  setTag('meta[name="twitter:title"]', 'content', title)
  setTag('meta[name="twitter:description"]', 'content', description)
}

export const resetMeta = () => setMeta({ ...SEO, path: '/' })
