import { formatDate, POSTS, type Post } from '../blog/posts'
import { onLink } from '../lib/router'

export function PostRow({ p }: { p: Post }) {
  return (
    <li>
      <a className="post-row" href={`/blog/${p.slug}`} onClick={onLink}>
        <time dateTime={p.date}>{formatDate(p.date)}</time>
        <span className="post-row-main">
          <span className="post-row-title">{p.title}</span>
          <span className="post-row-summary">{p.summary}</span>
        </span>
        <span className="post-row-arrow" aria-hidden>
          →
        </span>
      </a>
    </li>
  )
}

/** The latest posts on the home page. */
export function BlogTeaser() {
  if (!POSTS.length) return null
  return (
    <section className="blog-teaser" id="blog" aria-labelledby="blog-title">
      <div className="section-head">
        <h2 id="blog-title">
          Blog <span className="count">({String(POSTS.length).padStart(2, '0')})</span>
        </h2>
        <p>What I built and shipped, written up three times a week from my commits.</p>
      </div>
      <ul className="post-list">
        {POSTS.slice(0, 3).map((p) => (
          <PostRow key={p.slug} p={p} />
        ))}
      </ul>
      <a className="more" href="/blog" onClick={onLink}>
        All posts <span aria-hidden>→</span>
      </a>
    </section>
  )
}
