import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const SHAPES = [
  { k: 'plus', x: '3%', y: '12%', s: 46, c: 'var(--sun)', f: 0.18, d: 1 },
  { k: 'ring', x: '90%', y: '20%', s: 74, c: 'var(--red)', f: -0.12, d: 1.6 },
  { k: 'star', x: '6%', y: '46%', s: 62, c: 'var(--rose)', f: 0.25, d: 2.2 },
  { k: 'tri', x: '92%', y: '56%', s: 54, c: 'var(--sun)', f: -0.2, d: 1.2 },
  { k: 'squig', x: '2%', y: '78%', s: 96, c: 'var(--red)', f: 0.1, d: 1.8 },
  { k: 'dot', x: '88%', y: '84%', s: 34, c: 'var(--ink)', f: -0.3, d: 2.6 },
  { k: 'plus', x: '46%', y: '94%', s: 30, c: 'var(--red)', f: 0.15, d: 1.4 },
  { k: 'star', x: '64%', y: '6%', s: 36, c: 'var(--sun)', f: -0.1, d: 2 },
]

const Shape = ({ k, c }) => {
  const p = { fill: c }
  const l = { fill: 'none', stroke: c, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (k === 'plus') return <path {...p} d="M40 5h20v35h35v20H60v35H40V60H5V40h35z" />
  if (k === 'ring') return <circle {...l} cx="50" cy="50" r="38" strokeWidth="14" />
  if (k === 'star') return <polygon {...p} points="50,2 61,35 95,25 72,50 95,75 61,65 50,98 39,65 5,75 28,50 5,25 39,35" />
  if (k === 'tri') return <polygon {...l} points="50,10 92,86 8,86" strokeWidth="10" />
  if (k === 'squig') return <path {...l} d="M4 60 q 12 -44 24 0 t 24 0 t 24 0 t 20 0" strokeWidth="9" />
  return <circle {...p} cx="50" cy="50" r="40" />
}

function Item({ sh, i, mx, my, scrollY, reduce }) {
  const py = useTransform(scrollY, (v) => v * sh.f)
  const px = useTransform(mx, (v) => v * 40 * sh.d)
  const qy = useTransform(my, (v) => v * 40 * sh.d)
  const yy = useTransform([py, qy], ([a, b]) => a + b)
  return (
    <motion.i style={{ left: sh.x, top: sh.y, width: sh.s, height: sh.s, x: px, y: yy }}>
      <motion.svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        animate={reduce ? undefined : { rotate: [0, i % 2 ? -360 : 360], scale: [1, 1.15, 1] }}
        transition={{ rotate: { duration: 22 + i * 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <Shape k={sh.k} c={sh.c} />
      </motion.svg>
    </motion.i>
  )
}

// Shapes floating behind everything. They drift with your scroll and lean away from the mouse.
export default function Bg() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const mx = useSpring(rx, { stiffness: 40, damping: 20 })
  const my = useSpring(ry, { stiffness: 40, damping: 20 })
  useEffect(() => {
    const m = (e) => {
      rx.set(e.clientX / window.innerWidth - 0.5)
      ry.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', m, { passive: true })
    return () => window.removeEventListener('pointermove', m)
  }, [])
  return (
    <div className="bgs" aria-hidden="true">
      {SHAPES.map((sh, i) => (
        <Item key={i} sh={sh} i={i} mx={mx} my={my} scrollY={scrollY} reduce={reduce} />
      ))}
    </div>
  )
}
