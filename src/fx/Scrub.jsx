import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

function Word({ w, i, n, p }) {
  const s = i / n
  const e = s + 1.4 / n
  const o = useTransform(p, [s, Math.min(e, 1)], [0.13, 1])
  const y = useTransform(p, [s, Math.min(e, 1)], [10, 0])
  return (
    <>
      <motion.span style={{ opacity: o, y, display: 'inline-block' }}>{w}</motion.span>{' '}
    </>
  )
}

// A big sentence whose words light up one by one as you scroll past it.
export default function Scrub({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'end 0.5'] })
  const words = text.split(' ')
  if (reduce) return <p className={'scrub ' + className}>{text}</p>
  return (
    <p ref={ref} className={'scrub ' + className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />
      ))}
    </p>
  )
}
