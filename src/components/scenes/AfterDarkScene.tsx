import { useEffect, useRef, useState } from 'react'
import type { SceneProps } from './types'

const BARS = 180

/** A tiny synthesised loop — a detuned pad, a kick and a filtered noise hat — fed to an analyser. */
function startSynth() {
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0.0001
  master.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 1.2)
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 512
  analyser.smoothingTimeConstant = 0.82
  master.connect(analyser)
  analyser.connect(ctx.destination)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 900
  filter.connect(master)
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.08
  lfoGain.gain.value = 600
  lfo.connect(lfoGain).connect(filter.frequency)
  lfo.start()
  ;[55, 82.4, 110, 164.8].forEach((f, i) => {
    const o = ctx.createOscillator()
    o.type = 'sawtooth'
    o.frequency.value = f
    o.detune.value = (i % 2 ? 1 : -1) * 7
    const g = ctx.createGain()
    g.gain.value = 0.09
    o.connect(g).connect(filter)
    o.start()
  })

  const bpm = 92
  const beat = 60 / bpm
  let next = ctx.currentTime + 0.1
  const noise = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
  noise.getChannelData(0).forEach((_, i, d) => (d[i] = Math.random() * 2 - 1))
  const schedule = () => {
    while (next < ctx.currentTime + 0.3) {
      const k = ctx.createOscillator()
      const kg = ctx.createGain()
      k.frequency.setValueAtTime(120, next)
      k.frequency.exponentialRampToValueAtTime(40, next + 0.25)
      kg.gain.setValueAtTime(0.9, next)
      kg.gain.exponentialRampToValueAtTime(0.001, next + 0.35)
      k.connect(kg).connect(master)
      k.start(next)
      k.stop(next + 0.4)
      const h = ctx.createBufferSource()
      h.buffer = noise
      const hf = ctx.createBiquadFilter()
      hf.type = 'highpass'
      hf.frequency.value = 7000
      const hg = ctx.createGain()
      hg.gain.value = 0.12
      h.connect(hf).connect(hg).connect(master)
      h.start(next + beat / 2)
      next += beat
    }
  }
  const timer = window.setInterval(schedule, 100)
  schedule()
  return {
    analyser,
    stop() {
      window.clearInterval(timer)
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)
      window.setTimeout(() => ctx.close(), 500)
    },
  }
}

/**
 * The record as an instrument: a radial waveform that breathes on its own,
 * bends toward the cursor, and follows a Web Audio analyser when sound is on.
 */
export function AfterDarkScene({ playing, variant }: SceneProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: -1, y: -1, active: false })
  const synth = useRef<ReturnType<typeof startSynth> | null>(null)
  const [sound, setSound] = useState(false)
  const canPlaySound = variant !== 'slide'

  useEffect(() => {
    if (!sound) return
    synth.current = startSynth()
    return () => {
      synth.current?.stop()
      synth.current = null
    }
  }, [sound])

  useEffect(() => {
    if (!playing && sound) setSound(false)
  }, [playing, sound])

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const g = c.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)
    let w = 0
    let h = 0
    const resize = () => {
      const r = c.getBoundingClientRect()
      w = r.width
      h = r.height
      c.width = Math.round(w * dpr)
      c.height = Math.round(h * dpr)
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true }
    }
    const onLeave = () => (pointer.current.active = false)
    c.addEventListener('pointermove', onMove)
    c.addEventListener('pointerleave', onLeave)

    const freq = new Uint8Array(256)
    const levels = new Float32Array(BARS)
    let raf = 0
    let t = 0

    const draw = () => {
      t += 1 / 60
      const cx = w / 2
      const cy = h / 2
      const base = Math.min(w, h) * 0.22
      const a = synth.current?.analyser
      if (a) a.getByteFrequencyData(freq)
      const p = pointer.current
      const pAngle = Math.atan2(p.y - cy, p.x - cx)

      g.fillStyle = 'rgba(3,3,3,0.34)'
      g.fillRect(0, 0, w, h)

      // Type, with a chromatic split that widens with the energy.
      let energy = 0
      for (let i = 0; i < BARS; i++) {
        const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2
        let v: number
        if (a) {
          v = freq[Math.floor((i < BARS / 2 ? i : BARS - i) * 0.9) + 2] / 255
        } else {
          v = 0.25 + 0.18 * Math.sin(i * 0.21 + t * 1.7) + 0.12 * Math.sin(i * 0.05 - t * 0.9) + 0.08 * Math.sin(t * 3.1 + i)
        }
        if (p.active) {
          const d = Math.abs(Math.atan2(Math.sin(angle - pAngle), Math.cos(angle - pAngle)))
          v += Math.max(0, 1 - d / 0.5) * 0.55
        }
        levels[i] += (v - levels[i]) * 0.25
        energy += levels[i]
      }
      energy /= BARS

      const split = 2 + energy * 14
      g.font = `300 ${Math.round(Math.min(w * (w < 600 ? 0.055 : 0.075), 96))}px "Inter Tight Variable", "Inter Tight", sans-serif`
      g.textAlign = 'center'
      g.textBaseline = 'middle'
      g.globalCompositeOperation = 'lighter'
      const title = 'LOUDER AFTER MIDNIGHT'
      g.fillStyle = 'rgba(143,123,255,0.55)'
      g.fillText(title, cx - split, cy)
      g.fillStyle = 'rgba(255,70,90,0.45)'
      g.fillText(title, cx + split, cy)
      g.fillStyle = 'rgba(245,245,240,0.85)'
      g.fillText(title, cx, cy)
      g.globalCompositeOperation = 'source-over'

      // Radial bars.
      for (let i = 0; i < BARS; i++) {
        const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2
        const len = 6 + levels[i] * base * 0.9
        const r0 = base * 1.35
        g.strokeStyle = `rgba(245,245,240,${0.25 + levels[i] * 0.7})`
        g.lineWidth = 1.4
        g.beginPath()
        g.moveTo(cx + Math.cos(angle) * r0, cy + Math.sin(angle) * r0)
        g.lineTo(cx + Math.cos(angle) * (r0 + len), cy + Math.sin(angle) * (r0 + len))
        g.stroke()
      }
      // Rings.
      for (let k = 0; k < 3; k++) {
        g.strokeStyle = `rgba(143,123,255,${0.18 - k * 0.05})`
        g.beginPath()
        g.arc(cx, cy, base * (1.2 - k * 0.12) + energy * 30 * (k + 1), 0, Math.PI * 2)
        g.stroke()
      }
    }
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }

    g.fillStyle = '#030303'
    g.fillRect(0, 0, w, h)
    // Settle a few frames so a paused scene still shows a finished drawing.
    for (let i = 0; i < 24; i++) draw()
    if (playing) raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      c.removeEventListener('pointermove', onMove)
      c.removeEventListener('pointerleave', onLeave)
    }
  }, [playing])

  return (
    <div className={`scene scene--afterdark scene--${variant}`}>
      <canvas ref={canvas} className="scene__canvas" aria-label="Audio-reactive waveform with the words After Dark" role="img" />
      <p className="ad__tracklist meta" aria-hidden="true">
        <span>A1 — Lagos, 3 a.m.</span>
        <span>A2 — Blue Hour</span>
        <span>B1 — Louder After Midnight</span>
      </p>
      {canPlaySound && (
        <button className="ad__sound meta" onClick={() => setSound((s) => !s)} aria-pressed={sound} data-cursor="Play">
          Sound {sound ? 'on' : 'off'}
        </button>
      )}
    </div>
  )
}
