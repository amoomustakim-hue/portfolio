import { SKILLS } from '../config/site'

/**
 * "How can I help?": the reference's dark banner over a hand-drawn squiggle pattern (drawn here as an SVG pattern), with the
 * tools sliding along underneath.
 */
export function Help() {
  const chips = [...SKILLS.Development, ...SKILLS.Design]
  return (
    <section className="help" aria-labelledby="help-title">
      <svg className="help-pattern" aria-hidden>
        <defs>
          <pattern id="doodle" width="220" height="180" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#262626" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 30c18-22 40 18 58-4s30-10 40 6" />
              <path d="M150 20c10 14 30 10 34 26s-12 28 4 40" />
              <circle cx="40" cy="96" r="16" />
              <path d="M90 70l26 10-14 22-22-12z" />
              <path d="M140 120c20-8 34 6 50-2" />
              <path d="M20 150c10-12 24-12 32 0s22 12 32 0" />
              <path d="M118 160v-22M108 149h20" />
              <path d="M196 140c-8 10-2 24 12 24" />
              <path d="M70 130c4 8 12 10 18 4" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#doodle)" />
      </svg>
      <div className="help-inner">
        <h2 id="help-title">How can I help?</h2>
        <p>Let's turn your idea into something people actually use.</p>
        <div className="chips" aria-label="Tools I work with">
          <div className="chips-track">
            {[...chips, ...chips].map((c, i) => (
              <span key={i} className="chip" aria-hidden={i >= chips.length}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
