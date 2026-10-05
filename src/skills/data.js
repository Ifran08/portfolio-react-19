// Everything on the page comes from this file. Edit it and rebuild to change the cards.

export const CATS = {
  frontend: { label: 'Frontend', bg: '#9C0012', fg: '#FFF3D6', accent: '#FFC83D', backBg: '#FFC83D', backFg: '#1E0A0C' },
  backend: { label: 'Backend', bg: '#FFC83D', fg: '#1E0A0C', accent: '#9C0012', backBg: '#9C0012', backFg: '#FFF3D6' },
  data: { label: 'Data and email', bg: '#FFB8AE', fg: '#1E0A0C', accent: '#9C0012', backBg: '#9C0012', backFg: '#FFF3D6' },
  shipping: { label: 'Shipping', bg: '#2A1316', fg: '#FFF3D6', accent: '#FFC83D', backBg: '#FFC83D', backFg: '#1E0A0C' },
  learning: { label: 'Learning', bg: '#FFF3D6', fg: '#1E0A0C', accent: '#9C0012', backBg: '#9C0012', backFg: '#FFF3D6' },
}

export const WORK_COUNT = 6

const P = {
  clove: { label: 'Copper & Clove', href: '#/work/copper-clove' },
  codash: { label: 'CODASH', href: '#/work/codash' },
  particle: { label: 'Particle agency', href: '#/work/particle' },
  cafe: { label: "Biker's Brewing Café", href: '#/work/biker-cafe' },
  games: { label: 'React board games', href: '#/work/react-games' },
  lab: { label: 'Reflex test and emotion journal', href: '#/work/experiments' },
  contact: { label: 'The form on my contact page', href: '#/contact' },
  github: { label: 'My GitHub', href: 'https://github.com/Ifran08', external: true },
  here: { label: 'This skills page', note: true },
  site: { label: 'This portfolio', note: true },
  chess: { label: 'The chess brain in my React games', href: '#/work/react-games' },
}

export const SKILLS = [
  { id: 'html', name: 'HTML', cat: 'frontend', glyph: '</>', blurb: 'Every site I ship starts as clean markup that I write by hand.', used: [P.clove, P.codash, P.cafe, P.particle] },
  { id: 'css', name: 'CSS', cat: 'frontend', glyph: '{ }', blurb: 'Layouts, motion and my own design systems, without templates.', used: [P.clove, P.codash, P.cafe, P.particle] },
  { id: 'js', name: 'JavaScript', cat: 'frontend', glyph: 'JS', blurb: 'Menus, forms, games and animation, written without a framework when that is enough.', used: [P.clove, P.codash, P.lab, P.particle] },
  { id: 'react', name: 'React', cat: 'frontend', glyph: 'atom', blurb: 'Components, props and state. My tic tac toe and chess games use it, and so does this page.', used: [P.games, P.here] },
  { id: 'responsive', name: 'Responsive design', cat: 'frontend', glyph: '[ ]', blurb: 'Pages that fit any screen, from a small phone to a wide laptop.', used: [P.cafe, P.site] },
  { id: 'animation', name: 'Animation', cat: 'frontend', glyph: '>>', blurb: 'Scroll reveals, page wipes, custom cursors and springy menus, like the ones on this site.', used: [P.particle, P.codash] },

  { id: 'node', name: 'Node.js', cat: 'backend', glyph: 'N', blurb: 'JavaScript on the server, for the APIs behind my forms.', used: [P.codash, P.clove] },
  { id: 'express', name: 'Express', cat: 'backend', glyph: 'Ex', blurb: 'Small APIs that take a form, check it and pass it on.', used: [P.codash, P.clove] },
  { id: 'rest', name: 'REST APIs', cat: 'backend', glyph: 'GET', blurb: 'Clear endpoints that the front end calls with fetch.', used: [P.codash] },
  { id: 'validation', name: 'Validation and rate limiting', cat: 'backend', glyph: 'OK', blurb: 'I check the input, limit repeated requests and block spam before anything is saved.', used: [P.codash] },

  { id: 'postgres', name: 'PostgreSQL', cat: 'data', glyph: 'SQL', blurb: 'Tables, rules and row level security for the data behind my forms.', used: [P.codash, P.clove] },
  { id: 'supabase', name: 'Supabase', cat: 'data', glyph: 'DB', blurb: 'My database of choice for bookings and messages. A message sent from my contact page lands here.', used: [P.clove, P.codash, P.contact] },
  { id: 'resend', name: 'Resend', cat: 'data', glyph: '@', blurb: 'Sends the confirmation email when someone books a table or a call.', used: [P.clove, P.codash] },

  { id: 'git', name: 'Git and GitHub', cat: 'shipping', glyph: 'git', blurb: 'Every project lives in a repo, and my work gets pushed there.', used: [P.github, P.games] },
  { id: 'vercel', name: 'Vercel', cat: 'shipping', glyph: '▲︎', blurb: 'Where my static sites and React apps go live.', used: [P.clove, P.games, P.particle] },
  { id: 'render', name: 'Render', cat: 'shipping', glyph: 'R', blurb: 'Hosts the Express APIs behind my forms.', used: [P.codash] },

  { id: 'aiml', name: 'AI and ML', cat: 'learning', glyph: 'AI', blurb: 'My long term direction. I am learning the basics step by step.', used: [P.chess] },
  { id: 'ollama', name: 'Ollama', cat: 'learning', glyph: 'LLM', blurb: 'I run small language models on my own laptop to see how they behave.', used: [], emptyNote: 'Still just me, my laptop and a lot of curiosity.' },
  { id: 'chess', name: 'Neural chess', cat: 'learning', glyph: '♞︎', blurb: 'Giving my chess game a brain, so you can play human vs AI.', used: [P.chess] },
]
