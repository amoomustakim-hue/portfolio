import type { Project } from './types'

export const afterDark: Project = {
  slug: 'after-dark',
  scene: 'afterDark',
  title: 'After Dark',
  subtitle: 'Artist world — LP campaign',
  category: 'Music / Experimental interface',
  year: '2026',
  tags: ['Canvas', 'Web Audio', 'Type', 'Interaction'],
  status: 'Concept',
  role: ['Concept', 'Visual system', 'Audio-reactive motion', 'Development'],
  summary: 'An album that behaves like a signal: type, rings and noise that move with the sound.',
  statement: 'No hero image, no tour dates carousel. The site is an instrument — the cursor bends the waveform, and turning the sound on lets the record drive every pixel.',
  palette: { bg: '#030303', fg: '#f5f5f0', accent: '#8f7bff' },
  tone: 'dark',
  exit: 'stretch',
  blocks: [
    {
      type: 'text',
      label: 'Direction',
      heading: 'A website you can play.',
      body: 'A radial waveform sits at the centre of everything. With sound off it breathes on its own; with sound on, a synthesised loop feeds the Web Audio analyser and the rings, type and grain all follow the music.',
    },
    { type: 'scene', caption: 'Turn the sound on — the visual follows the analyser.' },
    { type: 'pull', text: 'Louder after midnight.' },
    {
      type: 'specs',
      label: 'Build notes',
      items: [
        ['Audio', 'Web Audio oscillators and filters, AnalyserNode frequency data'],
        ['Visual', '2D canvas, 180 radial bars, chromatic type offset'],
        ['Interaction', 'Cursor bends the nearest frequencies; touch supported'],
        ['Status', 'Self-initiated concept study'],
      ],
    },
  ],
}
