import { useEffect, useRef } from 'react'

// Two googly eyes that follow your mouse around the page.
export default function Eyes() {
  const ref = useRef(null)
  useEffect(() => {
    const ps = ref.current.querySelectorAll('.pupil')
    const move = (e) => {
      ps.forEach((p) => {
        const r = p.parentElement.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const a = Math.atan2(e.clientY - cy, e.clientX - cx)
        const d = Math.min(r.width * 0.22, Math.hypot(e.clientX - cx, e.clientY - cy) / 6)
        p.style.transform = 'translate(' + Math.cos(a) * d + 'px,' + Math.sin(a) * d + 'px)'
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return (
    <div className="eyes" ref={ref} aria-hidden="true">
      <div className="eye"><div className="pupil" /></div>
      <div className="eye e2"><div className="pupil" /></div>
    </div>
  )
}
