export type SceneKey = 'shanghai' | 'cravvingss' | 'aura' | 'noir' | 'soma' | 'afterDark'

/** How the gallery leaves this project for the next one. */
export type Exit = 'stretch' | 'expand' | 'slide' | 'shutter' | 'collapse'

export type Block =
  | { type: 'text'; label: string; heading: string; body: string }
  | { type: 'scene'; caption: string }
  | { type: 'pull'; text: string }
  | { type: 'specs'; label: string; items: [string, string][] }
  | { type: 'flow' }
  | { type: 'launch'; href: string; label: string }

export type Project = {
  slug: string
  scene: SceneKey
  title: string
  subtitle: string
  category: string
  year: string
  tags: string[]
  /** Live / In development / Concept — fictional studies are always labelled Concept. */
  status: string
  role: string[]
  summary: string
  statement: string
  /** Project-specific palette. Only used inside the project's own frame and case study. */
  palette: { bg: string; fg: string; accent: string }
  /** The case study page reads light or dark text on `palette.bg`. */
  tone: 'light' | 'dark'
  exit: Exit
  /** Projects that open an external experience instead of a case study. */
  external?: string
  blocks: Block[]
}
