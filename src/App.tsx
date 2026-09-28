import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { CaseStudy } from './components/CaseStudy'
import { Contact } from './components/Contact'
import { CustomCursor } from './components/CustomCursor'
import { Experiments } from './components/Experiments'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navigation } from './components/Navigation'
import { Preloader } from './components/Preloader'
import { ProjectGallery } from './components/ProjectGallery'
import { Grain } from './components/ui/Grain'
import { useLenis, useScrollLock, useScrollTo } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useMediaQuery'
import { blob } from './utils/blobStage'
import { gsap, ScrollTrigger } from './utils/gsap'
import { matchWork, usePath } from './utils/router'

const HeroObject = lazy(() => import('./components/HeroObject'))

function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <Hero ready={ready} />
      <ProjectGallery />
      <About />
      <Capabilities />
      <Experiments />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  const path = usePath()
  const slug = matchWork(path)
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const scrollTo = useScrollTo()

  useScrollLock(loading)

  useEffect(() => {
    history.scrollRestoration = 'manual'
  }, [])

  // New route: start at the top (or at the requested chapter) with fresh measurements.
  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    if (slug) gsap.set(blob, { opacity: 0 })
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const hash = location.hash.slice(1)
      if (hash && !slug && revealed) requestAnimationFrame(() => scrollTo(hash, { immediate: true }))
    })
    return () => cancelAnimationFrame(id)
  }, [path, slug])

  useEffect(() => {
    if (revealed) ScrollTrigger.refresh()
  }, [revealed])

  const onReveal = useCallback(() => setRevealed(true), [])
  const onDone = useCallback(() => setLoading(false), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {loading && <Preloader onReveal={onReveal} onDone={onDone} />}
      <CustomCursor />
      <Navigation ready={revealed} path={path} />
      {!slug && !reduced && (
        <Suspense fallback={null}>
          <HeroObject />
        </Suspense>
      )}
      <main id="main">{slug ? <CaseStudy slug={slug} /> : <Home ready={revealed} />}</main>
      <Grain />
    </>
  )
}
