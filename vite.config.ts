import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// The 3D stack (three / R3F / drei) is only reached through dynamic imports,
// so it is emitted as separate lazy chunks and never blocks the page shell.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
  },
})
