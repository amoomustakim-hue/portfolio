import { SCRIPT } from './chat'

/**
 * Draws the WhatsApp thread onto a canvas for the 3D phone's screen.
 * Resolution-independent text, so the screen stays sharp at any size.
 * `count` messages are shown, newest at the bottom.
 */
export function drawPhoneScreen(canvas: HTMLCanvasElement, count: number) {
  const W = canvas.width
  const H = canvas.height
  const g = canvas.getContext('2d')!
  const s = W / 390 // design at 390pt wide
  const R = 54 * s

  g.clearRect(0, 0, W, H)
  g.save()
  roundRect(g, 0, 0, W, H, R)
  g.clip()

  // Chat wallpaper
  g.fillStyle = '#0b141a'
  g.fillRect(0, 0, W, H)
  g.globalAlpha = 0.045
  g.strokeStyle = '#ffffff'
  g.lineWidth = 1.2 * s
  for (let y = 0; y < H; y += 46 * s)
    for (let x = (y / (46 * s)) % 2 ? 23 * s : 0; x < W; x += 46 * s) {
      g.beginPath()
      g.arc(x, y, 7 * s, 0, Math.PI * 1.4)
      g.stroke()
    }
  g.globalAlpha = 1

  const font = (weight: number, size: number) => `${weight} ${size * s}px -apple-system, "Inter Tight Variable", "Helvetica Neue", Arial, sans-serif`
  const pad = 14 * s
  const bubbleMax = 300 * s
  const header = 104 * s
  const footer = 84 * s

  // Lay out bubbles bottom-up so the newest sits above the input bar.
  const shown = SCRIPT.slice(0, count)
  type Laid = { from: string; rows: { text: string; bold?: boolean; link?: boolean }[]; w: number; h: number; time: string }
  const laid: Laid[] = shown.map((m) => {
    const rows: Laid['rows'] = []
    g.font = font(400, 15)
    m.lines.forEach((line, i) => {
      const bold = m.title && i === 0
      g.font = font(bold ? 600 : 400, 15)
      wrap(g, line, bubbleMax - pad * 2).forEach((t) => rows.push({ text: t, bold }))
    })
    if (m.link) rows.push({ text: m.link, link: true })
    let w = 0
    rows.forEach((r) => {
      g.font = font(r.bold ? 600 : 400, 15)
      w = Math.max(w, g.measureText(r.text).width)
    })
    w = Math.min(bubbleMax, w + pad * 2 + 38 * s)
    return { from: m.from, rows, w, h: rows.length * 20 * s + 30 * s, time: m.time }
  })

  let y = H - footer - 10 * s
  for (let i = laid.length - 1; i >= 0 && y > header; i--) {
    const b = laid[i]
    y -= b.h
    const x = b.from === 'me' ? W - b.w - 12 * s : 12 * s
    g.fillStyle = b.from === 'me' ? '#005c4b' : '#202c33'
    roundRect(g, x, y, b.w, b.h, 12 * s)
    g.fill()
    b.rows.forEach((r, k) => {
      g.font = font(r.bold ? 600 : 400, 15)
      g.fillStyle = r.link ? '#53bdeb' : '#e9edef'
      g.fillText(r.text, x + pad, y + 24 * s + k * 20 * s)
      if (r.link) g.fillRect(x + pad, y + 27 * s + k * 20 * s, g.measureText(r.text).width, 1 * s)
    })
    g.font = font(400, 11)
    g.fillStyle = 'rgba(233,237,239,0.6)'
    g.textAlign = 'right'
    g.fillText(b.time, x + b.w - 10 * s, y + b.h - 8 * s)
    g.textAlign = 'left'
    y -= 8 * s
  }

  // Header
  g.fillStyle = '#1f2c34'
  g.fillRect(0, 0, W, header)
  g.fillStyle = '#e9edef'
  g.font = font(600, 16)
  g.fillText('06:07', 34 * s, 36 * s)
  g.fillText('‹  66', 14 * s, 80 * s)
  g.fillStyle = '#e8150e'
  g.beginPath()
  g.arc(92 * s, 74 * s, 17 * s, 0, Math.PI * 2)
  g.fill()
  g.fillStyle = '#fff'
  g.font = font(700, 15)
  g.textAlign = 'center'
  g.fillText('C', 92 * s, 79 * s)
  g.textAlign = 'left'
  g.fillStyle = '#e9edef'
  g.font = font(600, 17)
  g.fillText('cravvingss', 118 * s, 80 * s)
  // Status bar icons
  g.fillRect(W - 62 * s, 26 * s, 26 * s, 12 * s)

  // Dynamic island
  g.fillStyle = '#000'
  roundRect(g, W / 2 - 62 * s, 12 * s, 124 * s, 34 * s, 17 * s)
  g.fill()

  // Input bar
  g.fillStyle = '#1f2c34'
  g.fillRect(0, H - footer, W, footer)
  g.fillStyle = '#2a3942'
  roundRect(g, 46 * s, H - footer + 14 * s, W - 110 * s, 38 * s, 19 * s)
  g.fill()
  g.fillStyle = '#e9edef'
  g.font = font(300, 28)
  g.fillText('+', 16 * s, H - footer + 44 * s)

  g.restore()
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath()
  g.moveTo(x + r, y)
  g.arcTo(x + w, y, x + w, y + h, r)
  g.arcTo(x + w, y + h, x, y + h, r)
  g.arcTo(x, y + h, x, y, r)
  g.arcTo(x, y, x + w, y, r)
  g.closePath()
}

function wrap(g: CanvasRenderingContext2D, text: string, max: number) {
  const words = text.split(' ')
  const out: string[] = []
  let line = ''
  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    if (g.measureText(next).width > max && line) {
      out.push(line)
      line = w
    } else line = next
  }
  if (line) out.push(line)
  return out
}
