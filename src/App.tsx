import { useLayoutEffect } from 'react'
import { Contact } from './components/Contact'
import { Nav } from './components/Nav'
import { PillNav } from './components/PillNav'
import { route, usePath } from './lib/router'
import { BlogIndex, BlogPost, Missing } from './pages/Blog'
import { Home } from './pages/Home'

export default function App() {
  const path = usePath()
  const r = route(path)
  useLayoutEffect(() => {
    if (!location.hash) window.scrollTo(0, 0)
  }, [path])
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <PillNav />
      <main id="main">
        {r.page === 'home' ? <Home /> : r.page === 'blog' ? <BlogIndex /> : r.page === 'post' ? <BlogPost slug={r.slug} /> : <Missing />}
      </main>
      <Contact />
    </>
  )
}
