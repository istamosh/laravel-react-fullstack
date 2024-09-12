import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // link outer sail project with this vite after npm run dev
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      host: 'localhost',
    }
  }
})
