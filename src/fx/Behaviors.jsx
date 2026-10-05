import { useEffect } from 'react'

const MAG = '.copy,.more,.next,.back,.logo,.ext,.links a,.links2 a,footer a,.badge'

// Buttons and links lean toward your mouse, and cards tilt in 3D with a shine that follows the cursor.
export default function Behaviors() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return

    const st = new WeakMap()
    let raf = 0, mx = -999, my = -999
    const loop = () => {
      let busy = false
      document.querySelectorAll(MAG).forEach((el) => {
        const r = el.getBoundingClientRect()
        const s = st.get(el) || { x: 0, y: 0 }
        const dx = mx - (r.left + r.width / 2 - s.x)
        const dy = my - (r.top + r.height / 2 - s.y)
        const near = Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + 80
        const tx = near ? dx * 0.32 : 0
        const ty = near ? dy * 0.32 : 0
        s.x += (tx - s.x) * 0.2
        s.y += (ty - s.y) * 0.2
        const rest = Math.abs(s.x - tx) < 0.05 && Math.abs(s.y - ty) < 0.05
        if (!rest) busy = true
        if (rest && !near) {
          s.x = 0
          s.y = 0
          el.style.translate = ''
        } else el.style.translate = s.x.toFixed(2) + 'px ' + s.y.toFixed(2) + 'px'
        st.set(el, s)
      })
      raf = busy ? requestAnimationFrame(loop) : 0
    }
    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(loop)
      const el = e.target.closest && e.target.closest('[data-tilt]')
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--ry', ((px - 0.5) * 14).toFixed(2) + 'deg')
      el.style.setProperty('--rx', ((0.5 - py) * 10).toFixed(2) + 'deg')
      el.style.setProperty('--gx', (px * 100).toFixed(1) + '%')
      el.style.setProperty('--gy', (py * 100).toFixed(1) + '%')
    }
    const out = (e) => {
      const el = e.target.closest && e.target.closest('[data-tilt]')
      if (!el || el.contains(e.relatedTarget)) return
      el.style.removeProperty('--rx')
      el.style.removeProperty('--ry')
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', out)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', out)
    }
  }, [])
  return null
}
