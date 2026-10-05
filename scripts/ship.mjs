// Writes dist/index.html after the build, pointing at the plain (non module) script and stylesheet.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
let html = readFileSync(resolve(root, 'index.html'), 'utf8')
html = html.replace('<script type="module" src="/src/main.jsx"></script>', '')
html = html.replace('</head>', '<link rel="stylesheet" href="assets/app.css">\n</head>')
html = html.replace('</body>', '<script src="assets/app.js"></script>\n</body>')
writeFileSync(resolve(root, 'dist/index.html'), html)
console.log('Wrote dist/index.html')
