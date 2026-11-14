import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { marked } from 'marked'
import { EXPERIENCE, HACKATHONS, IDENTITY, SEO } from './src/config/site'
import { DESIGN, DEVELOPMENT } from './src/content/work'

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

type Post = { slug: string; title: string; date: string; summary: string; tags: string; html: string }
function readPosts(): Post[] {
  const dir = new URL('./src/blog/posts/', import.meta.url)
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(new URL(f, dir), 'utf8')
      const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
      const head: Record<string, string> = {}
      for (const line of (m?.[1] ?? '').split('\n')) {
        const i = line.indexOf(':')
        if (i > 0) head[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
      }
      return {
        slug: f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
        title: head.title ?? '',
        date: head.date ?? f.slice(0, 10),
        summary: head.summary ?? '',
        tags: head.tags ?? '',
        html: marked.parse((m?.[2] ?? '').trim(), { async: false }) as string,
      }
    })
    .filter((p) => p.title)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Search engines and link previews (WhatsApp, X, LinkedIn) read the HTML before any JavaScript runs. This writes a real HTML
 * file for every page (/about, /blog, each post) with that page's own title, description, canonical URL and preview tags, and
 * the page's words inside #root, so crawlers see the content straight away. The app replaces it as soon as it loads.
 */
function prerender(): Plugin {
  let outDir = 'dist'
  return {
    name: 'prerender',
    apply: 'build',
    configResolved(c) {
      outDir = c.build.outDir
    },
    closeBundle() {
      const shell = readFileSync(join(outDir, 'index.html'), 'utf8')
      const posts = readPosts()
      const work = [...DEVELOPMENT, ...DESIGN]
      const page = (path: string, title: string, description: string, body: string, extra = '', type = 'website') => {
        const url = `${ORIGIN}${path}`
        let html = shell
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
          .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
          .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
          .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
          .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
          .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
          .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
          .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
          .replace('</head>', `${extra}</head>`)
        if (type !== 'profile') html = html.replace(/(<meta property="og:type" content=")[^"]*"/, `$1${type}"`)
        const file = path === '/' ? join(outDir, 'index.html') : join(outDir, path, 'index.html')
        mkdirSync(join(file, '..'), { recursive: true })
        writeFileSync(file, html)
      }

      const workList = `<ul>${work.map((w) => `<li><a href="${w.href}">${esc(w.title)}</a>: ${esc(w.line)}</li>`).join('')}</ul>`
      const jobs = `<ul>${EXPERIENCE.map((e) => `<li>${esc(e.role)} at ${esc(e.org)}</li>`).join('')}</ul>`
      const wins = `<ul>${HACKATHONS.list.map((h) => `<li>${esc(h.place)}, ${esc(h.name)}</li>`).join('')}</ul>`
      const postList = `<ul>${posts.map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a> (${p.date}): ${esc(p.summary)}</li>`).join('')}</ul>`

      page(
        '/',
        SEO.title,
        SEO.description,
        `<main><h1>Hello. I'm ${IDENTITY.searchName}, a software engineer in Lagos.</h1><p>${esc(SEO.description)}</p><h2>Work</h2>${workList}<h2>Experience</h2>${jobs}<h2>Hackathons</h2>${wins}<h2>Blog</h2>${postList}<p><a href="/about">About me</a> · <a href="/blog">Blog</a></p></main>`,
        '',
        'profile',
      )
      const aboutDesc = `${IDENTITY.fullName} (${IDENTITY.alias}) is a software engineer in Lagos: CEO of KIMTECH Technologies and Lead Software Engineer at SheDrives NG and Cravvingss.`
      page(
        '/about',
        `About ${IDENTITY.searchName}`,
        aboutDesc,
        `<main><h1>About ${IDENTITY.searchName}</h1><p>${esc(aboutDesc)}</p><h2>What I do now</h2>${jobs}<h2>Hackathons</h2>${wins}<h2>Selected work</h2>${workList}</main>`,
      )
      page(
        '/blog',
        `Blog, ${IDENTITY.searchName}`,
        'What I built and shipped, written up every Monday, Wednesday and Friday from what I pushed that week.',
        `<main><h1>Blog</h1>${postList}</main>`,
      )
      for (const p of posts) {
        const ld = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.summary,
          datePublished: p.date,
          dateModified: p.date,
          keywords: p.tags,
          url: `${ORIGIN}/blog/${p.slug}`,
          mainEntityOfPage: `${ORIGIN}/blog/${p.slug}`,
          image: `${ORIGIN}/og.jpg?v=2`,
          author: { '@type': 'Person', name: IDENTITY.searchName, url: `${ORIGIN}/about` },
          publisher: { '@type': 'Person', name: IDENTITY.searchName },
        }
        page(
          `/blog/${p.slug}`,
          `${p.title}, ${IDENTITY.searchName}`,
          p.summary,
          `<main><article><h1>${esc(p.title)}</h1><p>${p.date}</p>${p.html}</article><p><a href="/blog">All posts</a></p></main>`,
          `<meta property="article:published_time" content="${p.date}" /><script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
          'article',
        )
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemap(), prerender()],
  server: { host: true },
})
