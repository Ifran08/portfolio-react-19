import { Fragment } from 'react'

// Splits text into letters that fly in one by one and jump when you hover them.
export default function Split({ children, base = 0, wave = false }) {
  const text = String(children)
  const words = text.split(' ')
  const total = text.replace(/ /g, '').length
  let n = 0
  const done = (e) => {
    if (e.animationName !== 'chIn') return
    const l = e.currentTarget.closest('.l')
    if (l) l.classList.add('free')
  }
  return (
    <span className={'split' + (wave ? ' wave' : '')} style={{ '--d': base + 's' }}>
      <span className="sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <Fragment key={wi}>
            <span className="w">
              {[...w].map((c) => {
                const i = n++
                return (
                  <span key={i} className="ch" style={{ '--i': i, '--s': i % 2 ? -1 : 1 }} onAnimationEnd={i === total - 1 ? done : undefined}>
                    {c}
                  </span>
                )
              })}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </span>
    </span>
  )
}
