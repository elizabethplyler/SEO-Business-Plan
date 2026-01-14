import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  // Use base path for production builds (GitHub Pages), but not for development
  const base = command === 'build' ? '/SEO-Business-Plan/' : '/';
  
  return {
    plugins: [react()],
    base,
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
  };
})
