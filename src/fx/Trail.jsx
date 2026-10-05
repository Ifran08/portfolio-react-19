import { useEffect, useRef } from 'react'

const COLORS = ['#FFC83D', '#9C0012', '#FFB8AE', '#FFC83D', '#FFF3D6']

// One canvas for all the sparkles: a trail behind the mouse, and confetti on every click or tap.
export default function Trail() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const fine = window.matchMedia('(pointer: fine)').matches
    let W = 0, H = 0, parts = [], raf = 0, lx = -999, ly = -999

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth
      H = window.innerHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const add = (x, y, power, n) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        const v = (Math.random() * 0.7 + 0.3) * power
        parts.push({
          x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (power > 3 ? 3 : 0),
          r: Math.random() * 6 + (power > 3 ? 6 : 4), rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35,
          life: 1, decay: (power > 3 ? 0.011 : 0.022) + Math.random() * 0.012, g: power > 3 ? 0.2 : 0.03,
          shape: (Math.random() * 3) | 0, c: COLORS[(Math.random() * COLORS.length) | 0],
        })
      }
      if (parts.length > 400) parts.splice(0, parts.length - 400)
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const draw = (p) => {
      const s = p.r * (0.35 + 0.65 * p.life)
      ctx.save()
      ctx.globalAlpha = Math.min(1, p.life * 1.6)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.c
      ctx.strokeStyle = '#1E0A0C'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      if (p.shape === 0) ctx.rect(-s / 2, -s / 2, s, s)
      else if (p.shape === 1) {
        for (let k = 0; k < 8; k++) {
          const rr = k % 2 ? s * 0.28 : s * 0.75
          const aa = (k * Math.PI) / 4
          ctx.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr)
        }
        ctx.closePath()
      } else ctx.arc(0, 0, s / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }
    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      parts = parts.filter((p) => p.life > 0 && p.y < H + 40)
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        p.vy += p.g
        p.vx *= 0.985
        p.rot += p.vr
        p.life -= p.decay
        draw(p)
      }
      raf = parts.length ? requestAnimationFrame(tick) : 0
      if (!raf) ctx.clearRect(0, 0, W, H)
    }
    const move = (e) => {
      if (!fine || e.pointerType !== 'mouse') return
      if (Math.hypot(e.clientX - lx, e.clientY - ly) > 16) {
        lx = e.clientX
        ly = e.clientY
        add(lx, ly, 1.4, 1)
      }
    }
    const down = (e) => add(e.clientX, e.clientY, 5.5, 16)
    const custom = (e) => add(e.detail.x, e.detail.y, e.detail.power, e.detail.n)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('fx:burst', custom)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('fx:burst', custom)
    }
  }, [])
  return <canvas ref={ref} className="fxc" aria-hidden="true" />
}
