import { useEffect, useRef, useState } from 'react'
import { HashRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom'
import { MotionConfig, motion, useAnimationControls, useReducedMotion } from 'motion/react'
import { GITHUB, LINKEDIN } from './config.js'
import { PROJECTS } from './projects.js'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Project from './pages/Project.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Skills from './pages/Skills.jsx'
import Split from './fx/Split.jsx'
import Bg from './fx/Bg.jsx'
import Trail from './fx/Trail.jsx'
import Behaviors from './fx/Behaviors.jsx'
import Badge from './fx/Badge.jsx'
import Boundary from './fx/Boundary.jsx'
import './fx/fx.css'

const FAN = [
  { label: 'Home', to: '/', x: -150, y: -8, r: -6, c: '#FFC83D' },
  { label: 'Work', to: '/work', x: -140, y: -66, r: 4, c: '#FFB8AE' },
  { label: 'Skills', to: '/skills', x: -120, y: -124, r: -4, c: '#FFC83D' },
  { label: 'About', to: '/about', x: -90, y: -182, r: 5, c: '#FFF3D6' },
  { label: 'Contact', to: '/contact', x: -50, y: -240, r: -5, c: '#FFC83D' },
]

const EASE = [0.7, 0, 0.2, 1]
const BARS = ['#9C0012', '#FFC83D', '#1E0A0C', '#FFB8AE', '#9C0012', '#FFC83D']
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const strip = {
  cover: (i) => ({ y: '0%', transition: { duration: 0.5, delay: i * 0.06, ease: EASE } }),
  reveal: (i) => ({ y: '-100%', transition: { duration: 0.6, delay: (BARS.length - 1 - i) * 0.05, ease: EASE } }),
  reset: { y: '100%', transition: { duration: 0 } },
}

function labelFor(h) {
  const p = h.replace(/^#\/?/, '').split('/')
  if (!p[0]) return 'Home'
  if (p[0] === 'work' && p[1]) {
    const pr = PROJECTS.find((x) => x.slug === p[1])
    return pr ? pr.title : 'Work'
  }
  return p[0][0].toUpperCase() + p[0].slice(1)
}

/* Six colored strips slam across the screen and the name of the next page flashes in the middle. */
function Curtain() {
  const reduce = useReducedMotion()
  const controls = useAnimationControls()
  const lab = useAnimationControls()
  const [label, setLabel] = useState('IFRAN')
  const busy = useRef(false)

  useEffect(() => {
    const onClick = async (e) => {
      const a = e.target.closest && e.target.closest('a')
      if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      const h = a.getAttribute('href') || ''
      if (!h.startsWith('#/')) return
      e.preventDefault()
      const here = window.location.hash || '#/'
      if (h === here) return
      if (reduce) {
        window.location.hash = h
        return
      }
      if (busy.current) return
      busy.current = true
      let moved = false
      const go = () => {
        if (moved) return
        moved = true
        window.location.hash = h
        window.scrollTo(0, 0)
      }
      const forceGo = setTimeout(go, 1400)
      const safety = setTimeout(() => {
        go()
        try { controls.set('reset'); lab.set({ opacity: 0 }) } catch {}
        busy.current = false
      }, 4000)
      try {
        setLabel(labelFor(h))
        lab.set({ opacity: 0, y: 50, scale: 0.85 })
        await Promise.all([
          controls.start('cover'),
          (async () => {
            await sleep(220)
            await lab.start({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } })
          })(),
        ])
        go()
        await sleep(320)
        lab.start({ opacity: 0, y: -40, transition: { duration: 0.25 } })
        await controls.start('reveal')
        controls.set('reset')
      } catch (err) {
        go()
        try { controls.set('reset'); lab.set({ opacity: 0 }) } catch {}
      }
      clearTimeout(forceGo)
      clearTimeout(safety)
      busy.current = false
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reduce])

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] flex">
        {BARS.map((c, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={strip}
            animate={controls}
            initial={{ y: '100%' }}
            className="h-full flex-1"
            style={{ background: c, borderRight: i < BARS.length - 1 ? '3px solid #1E0A0C' : 0 }}
          />
        ))}
      </div>
      {!reduce && (
        <motion.div
          aria-hidden="true"
          animate={lab}
          initial={{ opacity: 0, y: 50 }}
          className="pointer-events-none fixed inset-0 z-[71] grid place-items-center"
        >
          <span className="px-4 text-center font-display font-extrabold leading-none tracking-tighter text-[#FFF3D6] text-[clamp(44px,13vw,170px)] [text-shadow:5px_5px_0_#1E0A0C,-2px_-2px_0_#1E0A0C,2px_-2px_0_#1E0A0C,-2px_2px_0_#1E0A0C]">
            {label}
          </span>
        </motion.div>
      )}
    </>
  )
}

/* The spinning "open me" button that fans the menu out like stickers. */
function FanMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const out = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const esc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', out)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('click', out)
      document.removeEventListener('keydown', esc)
    }
  }, [])

  const active = (to) => (to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(to + '/'))

  return (
    <nav ref={ref} className={'fan' + (open ? ' open' : '')} aria-label="Main">
      <div className="fan-items">
        {FAN.map((f) => (
          <a
            key={f.to}
            href={'#' + f.to}
            aria-current={active(f.to) ? 'page' : undefined}
            style={{ '--x': f.x + 'px', '--y': f.y + 'px', '--r': f.r + 'deg', '--c': f.c }}
          >
            {f.label}
          </a>
        ))}
      </div>
      <button className="fan-btn" type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
        <svg className="fan-ring" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#circ" textLength="285" lengthAdjust="spacing">
              open me • open me • open me •{' '}
            </textPath>
          </text>
        </svg>
        <span className="plus" aria-hidden="true">+</span>
      </button>
    </nav>
  )
}

/* Fades things in as they scroll into view (uses the .rv classes from site.css). */
function useReveal(pathname) {
  useEffect(() => {
    document.querySelectorAll('mark:not(.mk)').forEach((m) => m.classList.add('mk'))
    const els = document.querySelectorAll('.rv:not(.in), mark.mk:not(.in)')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
            setTimeout(() => (e.target.style.transitionDelay = ''), 1600)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((e, i) => {
      if (e.tagName !== 'MARK') e.style.transitionDelay = (i % 3) * 0.08 + 's'
      io.observe(e)
    })
    return () => io.disconnect()
  }, [pathname])
}

function Footer() {
  return (
    <div className="wrap">
      <footer>
        Made by hand in Navi Mumbai. This site is built with React.
        <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
        <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
        <a href="#/contact">Contact</a>
      </footer>
    </div>
  )
}

function ProjectRoute() {
  const { slug } = useParams()
  const p = PROJECTS.find((x) => x.slug === slug)
  if (!p) return <Navigate to="/work" replace />
  return <Project key={slug} p={p} />
}

function Shell() {
  const { pathname } = useLocation()
  useReveal(pathname)
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <>
      <Boundary quiet><Bg /></Boundary>
      <Boundary quiet><Trail /></Boundary>
      <Boundary quiet><Behaviors /></Boundary>
      <Boundary quiet><Badge /></Boundary>
      <Boundary quiet><Curtain /></Boundary>
      <header>
        <div className="wrap">
          <a className="logo" href="#/"><Split>Ifran</Split></a>
        </div>
      </header>
      <FanMenu />
      <Boundary resetKey={pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectRoute />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Boundary>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Shell />
      </HashRouter>
    </MotionConfig>
  )
}
