import { GITHUB, LINKEDIN } from '../config.js'
import { PROJECTS } from '../projects.js'
import { useTitle } from '../title.js'
import Split from '../fx/Split.jsx'
import Marquee from '../fx/Marquee.jsx'
import Scrub from '../fx/Scrub.jsx'
import Eyes from '../fx/Eyes.jsx'
import Yard from '../fx/Yard.jsx'

const FEATURED = ['copper-clove', 'codash', 'particle']
const TOOLS = ['HTML', 'CSS', 'JavaScript', 'React', 'Node', 'Express', 'PostgreSQL', 'Supabase', 'Git', 'Vercel', 'Render', 'Resend']
const SUMMARY = {
  'copper-clove': 'Restaurant site with real bookings',
  codash: "My own studio's website",
  particle: 'Wix site rebuilt in code',
}

export default function Home() {
  useTitle('Ifran | Web Developer')
  return (
    <>
      <div className="wrap">
        <section className="hero">
          <Eyes />
          <h1>
            <span className="l"><span className="sp"><Split base={0.1}>I make</Split></span></span>
            <span className="l"><span className="sp"><Split base={0.3}>websites that</Split></span></span>
            <span className="l">
              <span className="sp"><span className="u">
                <Split base={0.5}>actually work.</Split>
                <svg viewBox="0 0 400 20" preserveAspectRatio="none"><path d="M4 12 C 90 2, 180 18, 250 8 S 360 6, 396 11" /></svg>
              </span></span>
            </span>
          </h1>
          <div className="intro">
            <div>
              <p>
                I'm Ifran, a frontend and full stack developer in Navi Mumbai. I like the whole job: the layout, the animation, the <mark>database</mark> behind the form, and the deploy.
              </p>
              <p>I also run CODASH, a web studio, so I am used to real clients and real deadlines.</p>
            </div>
            <div className="note">Looking for a developer role!</div>
          </div>
          <div className="links2">
            <a className="copy" href="#/skills">See my skills</a>
            <a className="copy" href={GITHUB} target="_blank" rel="noopener">See my GitHub</a>
            <a className="copy" href={LINKEDIN} target="_blank" rel="noopener">Find me on LinkedIn</a>
          </div>
        </section>

        <Scrub text="I sketch it, I code it, I wire up the database behind the form, and I ship it live. The whole job, start to finish." />

        <section className="sel">
          {FEATURED.map((slug) => {
            const p = PROJECTS.find((x) => x.slug === slug)
            return (
              <a key={slug} className="rv" href={'#/work/' + slug}>
                <b>{p.title}</b>
                <span>{SUMMARY[slug]}</span>
              </a>
            )
          })}
        </section>
        <a className="more" href="#/work">See all the work</a>
        <Yard />
      </div>

      <div className="mq-x" aria-hidden="true">
        <Marquee items={TOOLS} variant="outline" tilt={-2} speed={3} />
        <Marquee items={['Open to work', 'Bangalore', 'Frontend', 'Full stack', 'Hire me']} variant="red" tilt={2} reverse speed={3.5} />
      </div>
    </>
  )
}
