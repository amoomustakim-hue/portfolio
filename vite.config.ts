import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { host: true },
  // three.js arrives only through lazy imports (hero object, 3D scenes, lab).
  build: { chunkSizeWarningLimit: 1000 },
})
