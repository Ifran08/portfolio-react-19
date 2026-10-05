import { useEffect, useState } from 'react'
import { motionValue } from 'motion/react'

// One shared pointer position, so many components can react to the mouse without many listeners.
export const mouseX = motionValue(-9999)
export const mouseY = motionValue(-9999)

let bound = false
export function bindMouse() {
  if (bound) return
  bound = true
  window.addEventListener(
    'pointermove',
    (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    },
    { passive: true },
  )
}

export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(pointer: fine)')
    setFine(m.matches)
    const on = (e) => setFine(e.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return fine
}
