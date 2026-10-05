import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { bindMouse } from '../skills/hooks.js'
import Hero from '../skills/Hero.jsx'
import Bands from '../skills/Bands.jsx'
import Deck from '../skills/Deck.jsx'
import Toss from '../skills/Toss.jsx'
import Brain from '../skills/Brain.jsx'
import Cta from '../skills/Cta.jsx'
import Cursor from '../skills/Cursor.jsx'
import { useTitle } from '../title.js'

function Progress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[65] h-[6px] origin-left bg-brand" />
}

export default function Skills() {
  useTitle('Skills | Ifran')
  useEffect(() => {
    bindMouse()
  }, [])
  return (
    <div id="skills-root">
      <Progress />
      <Cursor />
      <Hero />
      <Bands />
      <Deck />
      <Toss />
      <Brain />
      <Cta />
    </div>
  )
}
