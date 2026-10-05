import { useRef } from 'react'
import { motion } from 'motion/react'

const drop = (r, i) => ({
  out: { y: -320, opacity: 0, rotate: r + 50 },
  in: { y: 0, opacity: 1, rotate: r, transition: { type: 'spring', bounce: 0.55, duration: 1.2, delay: i * 0.12 } },
})

const ITEMS = [
  { t: 'React', c: '#FFC83D', f: '#1E0A0C', r: -8, x: '4%', y: '24%' },
  { t: 'Supabase', c: '#9C0012', f: '#FFF3D6', r: 6, x: '34%', y: '14%' },
  { t: 'Hire me!', c: '#1E0A0C', f: '#FFC83D', r: -4, x: '60%', y: '28%' },
  { t: 'Node', c: '#FFB8AE', f: '#1E0A0C', r: 9, x: '10%', y: '60%' },
  { t: 'CSS magic', c: '#FFF3D6', f: '#1E0A0C', r: -7, x: '34%', y: '56%' },
  { t: 'Bangalore?', c: '#FFC83D', f: '#1E0A0C', r: 5, x: '56%', y: '66%' },
]

// A box of stickers you can grab, throw and bounce around.
export default function Yard() {
  const box = useRef(null)
  return (
    <motion.div className="yard" ref={box} initial="out" whileInView="in" viewport={{ once: true, amount: 0.3 }}>
      <span className="yard-note">psst... grab these and throw them!</span>
      {ITEMS.map((it, i) => (
        <motion.div
          key={it.t}
          className="sticker"
          style={{ left: it.x, top: it.y, background: it.c, color: it.f }}
          drag
          dragConstraints={box}
          dragElastic={0.35}
          dragTransition={{ bounceStiffness: 260, bounceDamping: 12, power: 0.6 }}
          variants={drop(it.r, i)}
          whileHover={{ scale: 1.1, rotate: it.r + 5 }}
          whileDrag={{ scale: 1.2, rotate: 0, zIndex: 5, cursor: 'grabbing' }}
        >
          {it.t}
        </motion.div>
      ))}
    </motion.div>
  )
}
