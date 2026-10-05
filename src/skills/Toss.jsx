import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { CATS, SKILLS } from './data.js'

function rng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function scatter(n, w, h, seed) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({
    x: 10 + r() * Math.max(0, w - 20 - (44 + SKILLS[i].name.length * 11)),
    y: 10 + r() * Math.max(10, h - 64),
    rotate: (r() - 0.5) * 26,
  }))
}

export default function Toss() {
  const reduce = useReducedMotion()
  const box = useRef(null)
  const inView = useInView(box, { once: true, amount: 0.25 })
  const [width, setWidth] = useState(0)
  const [seed, setSeed] = useState(7)
  const [shaken, setShaken] = useState(false)
  const [zs, setZs] = useState({})
  const z = useRef(1)

  useLayoutEffect(() => {
    const el = box.current
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const height = 440
  const spots = useMemo(() => (width ? scatter(SKILLS.length, width, height, seed) : null), [width, seed])

  const shake = () => {
    setShaken(true)
    setSeed(Math.floor(Math.random() * 1e6))
  }

  return (
    <section className="mx-auto max-w-[1120px] px-[26px] py-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-[clamp(32px,6vw,68px)] font-extrabold leading-[.95] tracking-[-0.04em] text-ink">
            Toss them around.
          </h2>
          <p className="mt-4 max-w-[28em] text-[20px] leading-[1.5] text-ink">
            Every skill, as a sticker. Grab one and throw it. It bounces off the walls.
          </p>
        </div>
        <motion.button
          type="button"
          onClick={shake}
          whileHover={reduce ? undefined : { rotate: -3, y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="border-[2.5px] border-ink bg-sun px-6 py-3 font-display text-[16px] font-bold text-[#1E0A0C] shadow-[5px_5px_0_var(--shadow)]"
        >
          Shake the box
        </motion.button>
      </div>

      <div
        ref={box}
        aria-hidden="true"
        className="relative mt-8 overflow-hidden border-[2.5px] border-ink bg-cream shadow-[8px_8px_0_var(--shadow)]"
        style={{ height }}
      >
        <div className="dots pointer-events-none absolute inset-0 opacity-[.16]" />
        <span className="pointer-events-none absolute bottom-4 right-5 rotate-[-4deg] font-hand text-[30px] leading-none text-hot">go on, drag one</span>
        {spots &&
          SKILLS.map((s, i) => {
            const c = CATS[s.cat]
            const sp = spots[i]
            const hidden = { x: sp.x, y: -150, rotate: sp.rotate * 3, opacity: 0 }
            return (
              <motion.div
                key={s.id}
                drag
                dragConstraints={box}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 240, bounceDamping: 14, power: 0.55, timeConstant: 260 }}
                whileDrag={{ scale: 1.14, rotate: 0 }}
                whileHover={reduce ? undefined : { scale: 1.07 }}
                initial={reduce ? { x: sp.x, y: sp.y, rotate: sp.rotate, opacity: 1 } : hidden}
                animate={inView || reduce ? { x: sp.x, y: sp.y, rotate: sp.rotate, opacity: 1 } : hidden}
                transition={{ type: 'spring', stiffness: 70, damping: 9, mass: 1.1, delay: inView && !reduce ? (shaken ? i * 0.012 : i * 0.05) : 0 }}
                onPointerDown={() => {
                  z.current += 1
                  setZs((p) => ({ ...p, [s.id]: z.current }))
                }}
                data-cursor="Drag"
                className="absolute left-0 top-0 cursor-grab touch-none select-none whitespace-nowrap border-[2.5px] border-ink px-4 py-2 font-display text-[14px] font-bold shadow-[4px_4px_0_var(--shadow)] active:cursor-grabbing"
                style={{ background: c.bg, color: c.fg, zIndex: zs[s.id] ?? 1 }}
              >
                {s.name}
              </motion.div>
            )
          })}
      </div>
    </section>
  )
}
