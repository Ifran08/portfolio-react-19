import { PROJECTS } from '../projects.js'
import { useTitle } from '../title.js'
import Split from '../fx/Split.jsx'
import Marquee from '../fx/Marquee.jsx'

export default function Work() {
  useTitle('Work | Ifran')
  return (
    <>
    <div className="wrap">
      <section className="page">
        <h1><span className="l"><span className="sp"><Split base={0.1}>The work</Split></span></span></h1>
        <p className="lead">Things I designed, built and put online. Open a card to read the story behind it.</p>
        <div className="posters">
          {PROJECTS.map((p) => (
            <article key={p.slug} className="poster rv" data-tilt>
              <h2><a className="cardlink" href={'#/work/' + p.slug}>{p.title}</a></h2>
              <p>{p.card}</p>
              {p.hand && <span className="hand">{p.hand}</span>}
              {p.status && <span className="status">{p.status}</span>}
              <small className="tech">{p.stack}</small>
              {p.cardLink && (
                <a className="ext" href={p.cardLink[1]} target="_blank" rel="noopener">{p.cardLink[0]}</a>
              )}
              <span className="read">Read the story</span>
            </article>
          ))}
        </div>
      </section>
    </div>
    <Marquee items={['Designed', 'Built', 'Deployed', 'Repeat']} variant="sun" speed={3.5} />
    </>
  )
}
