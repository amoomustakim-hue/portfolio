import { useEffect } from 'react'
import { formatDate, postBySlug, POSTS } from '../blog/posts'
import { PostRow } from '../components/BlogList'
import { IDENTITY } from '../config/site'
import { onLink } from '../lib/router'
import { setMeta } from '../lib/seo'

export function BlogIndex() {
  useEffect(() => setMeta(`Blog, ${IDENTITY.searchName}`, 'What Mustakheem Amoo built and shipped, written up three times a week from his commits.', '/blog'), [])
  return (
    <section className="page">
      <h1 className="page-title">Blog</h1>
      <p className="page-intro">What I built and shipped, written up every Monday, Wednesday and Friday from what I pushed that week.</p>
      {POSTS.length ? (
        <ul className="post-list">
          {POSTS.map((p) => (
            <PostRow key={p.slug} p={p} />
          ))}
        </ul>
      ) : (
        <p className="page-intro">The first post is on its way.</p>
      )}
    </section>
  )
}

export function BlogPost({ slug }: { slug: string }) {
  const p = postBySlug(slug)
  useEffect(() => {
    if (p) setMeta(`${p.title}, ${IDENTITY.searchName}`, p.summary, `/blog/${p.slug}`)
  }, [p])
  if (!p) return <Missing />
  return (
    <article className="page post">
      <a className="back" href="/blog" onClick={onLink}>
        <span aria-hidden>←</span> All posts
      </a>
      <header>
        <time dateTime={p.date}>
          {formatDate(p.date)} · {p.minutes} min read
        </time>
        <h1 className="post-title">{p.title}</h1>
        {p.tags.length ? <p className="post-tags">{p.tags.join(' · ')}</p> : null}
      </header>
      <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
    </article>
  )
}

export function Missing() {
  useEffect(() => setMeta(`Not found, ${IDENTITY.searchName}`, 'This page does not exist.', location.pathname), [])
  return (
    <section className="page">
      <h1 className="page-title">Not here.</h1>
      <p className="page-intro">That page doesn't exist, or it moved.</p>
      <a className="more" href="/" onClick={onLink}>
        Back home <span aria-hidden>→</span>
      </a>
    </section>
  )
}
