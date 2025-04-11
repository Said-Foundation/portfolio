import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure CNAME file is copied to the build output
    copyPublicDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
