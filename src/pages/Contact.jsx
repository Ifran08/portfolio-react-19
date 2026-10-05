import { useLayoutEffect, useRef, useState } from 'react'
import { EMAIL, GITHUB, LINKEDIN, SB_KEY, SB_URL } from '../config.js'
import { useTitle } from '../title.js'
import Split from '../fx/Split.jsx'
import Marquee from '../fx/Marquee.jsx'
import { burst } from '../fx/burst.js'

export default function Contact() {
  useTitle('Contact | Ifran')
  const mail = useRef(null)
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')

  // Shrinks the email text until it fits the screen, so it never runs off a phone.
  useLayoutEffect(() => {
    const em = mail.current
    if (!em) return
    const fit = () => {
      em.style.fontSize = ''
      let n = 0
      while (em.scrollWidth > em.clientWidth + 1 && n < 30) {
        em.style.fontSize = parseFloat(getComputedStyle(em).fontSize) - 1 + 'px'
        n++
      }
    }
    fit()
    window.addEventListener('resize', fit)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const copy = async (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top + r.height / 2, 30, 6)
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      setStatus('Press Ctrl C on the email to copy it.')
    }
    setTimeout(() => setCopied(false), 2000)
  }

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const br = form.querySelector('button[type=submit]').getBoundingClientRect()
    const d = new FormData(form)
    if (d.get('website')) return // hidden trap field for spam bots
    const body = { name: String(d.get('name')).trim(), email: String(d.get('email')).trim(), message: String(d.get('message')).trim() }
    setSending(true)
    setStatus('')
    try {
      const r = await fetch(SB_URL + '/rest/v1/portfolio_messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SB_KEY, Prefer: 'return=minimal' },
        body: JSON.stringify(body),
      })
      if (!r.ok) throw new Error(String(r.status))
      form.reset()
      setStatus('Thanks, your message is in. I will reply soon!')
      for (let k = 0; k < 4; k++) setTimeout(() => burst(br.left + br.width / 2 + (k - 1.5) * 90, br.top, 36, 8), k * 220)
    } catch {
      setStatus('Could not send it from here, so I am opening your email app instead.')
      setTimeout(() => {
        window.location.href =
          'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Hello from ' + body.name) +
          '&body=' + encodeURIComponent(body.message + '\n\nReply to: ' + body.email)
      }, 1200)
    }
    setSending(false)
  }

  return (
    <>
    <div className="wrap">
      <section className="page">
        <h1><span className="l"><span className="sp"><Split base={0.1} wave>Say hello.</Split></span></span></h1>
        <p className="lead">Hiring in Bangalore? Send me the role description and I will show you how my work fits it.</p>
        <a className="big" ref={mail} href={'mailto:' + EMAIL}>
          {EMAIL.split('@')[0]}@<wbr />{EMAIL.split('@')[1]}
        </a>
        <button className="copy" type="button" onClick={copy}>{copied ? 'Copied!' : 'Copy email'}</button>

        <form className="rv" onSubmit={submit}>
          <label>Your name<input name="name" required /></label>
          <label>Your email<input name="email" type="email" required /></label>
          <label>Message<textarea name="message" required /></label>
          <label className="hp" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <button className="copy" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'}</button>
          <p id="status" role="status">{status}</p>
        </form>

        <div className="links">
          <a href={GITHUB} target="_blank" rel="noopener">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </section>
    </div>
    <Marquee items={['Say hello', 'Hire me', 'Bangalore', 'Let us talk']} variant="sun" speed={3.5} reverse tilt={1.5} />
    </>
  )
}
