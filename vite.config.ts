import { readdirSync, readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const ORIGIN = (process.env.VITE_SITE_URL ?? 'https://www.mustakheem.site').replace(/\/$/, '')

/** Writes sitemap.xml at build time from the posts folder, so a new post is listed without anyone editing a file. */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    generateBundle() {
      const dir = new URL('./src/blog/posts/', import.meta.url)
      const posts = readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => {
          const date = /^date:\s*(\S+)/m.exec(readFileSync(new URL(f, dir), 'utf8'))?.[1] ?? f.slice(0, 10)
          return { loc: `/blog/${f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')}`, date }
        })
      const newest = posts.map((p) => p.date).sort().pop() ?? new Date().toISOString().slice(0, 10)
      const urls = [
        { loc: '/', date: newest, priority: '1.0' },
        { loc: '/about', date: newest, priority: '0.8' },
        { loc: '/blog', date: newest, priority: '0.8' },
        ...posts.map((p) => ({ ...p, priority: '0.6' })),
      ]
      const body = urls.map((u) => `  <url><loc>${ORIGIN}${u.loc}</loc><lastmod>${u.date}</lastmod><priority>${u.priority}</priority></url>`).join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n` })
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemap()],
  server: { host: true },
})
