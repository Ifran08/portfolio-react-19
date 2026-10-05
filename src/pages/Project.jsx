import { PROJECTS } from '../projects.js'
import { motion } from 'motion/react'
import { useTitle } from '../title.js'
import Split from '../fx/Split.jsx'
import Marquee from '../fx/Marquee.jsx'

export default function Project({ p }) {
  useTitle(p.title + ' | Ifran')
  const i = PROJECTS.findIndex((x) => x.slug === p.slug)
  const next = PROJECTS[(i + 1) % PROJECTS.length]
  return (
    <>
    <div className="wrap">
      <section className="page case">
        <a className="back" href="#/work">Back to all work</a>
        <h1><span className="l"><span className="sp"><Split base={0.1}>{p.title}</Split></span></span></h1>
        {p.status && <span className="status">{p.status}</span>}
        <p className="lead">{p.lead}</p>
        {p.links.length > 0 && (
          <div className="links2">
            {p.links.map(([label, url]) => (
              <a key={label} className="copy" href={url} target="_blank" rel="noopener">{label}</a>
            ))}
          </div>
        )}
        <h2>The idea</h2>
        <p className="txt2">{p.idea}</p>
        <h2>What I built</h2>
        <div className="rows">
          {p.built.map(([k, v]) => (
            <div key={k} className="rv"><b>{k}</b><span>{v}</span></div>
          ))}
        </div>
        <h2>Built with</h2>
        <div className="chips2">
          {p.tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ scale: 0, rotate: -25, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: 'spring', bounce: 0.65, delay: i * 0.07 }}
              whileHover={{ scale: 1.18, rotate: -5, y: -5 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
        <a className="next" href={'#/work/' + next.slug}>Next project: {next.title}</a>
      </section>
    </div>
    <Marquee items={p.tags} variant="outline" speed={3} reverse />
    </>
  )
}
