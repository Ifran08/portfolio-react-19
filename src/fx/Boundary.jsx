import { Component } from 'react'

// Safety net: if anything crashes, the page never turns into an empty screen.
// Decorative effects (quiet) just switch themselves off. A page that crashes reloads itself once.
export default class Boundary extends Component {
  state = { err: null }
  static getDerivedStateFromError(err) {
    return { err }
  }
  componentDidCatch(err) {
    console.error(err)
    if (this.props.quiet) return
    try {
      const k = 'reloaded:' + window.location.hash
      if (!sessionStorage.getItem(k)) {
        sessionStorage.setItem(k, '1')
        window.location.reload()
      }
    } catch {}
  }
  componentDidUpdate(prev) {
    if (this.state.err && prev.resetKey !== this.props.resetKey) this.setState({ err: null })
  }
  render() {
    if (!this.state.err) return this.props.children
    if (this.props.quiet) return null
    return (
      <div className="wrap" style={{ padding: '90px 26px' }}>
        <h2>Oops, this page did not load.</h2>
        <p style={{ color: 'var(--mute)' }}>{String(this.state.err.message || this.state.err)}</p>
        <button className="copy" type="button" onClick={() => window.location.reload()}>Reload</button>
      </div>
    )
  }
}
