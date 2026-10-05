import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const LAYERS = [3, 5, 5, 3]
const XS = [80, 250, 420, 548]
const MOVES = ['e4', 'd4', 'Nf3']
const LABELS = ['board', 'thinking', 'thinking', 'move']

const pos = (l, i) => {
  const n = LAYERS[l]
  const gap = l === 3 ? 82 : 56
  return { x: XS[l], y: 160 + (i - (n - 1) / 2) * gap }
}

const LINES = []
for (let l = 0; l < LAYERS.length - 1; l++)
  for (let i = 0; i < LAYERS[l]; i++)
    for (let j = 0; j < LAYERS[l + 1]; j++) LINES.push({ l, i, j, a: pos(l, i), b: pos(l + 1, j) })

export default function Brain() {
  const reduce = useReducedMotion()
  const [best, setBest] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setBest((b) => (b + 1) % MOVES.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="mx-auto max-w-[1120px] px-[26px] py-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <span className="status">NEURAL CHESS LOADING</span>
          <h2 className="mt-6 font-display text-[clamp(32px,5.4vw,60px)] font-extrabold leading-[.98] tracking-[-0.04em] text-ink">
            Next up: a chess brain.
          </h2>
          <p className="mt-5 max-w-[28em] text-[20px] leading-[1.5] text-ink">
            My chess game is built. Now I am teaching it to think, so you can play human vs AI. This is how I picture it: the board goes in, a move comes out.
          </p>
          <a
            href="#/work/react-games"
            className="mt-6 inline-block border-b-[3px] border-brand pb-[2px] font-bold text-ink"
          >
            Read about the game
          </a>
        </div>

        <div className="border-[2.5px] border-ink bg-cream p-3 shadow-[8px_8px_0_var(--shadow)]">
          <svg viewBox="0 0 640 320" className="block h-auto w-full" role="img" aria-label="A drawing of a small neural network that picks a chess move">
            {LINES.map((ln, k) => (
              <line key={`b${k}`} x1={ln.a.x} y1={ln.a.y} x2={ln.b.x} y2={ln.b.y} stroke="var(--ink)" strokeOpacity=".16" strokeWidth="1.5" />
            ))}
            {LINES.map((ln, k) => {
              const live = ln.l === 2 && ln.j === best
              return (
                <motion.line
                  key={`f${k}`}
                  x1={ln.a.x}
                  y1={ln.a.y}
                  x2={ln.b.x}
                  y2={ln.b.y}
                  stroke="#9C0012"
                  strokeLinecap="round"
                  strokeDasharray="3 24"
                  animate={reduce ? { strokeOpacity: live ? 0.9 : 0.3, strokeWidth: live ? 3.2 : 2 } : { strokeDashoffset: [0, -54], strokeOpacity: live ? 1 : 0.35, strokeWidth: live ? 3.4 : 2 }}
                  transition={{
                    strokeDashoffset: { repeat: Infinity, ease: 'linear', duration: 1.4 + ((k * 7) % 10) / 10 },
                    default: { duration: 0.4 },
                  }}
                />
              )
            })}
            {LAYERS.map((n, l) =>
              Array.from({ length: n }, (_, i) => {
                const p = pos(l, i)
                const out = l === 3
                const win = out && i === best
                return (
                  <g key={`${l}-${i}`}>
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={out ? 19 : 11}
                      fill={win ? '#9C0012' : out ? '#FFC83D' : 'var(--bg)'}
                      stroke="var(--ink)"
                      strokeWidth="3"
                      animate={reduce ? undefined : win ? { scale: [1, 1.22, 1] } : out ? { scale: 1 } : { scale: [1, 1.28, 1] }}
                      transition={win ? { duration: 0.6 } : { duration: 1.2, repeat: Infinity, repeatDelay: 1.6, delay: l * 0.45 + i * 0.07 }}
                    />
                    {out && (
                      <text x={p.x + 30} y={p.y + 6} fontFamily="Unbounded" fontWeight={win ? 800 : 600} fontSize="17" fill={win ? 'var(--hot)' : 'var(--ink)'}>
                        {MOVES[i]}
                      </text>
                    )}
                  </g>
                )
              }),
            )}
            {LABELS.map((t, l) => (
              <text key={l} x={XS[l]} y="308" textAnchor="middle" fontFamily="Hanken Grotesk" fontWeight="700" fontSize="14" fill="var(--mute)">
                {t}
              </text>
            ))}
          </svg>
          <p className="px-2 pb-2 pt-1 text-[15px] leading-[1.4] text-mute" aria-live="polite">
            Best move right now: <b className="font-display text-hot">{MOVES[best]}</b>. This is only a picture of the idea. The real brain is still loading.
          </p>
        </div>
      </div>
    </section>
  )
}
