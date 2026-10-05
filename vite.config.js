import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Builds the whole site into ONE plain script (app.js) and ONE stylesheet (app.css),
// then scripts/ship.mjs writes dist/index.html. No type="module", so it also works
// when you double click index.html, and it deploys on Vercel or any static host.
export default defineConfig(({ command }) => ({
  base: './',
  plugins: [react(), tailwindcss()],
  define: command === 'build' ? { 'process.env.NODE_ENV': '"production"' } : {},
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: 'src/main.jsx', name: 'IfranSite', formats: ['iife'], fileName: () => 'assets/app.js', cssFileName: 'assets/app' },
  },
}))
