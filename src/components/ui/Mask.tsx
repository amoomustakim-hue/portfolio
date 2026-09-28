import type { ReactNode } from 'react'

type Tag = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'blockquote'

type MaskProps = { lines: ReactNode[]; as?: Tag; className?: string; lineClassName?: string }

/** Lines wrapped in overflow masks; scenes animate `.mask__inner` for clipped reveals. */
export function Mask({ lines, as: Tag = 'span', className, lineClassName = '' }: MaskProps) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span className={`mask ${lineClassName}`} key={i}>
          <span className="mask__inner">{line}</span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * Text split into masked characters (`.char`), grouped per word in a no-wrap
 * span so lines only ever break between words.
 */
export function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((word, w) => (
        <span key={w} style={{ display: 'contents' }} aria-hidden="true">
          {w > 0 && ' '}
          <span className="word">
            {Array.from(word).map((ch, c) => (
              <span className="mask mask--char" key={c}>
                <span className="mask__inner char">{ch}</span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}
