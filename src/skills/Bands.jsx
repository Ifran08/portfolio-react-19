import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { SKILLS } from './data.js'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// A strip of skill names that keeps moving, speeds up and leans when you scroll,
// and turns around when you scroll the other way.
function Band({ names, base, tone }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const skew = useTransform(smooth, [-2200, 0, 2200], [10, 0, -10])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * base * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <motion.div
      style={{ skewX: reduce ? 0 : skew, background: tone.bg, color: tone.fg }}
      className="overflow-hidden border-y-[3px] border-ink"
    >
      <motion.div style={reduce ? undefined : { x }} className="flex w-max whitespace-nowrap font-display text-[clamp(20px,3.2vw,38px)] font-extrabold tracking-[-0.03em]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0" aria-hidden="true">
            {names.map((n, i) => (
              <span key={i} className="flex items-center gap-6 px-6 py-3">
                {n}
                <span className="text-[0.8em]">+</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Bands() {
  const names = SKILLS.map((s) => s.name)
  const reversed = [...names].reverse()
  return (
    <section aria-hidden="true" className="relative my-6 overflow-hidden py-12">
      <div className="relative h-[150px] md:h-[170px]">
        <div className="absolute left-[-6%] top-0 w-[112%] -rotate-[2.5deg]">
          <Band names={names} base={-3.2} tone={{ bg: '#9C0012', fg: '#FFF3D6' }} />
        </div>
        <div className="absolute left-[-6%] top-[62px] w-[112%] rotate-[2deg] md:top-[70px]">
          <Band names={reversed} base={3.6} tone={{ bg: '#FFC83D', fg: '#1E0A0C' }} />
        </div>
      </div>
    </section>
  )
}
