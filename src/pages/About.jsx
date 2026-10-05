import { useTitle } from '../title.js'
import Split from '../fx/Split.jsx'
import Marquee from '../fx/Marquee.jsx'
import Scrub from '../fx/Scrub.jsx'

const STEPS = [
  ['Listen', 'I ask what the site has to do for your business, and who will use it.'],
  ['Design', 'I plan the layout, colors and motion before I write code.'],
  ['Build', 'I code the pages, then the API and database behind the forms.'],
  ['Launch', 'I deploy it, test it, and keep revising until you love it.'],
]

export default function About() {
  useTitle('About | Ifran')
  return (
    <>
    <div className="wrap">
      <section className="about">
        <aside><h1><span className="l"><span className="sp"><Split base={0.1}>About</Split></span></span></h1></aside>
        <div className="txt">
          <p>I'm Ifran. I started with <mark>HTML and CSS</mark> and kept going until I could build the whole thing myself.</p>
          <p>
            Now I write the backend too, with <mark>Express and PostgreSQL</mark>, and I like checking that every form really saves and sends. I ship on Vercel and Render, and I keep everything in Git.
          </p>
          <p>Right now I am learning <mark>AI and ML</mark> and running local models with Ollama, because that is where I want to take my work next.</p>

          <h2>What I do</h2>
          <p>
            I design and build complete websites for businesses. I listen to what the client needs, sketch the layout, code every page by hand, build the backend for forms and bookings, and put it all online.
          </p>
          <p>
            Most of my work is for startups and local businesses through CODASH. I like sites that look different from the usual template and still load fast and work on a phone.
          </p>
          <div className="rows">
            {STEPS.map(([k, v]) => (
              <div key={k} className="rv"><b>{k}</b><span>{v}</span></div>
            ))}
          </div>

          <h2>Experience</h2>
          <div className="tl rv">
            <h3>Founder and Lead Developer, CODASH</h3>
            <p>Web studio, Navi Mumbai</p>
            <ul>
              <li>Design and build websites for startups and local businesses.</li>
              <li>Own the whole build, from design to API, database and deployment.</li>
              <li>Deliver in 3 to 6 weeks and keep revising until the client is happy.</li>
              <li>Build demo projects like Copper and Clove to show working features.</li>
            </ul>
          </div>

          <Scrub text="Right now I am teaching my chess bot to think, so it can be your opponent." />

          <h2>My skills</h2>
          <p><a className="more" style={{ margin: '0 0 18px' }} href="#/skills">Open the animated skills page</a></p>
          <div className="rows">
            <div className="rv"><b>Frontend</b><span><mark>HTML</mark>, <mark>CSS</mark>, <mark>JavaScript</mark>, <mark>React</mark>, responsive design, animation</span></div>
            <div className="rv"><b>Backend</b><span><mark>Node</mark>, <mark>Express</mark>, REST APIs, input validation</span></div>
            <div className="rv"><b>Data and email</b><span><mark>PostgreSQL</mark>, <mark>Supabase</mark>, Resend</span></div>
            <div className="rv"><b>Shipping</b><span>Git, GitHub, Vercel, Render, VS Code</span></div>
            <div className="rv"><b>Learning</b><span>AI and ML, local models with Ollama, an AI opponent for my chess game</span></div>
          </div>
        </div>
      </section>
    </div>
    <Marquee items={['Frontend', 'Backend', 'Database', 'Deploy']} variant="red" speed={3.5} tilt={-1.5} />
    </>
  )
}
