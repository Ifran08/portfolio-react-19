import { motion, useScroll, useTransform } from 'motion/react'
import { useLocation } from 'react-router-dom'

// A round "open to work" sticker that spins by itself and spins faster as you scroll.
export default function Badge() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const rot = useTransform(scrollY, (v) => v * 0.5)
  if (pathname === '/contact' || pathname.startsWith('/skills')) return null
  return (
    <motion.a
      href="#/contact"
      className="badge"
      aria-label="Open to work in Bangalore. Go to the contact page"
      initial={{ scale: 0, rotate: -120 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', bounce: 0.6, delay: 0.8 }}
      whileHover={{ scale: 1.14 }}
    >
      <motion.div style={{ rotate: rot }} className="badge-in">
        <div className="badge-spin">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="bc" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text>
              <textPath href="#bc" textLength="283" lengthAdjust="spacing">OPEN TO WORK • BANGALORE • HIRE ME •{' '}</textPath>
            </text>
          </svg>
        </div>
      </motion.div>
      <span className="badge-mid" aria-hidden="true">→</span>
    </motion.a>
  )
}
