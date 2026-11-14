import { marked } from 'marked'

/**
 * Blog posts are Markdown files in src/blog/posts, named YYYY-MM-DD-slug.md, with a small header:
 *
 * ---
 * title: What I shipped this week
 * date: 2026-11-14
 * summary: One or two sentences for the list and for search results.
 * tags: Cravvingss, SheDrives
 * ---
 *
 * Adding a file is all it takes to publish: the site reads every file here at build time.
 */
export type Post = { slug: string; title: string; date: string; summary: string; tags: string[]; html: string; minutes: number }

const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function parse(path: string, raw: string): Post | null {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!m) return null
  const head: Record<string, string> = {}
  for (const line of m[1]!.split('\n')) {
    const i = line.indexOf(':')
    if (i > 0) head[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
  }
  const body = m[2]!.trim()
  const file = path.split('/').pop()!.replace(/\.md$/, '')
  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '')
  if (!head.title || !head.date) return null
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: head.title,
    date: head.date,
    summary: head.summary ?? '',
    tags: (head.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    html: marked.parse(body, { async: false }) as string,
    minutes: Math.max(1, Math.round(words / 220)),
  }
}

export const POSTS: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .filter((p): p is Post => !!p)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug)

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' })
