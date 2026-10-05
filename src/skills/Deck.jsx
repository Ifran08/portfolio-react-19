import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { CATS, SKILLS } from './data.js'

function Atom({ color }) {
  return (
    <motion.svg
      viewBox="-50 -50 100 100"
      width="104"
      height="104"
      fill="none"
      stroke={color}
      strokeWidth="3.2"
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: 'linear', duration: 16 }}
    >
      <ellipse rx="44" ry="17" />
      <ellipse rx="44" ry="17" transform="rotate(60)" />
      <ellipse rx="44" ry="17" transform="rotate(120)" />
      <circle r="6" fill={color} stroke="none" />
    </motion.svg>
  )
}

const glyphSize = (g) => (g.length <= 1 ? 104 : g.length === 2 ? 88 : g.length === 3 ? 70 : 58)

function SkillCard({ skill, index, immediate }) {
  const cat = CATS[skill.cat]
  const reduce = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const [hot, setHot] = useState(false)
  const tiltRef = useRef(null)
  const rx = useSpring(0, { stiffness: 220, damping: 18 })
  const ry = useSpring(0, { stiffness: 220, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.4), transparent 55%)`

  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch' || !tiltRef.current) return
    const r = tiltRef.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 20)
    rx.set(-(py - 0.5) * 20)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    setHot(false)
  }

  const face = 'face no-backface col-start-1 row-start-1 flex min-h-[340px] w-full flex-col justify-between gap-5 border-[2.5px] border-ink p-6 shadow-[7px_7px_0_var(--shadow)]'

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 70, rotate: index % 2 ? 5 : -5, scale: 0.92 }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0, rotate: 0, scale: 1 } }
        : { whileInView: { opacity: 1, y: 0, rotate: 0, scale: 1 }, viewport: { once: true, margin: '0px 0px -60px 0px' } })}
      exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
      transition={{ type: 'spring', stiffness: 110, damping: 14, delay: (index % 3) * 0.08 }}
      className="relative"
    >
      <div className="persp">
        <motion.div
          ref={tiltRef}
          className="preserve-3d"
          style={{ rotateX: rx, rotateY: ry }}
          onPointerMove={onMove}
          onPointerEnter={() => setHot(true)}
          onPointerLeave={onLeave}
        >
          <motion.div
            className="preserve-3d grid"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 80, damping: 13 }}
          >
            {/* front */}
            <button
              type="button"
              inert={flipped}
              onClick={() => setFlipped(true)}
              aria-label={`${skill.name}. Flip the card to see where I used it`}
              data-cursor="Flip"
              className={`${face} relative cursor-pointer overflow-hidden text-left`}
              style={{ background: cat.bg, color: cat.fg, '--gfg': cat.fg, '--gac': cat.accent }}
            >
              <span className="flex w-full items-start justify-between text-[15px] font-bold">
                <span>{cat.label}</span>
                <span aria-hidden="true" className="text-[22px] leading-none">
                  ↻
                </span>
              </span>
              <span className="flex min-h-[110px] items-center" aria-hidden="true">
                {skill.glyph === 'atom' ? (
                  <Atom color={cat.fg} />
                ) : (
                  <span className="glyph font-display font-extrabold tracking-[-0.04em]" style={{ fontSize: glyphSize(skill.glyph) }}>
                    {skill.glyph}
                  </span>
                )}
              </span>
              <span className="block">
                <span className="block font-display text-[23px] font-extrabold leading-[1.05] tracking-[-0.04em]">{skill.name}</span>
                <span className="mt-2 block text-[16px] leading-[1.4]">{skill.blurb}</span>
              </span>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: glare, opacity: hot && !reduce ? 1 : 0, transition: 'opacity .25s' }}
              />
            </button>

            {/* back */}
            <div
              inert={!flipped}
              aria-hidden={!flipped}
              className={`${face}`}
              style={{ background: cat.backBg, color: cat.backFg, transform: 'rotateY(180deg)' }}
            >
              <div>
                <p className="font-display text-[20px] font-extrabold leading-[1.05] tracking-[-0.04em]">
                  {skill.cat === 'learning' ? 'Where it is going' : 'Where I used it'}
                </p>
                <ul className="mt-4">
                  {skill.used.length === 0 && <li className="text-[16px] leading-[1.4]">{skill.emptyNote}</li>}
                  {skill.used.map((u) => (
                    <li key={u.label} className="border-t-2 border-current/40 first:border-t-0">
                      {u.href ? (
                        <a
                          href={u.href}
                          {...(u.external ? { target: '_blank', rel: 'noopener' } : {})}
                          className="flex items-center justify-between gap-3 py-2 text-[16px] font-bold hover:underline"
                        >
                          <span>{u.label}</span>
                          <span aria-hidden="true">{u.external ? '↗' : '→'}</span>
                        </a>
                      ) : (
                        <span className="block py-2 text-[16px] font-bold">{u.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="self-start border-[2.5px] border-current px-4 py-2 text-[15px] font-bold hover:bg-white/20"
              >
                ↺ Flip back
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const FILTERS = [{ id: 'all', label: 'All' }, ...Object.entries(CATS).map(([id, c]) => ({ id, label: c.label }))]

export default function Deck() {
  const [f, setF] = useState('all')
  const [touched, setTouched] = useState(false)
  const list = f === 'all' ? SKILLS : SKILLS.filter((s) => s.cat === f)
  const count = (id) => (id === 'all' ? SKILLS.length : SKILLS.filter((s) => s.cat === id).length)

  return (
    <section id="deck" className="mx-auto max-w-[1120px] px-[26px] py-14">
      <h2 className="font-display text-[clamp(32px,6vw,68px)] font-extrabold leading-[.95] tracking-[-0.04em] text-ink">
        Pick a deck.
      </h2>
      <p className="mt-4 max-w-[30em] text-[20px] leading-[1.5] text-ink">Filter by area, then tap any card to see which projects it came from.</p>

      <div role="group" aria-label="Filter skills by area" className="mt-8 flex flex-wrap gap-3">
        {FILTERS.map((c) => {
          const on = f === c.id
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setF(c.id)
                setTouched(true)
              }}
              className="relative border-[2.5px] border-ink bg-cream px-4 py-2 text-[16px] font-bold text-ink"
            >
              {on && (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 bg-sun shadow-[4px_4px_0_var(--shadow)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <span className={`relative ${on ? 'text-[#1E0A0C]' : ''}`}>
                {c.label} <span className="opacity-60">{count(c.id)}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => (
            <SkillCard key={s.id} skill={s} index={i} immediate={touched} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
