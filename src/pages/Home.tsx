import { useEffect } from 'react'
import { Experience } from '../components/Experience'
import { Help } from '../components/Help'
import { PixelName } from '../components/PixelName'
import { BlogTeaser } from '../components/BlogList'
import { Hero } from '../components/Hero'
import { WorkGrid } from '../components/WorkGrid'
import { DESIGN, DEVELOPMENT } from '../content/work'
import { resetMeta } from '../lib/seo'

export function Home() {
  useEffect(() => {
    resetMeta()
    const hash = location.hash.slice(1)
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
  }, [])
  return (
    <>
      <Hero />
      <WorkGrid id="development" title="Development" intro="Here's what I've been building" items={DEVELOPMENT} />
      <WorkGrid id="design" title="Design" intro="And what I've been designing" items={DESIGN} />
      <PixelName />
      <Experience />
      <Help />
      <BlogTeaser />
    </>
  )
}
