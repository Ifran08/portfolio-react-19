import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// A big scrolling text band. It speeds up and skews when you scroll, and flips direction when you scroll back up.
export default function Marquee({ items, reverse = false, speed = 3, variant = 'outline', tilt = 0 }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(vel, [-3000, 0, 3000], [-6, 0, 6])
  const skew = useTransform(vel, [-3000, 0, 3000], [-9, 0, 9])
  const tx = useTransform(x, (v) => wrap(-25, 0, v) + '%')
  const base = reverse ? 1 : -1

  useAnimationFrame((_, d) => {
    if (reduce) return
    const b = boost.get()
    const flip = b < -0.4 ? -1 : 1
    x.set(x.get() + base * flip * speed * (1 + Math.abs(b)) * (d / 1000))
  })

  const set = (k) => (
    <div className="mq-set" key={k} aria-hidden={k > 0 ? 'true' : undefined}>
      {items.map((t, i) => (
        <span key={i} className="mq-item">
          <span>{t}</span>
          <i />
        </span>
      ))}
    </div>
  )

  return (
    <motion.div className={'mq mq-' + variant} style={{ skewX: reduce ? 0 : skew, rotate: tilt }}>
      <motion.div className="mq-track" style={{ x: tx }}>
        {[0, 1, 2, 3].map(set)}
      </motion.div>
    </motion.div>
  )
}
