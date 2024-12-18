import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Anywhere-Fitness/",
  plugins: [react()],
  server: {
    proxy: {
      '^/.*\.(jpg|jpeg|png|gif|svg)$': {
        target: 'http://localhost:5173',
        rewrite: (path) => path
      }
    }
  }
})
