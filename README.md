# Ifran portfolio (React)

One React app with every page: Home, Work, six project pages, Skills, About and Contact.
Built with React, Framer Motion (the `motion` package), React Router and Tailwind.

## Just look at it
Double click `dist/index.html`. It works without a server.

## Put it online (Vercel)
1. Push this folder to GitHub.
2. In Vercel choose "Add New Project" and pick the repo.
3. Build command: `npm run build`. Output directory: `dist`.

## Change things
- `src/config.js`: your email, GitHub, LinkedIn and the Supabase form settings. **Put your real LinkedIn address here.**
- `src/projects.js`: the Work page cards and every project page.
- `src/skills/data.js`: the skill cards and where each one was used.
- `src/pages/`: Home, Work, About, Contact, Skills and the project page layout.
- `src/site.css`: the site styles. `src/index.css`: Tailwind setup for the skills cards.

## Rebuild after editing
```
npm install
npm run build
```
Live preview while editing: `npm run dev`.
Note: run npm install in a normal folder. Some cloud drives do not allow the links npm needs.
