// Fires confetti from anywhere: burst(x, y) in screen pixels. The Trail canvas listens for it.
export const burst = (x, y, n = 28, power = 6) =>
  window.dispatchEvent(new CustomEvent('fx:burst', { detail: { x, y, n, power } }))
