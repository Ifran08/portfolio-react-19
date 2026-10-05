import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useFinePointer } from './hooks.js'

// A trailing ring that grows and names the thing you are hovering (Flip, Drag, Go).
export default function Cursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const [label, setLabel] = useState('')
  const [shown, setShown] = useState(false)
  const first = useRef(true)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 520, damping: 38, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 520, damping: 38, mass: 0.4 })

  useEffect(() => {
    if (!fine || reduce) return
    const move = (e) => {
      if (first.current) {
        first.current = false
        x.jump(e.clientX)
        y.jump(e.clientY)
        setShown(true)
      }
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    const over = (e) => {
      const t = e.target.closest ? e.target.closest('[data-cursor]') : null
      setLabel(t ? t.getAttribute('data-cursor') : '')
    }
    const leave = () => setShown(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [fine, reduce, rawX, rawY, x, y])

  if (!fine || reduce) return null
  const big = Boolean(label)
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60]" style={{ x, y }}>
      <motion.div
        animate={{ width: big ? 84 : 20, height: big ? 84 : 20, opacity: shown ? 1 : 0, backgroundColor: big ? '#FFC83D' : 'rgba(255,200,61,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="flex items-center justify-center rounded-full border-2 border-[#1E0A0C]"
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {big && <span className="font-display text-[13px] font-extrabold text-[#1E0A0C]">{label}</span>}
      </motion.div>
    </motion.div>
  )
}
