import { SEO, SITE_URL } from '../config/site'

/** Keeps the title, description and canonical in step with the page shown. */
export function setMeta(title: string, description: string, path: string) {
  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE_URL}${path}`)
}
export const resetMeta = () => setMeta(SEO.title, SEO.description, '/')
