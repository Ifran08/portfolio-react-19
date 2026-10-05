import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'

function Magnetic({ href, children, bg, fg }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 14 })
  const y = useSpring(0, { stiffness: 220, damping: 14 })
  const move = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.45)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={move}
      onPointerLeave={leave}
      whileTap={{ scale: 0.94 }}
      style={{ x, y, background: bg, color: fg }}
      data-cursor="Go"
      className="inline-block border-[2.5px] border-ink px-8 py-5 font-display text-[clamp(18px,2.6vw,26px)] font-extrabold tracking-[-0.03em] shadow-[7px_7px_0_var(--shadow)]"
    >
      {children}
    </motion.a>
  )
}

export default function Cta() {
  const reduce = useReducedMotion()
  return (
    <section className="mx-auto max-w-[1120px] px-[26px] pb-10 pt-16">
      <motion.h2
        initial={reduce ? false : { y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        className="max-w-[12em] font-display text-[clamp(36px,8vw,100px)] font-extrabold leading-[.98] tracking-[-0.035em] text-ink"
      >
        Now see them at work.
      </motion.h2>
      <div className="mt-10 flex flex-wrap gap-6">
        <Magnetic href="#/work" bg="#FFC83D" fg="#1E0A0C">
          See the projects
        </Magnetic>
        <Magnetic href="#/contact" bg="#9C0012" fg="#FFF3D6">
          Say hello
        </Magnetic>
      </div>
    </section>
  )
}
