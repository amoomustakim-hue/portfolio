import { afterDark } from './afterDark'
import { aura } from './aura'
import { cravvingss } from './cravvingss'
import { noir } from './noir'
import { shanghai } from './shanghai'
import { soma } from './soma'
import type { Project } from './types'

export const PROJECTS: Project[] = [shanghai, cravvingss, aura, noir, soma, afterDark]

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug)

export const nextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return PROJECTS[(i + 1) % PROJECTS.length]
}

export type { Project } from './types'
