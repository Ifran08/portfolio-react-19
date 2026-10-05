import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { mouseX, mouseY } from './hooks.js'
import { CATS, SKILLS, WORK_COUNT } from './data.js'

// One letter. It springs in on load, then swells and lifts when the cursor gets close.
function Letter({ ch, i, reduce }) {
  const ref = useRef(null)
  const near = useTransform([mouseX, mouseY], ([x, y]) => {
    const el = ref.current
    if (!el) return 0
    const r = el.getBoundingClientRect()
    const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2))
    return Math.max(0, 1 - d / 280)
  })
  const s = useSpring(near, { stiffness: 260, damping: 15 })
  const scale = useTransform(s, (v) => 1 + v * 0.34)
  const y = useTransform(s, (v) => -v * 30)
  const rotate = useTransform(s, (v) => v * (i % 2 ? 7 : -7))

  return (
    <motion.span
      aria-hidden="true"
      className="inline-block"
      initial={reduce ? false : { y: 120, opacity: 0, rotate: 16 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.15 + i * 0.08 }}
    >
      <motion.span ref={ref} className="inline-block" style={reduce ? undefined : { scale, y, rotate }}>
        {ch}
      </motion.span>
    </motion.span>
  )
}

function Stat({ to, label, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setN(to)
      return
    }
    const c = animate(0, to, { duration: 1.4, delay, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, delay, reduce])
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.9 + delay }}
      whileHover={reduce ? undefined : { y: -4, rotate: -2 }}
      className="border-[2.5px] border-ink bg-cream px-5 py-3 shadow-[5px_5px_0_var(--shadow)]"
    >
      <span className="block font-display text-[34px] font-extrabold leading-none tabular-nums text-hot">{n}</span>
      <span className="mt-1 block text-[15px] font-bold text-ink">{label}</span>
    </motion.div>
  )
}

function Badge({ reduce }) {
  const text = 'frontend + backend + data + shipping + learning + '
  return (
    <div className="relative h-[190px] w-[190px] lg:h-[220px] lg:w-[220px]">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="98" fill="#FFC83D" stroke="var(--ink)" strokeWidth="3" />
        <defs>
          <path id="badgePath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text fontFamily="Unbounded" fontWeight="700" fontSize="13.5" fill="#1E0A0C">
          <textPath href="#badgePath" textLength="446" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1E0A0C]">
        <span className="font-display text-[54px] font-extrabold leading-none">{SKILLS.length}</span>
        <span className="mt-1 text-[15px] font-bold">skills</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const burstRot = useTransform(scrollY, [0, 900], [0, 200])
  const sunY = useTransform(scrollY, [0, 600], [0, -90])
  const word = 'Skills'.split('')

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1120px] px-[26px] pb-10 pt-12 sm:pt-16">
        <div className="pointer-events-none absolute right-[26px] top-[8px] hidden sm:block">
          <motion.div
            initial={reduce ? false : { scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 11, delay: 0.7 }}
            className="pointer-events-auto"
          >
            <Badge reduce={reduce} />
          </motion.div>
        </div>

        <motion.svg
          aria-hidden="true"
          viewBox="-50 -50 100 100"
          style={{ rotate: burstRot }}
          className="pointer-events-none absolute bottom-5 right-[4%] hidden h-[130px] w-[130px] sm:block"
        >
          <path
            d="M0,-46 L9,-22 L34,-32 L22,-9 L46,0 L22,9 L34,32 L9,22 L0,46 L-9,22 L-34,32 L-22,9 L-46,0 L-22,-9 L-34,-32 L-9,-22 Z"
            fill="#9C0012"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </motion.svg>

        <motion.div
          aria-hidden="true"
          style={{ y: sunY }}
          className="pointer-events-none absolute right-[34%] top-[36px] hidden h-9 w-9 rounded-full border-[2.5px] border-ink bg-rose lg:block"
        />

        <h1 aria-label="Skills." className="font-display text-[clamp(60px,15vw,190px)] font-extrabold leading-[.95] tracking-[-0.045em] text-ink">
          {word.map((ch, i) => (
            <Letter key={i} ch={ch} i={i} reduce={reduce} />
          ))}
          <motion.span
            aria-hidden="true"
            className="ml-[0.04em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-brand"
            initial={reduce ? false : { scale: 0 }}
            animate={reduce ? { scale: 1 } : { scale: 1, y: [0, -34, 0, -12, 0] }}
            transition={{ delay: 1.1, duration: 1.2, times: [0, 0.35, 0.6, 0.8, 1], repeat: reduce ? 0 : Infinity, repeatDelay: 2.6 }}
          />
        </h1>

        <motion.svg
          aria-hidden="true"
          viewBox="0 0 600 24"
          preserveAspectRatio="none"
          className="mt-1 h-[18px] w-[min(520px,80%)]"
        >
          <motion.path
            d="M4 14 C 90 2, 170 22, 260 10 S 440 4, 596 12"
            fill="none"
            stroke="#FFC83D"
            strokeWidth="9"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 1, ease: 'easeInOut' }}
          />
        </motion.svg>

        <motion.p
          initial={reduce ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 max-w-[30em] text-[clamp(18px,2.4vw,23px)] leading-[1.5] text-ink"
        >
          {SKILLS.length} things I use to build websites from the first sketch to the live link. Tap a card to flip it and see where I used it.
        </motion.p>

        <motion.span
          initial={reduce ? false : { opacity: 0, rotate: -12 }}
          animate={{ opacity: 1, rotate: -4 }}
          transition={{ delay: 1.6 }}
          className="mt-4 inline-block font-hand text-[34px] leading-none text-hot"
        >
          (yes, they flip!)
        </motion.span>

        <div className="mt-8 flex flex-wrap gap-5">
          <Stat to={SKILLS.length} label="skills" />
          <Stat to={Object.keys(CATS).length} label="areas" delay={0.12} />
          <Stat to={WORK_COUNT} label="projects" delay={0.24} />
        </div>
      </div>
    </section>
  )
}
