import { IDENTITY } from '../config/site'

/** The reference's giant pixel lettering, sliding sideways between the work and the experience. */
export function PixelName() {
  const text = `${IDENTITY.searchName} · ${IDENTITY.alias} · `
  return (
    <div className="pixel" aria-hidden>
      <div className="pixel-track">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  )
}
