import { useEffect, useMemo, useRef, useState } from 'react'
import { DESIGN, DEVELOPMENT } from '../content/work'
import { HACKATHONS } from '../config/site'
import { GitHubIcon } from './icons'

/**
 * A live look at my GitHub: contributions this year, the current and longest streak, and the year as a grid of days. It reads
 * the public contribution calendar when the page opens, so the numbers are always today's. If GitHub can't be reached the
 * GitHub tiles and grid are simply left out.
 */
const USER = 'amoomustakim-hue'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
type Data = { total: number; days: Day[] }

const fmt = (d: string, withYear = false) =>
  new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', ...(withYear ? { year: 'numeric' } : {}) })

function streaks(days: Day[]) {
  let longest = { len: 0, from: '', to: '' }
  let run = { len: 0, from: '' }
  for (const d of days) {
    if (d.count > 0) {
      run = run.len ? { len: run.len + 1, from: run.from } : { len: 1, from: d.date }
      if (run.len > longest.len) longest = { len: run.len, from: run.from, to: d.date }
    } else run = { len: 0, from: '' }
  }
  // Today still counts as "on a streak" before the first push of the day.
  let i = days.length - 1
  if (i >= 0 && days[i]!.count === 0) i--
  let len = 0
  while (i >= 0 && days[i]!.count > 0) {
    len++
    i--
  }
  const current = len ? { len, from: days[i + 1]!.date, to: days[i + len]!.date } : { len: 0, from: '', to: '' }
  return { current, longest }
}

export function GitHubStats() {
  const [data, setData] = useState<Data | null | 'off'>(null)
  useEffect(() => {
    let on = true
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: { total: { lastYear: number }; contributions: Day[] }) => {
        const today = new Date().toISOString().slice(0, 10)
        if (on) setData({ total: j.total.lastYear, days: j.contributions.filter((d) => d.date <= today) })
      })
      .catch(() => on && setData('off'))
    return () => {
      on = false
    }
  }, [])

  const s = useMemo(() => (data && data !== 'off' ? streaks(data.days) : null), [data])
  const weeks = useMemo(() => {
    if (!data || data === 'off') return []
    const pad = new Date(data.days[0]!.date + 'T12:00:00').getDay()
    const cells: (Day | null)[] = [...Array(pad).fill(null), ...data.days]
    const out: (Day | null)[][] = []
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7))
    return out
  }, [data])

  // On a phone the grid scrolls sideways: start at today, not a year ago.
  const scroller = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth
  }, [weeks])

  const live = data && data !== 'off'
  const projects = DEVELOPMENT.length + DESIGN.length

  return (
    <section className="gh" aria-labelledby="gh-title">
      <h2 id="gh-title" className="sr-only">
        On GitHub
      </h2>
      <div className={`gh-tiles ${data === 'off' ? 'gh-tiles-2' : ''}`}>
        {data !== 'off' ? (
          <>
            <div className="gh-tile">
              <p className="gh-label">
                <GitHubIcon /> Contributions
              </p>
              <p className="gh-num">{live ? data.total.toLocaleString('en-GB') : '·'}</p>
              <p className="gh-sub">in the last year</p>
            </div>
            <div className="gh-tile">
              <p className="gh-label">
                <GitHubIcon /> Current streak
              </p>
              <p className="gh-num">
                {s ? `${s.current.len}d` : '·'}
                {s && s.current.len ? <span className="gh-range">{`${fmt(s.current.from)} to ${fmt(s.current.to)}`}</span> : null}
              </p>
              <p className="gh-sub">{s && s.longest.len ? `Longest ${s.longest.len}d, ${fmt(s.longest.from)} to ${fmt(s.longest.to)}` : ' '}</p>
            </div>
          </>
        ) : null}
        <div className="gh-tile">
          <p className="gh-label">Hackathon podiums</p>
          <p className="gh-num">{HACKATHONS.list.length}×</p>
          <p className="gh-sub">two of them first place</p>
        </div>
        <div className="gh-tile">
          <p className="gh-label">Live projects</p>
          <p className="gh-num">{projects}</p>
          <p className="gh-sub">built and designed</p>
        </div>
      </div>

      {data !== 'off' ? (
        <div className="gh-cal">
          <div className="gh-cal-scroll" ref={scroller}>
            <div className="gh-months" aria-hidden>
              {weeks.map((w, i) => {
                const first = w.find((d) => d && d.date.endsWith('-01'))
                return <span key={i}>{first ? MONTHS[Number(first.date.slice(5, 7)) - 1] : ''}</span>
              })}
            </div>
            <div className="gh-grid" role="img" aria-label={live ? `${data.total} contributions on GitHub in the last year` : 'Loading GitHub activity'}>
              {(live ? weeks : Array.from({ length: 53 }, () => Array(7).fill(null))).map((w, i) => (
                <div key={i} className="gh-week">
                  {w.map((d, j) => (
                    <i key={j} className={d ? `l${d.level}` : live ? 'gh-empty' : ''} title={d ? `${d.count} on ${fmt(d.date, true)}` : undefined} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="gh-foot">
            <a href={`https://github.com/${USER}`} target="_blank" rel="noopener">
              {live ? `${data.total.toLocaleString('en-GB')} contributions in the last year` : 'Loading from GitHub'} ↗
            </a>
            <span className="gh-key" aria-hidden>
              Less <i className="l0" />
              <i className="l1" />
              <i className="l2" />
              <i className="l3" />
              <i className="l4" /> More
            </span>
          </div>
        </div>
      ) : null}
    </section>
  )
}
