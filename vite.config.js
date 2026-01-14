import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for GitHub Pages compatibility
  server: {
    port: 3000,
    open: true
  },
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  }
})
