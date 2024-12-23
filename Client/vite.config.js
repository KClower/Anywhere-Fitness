import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), "")
  return {
    base: "/Anywhere-Fitness/",
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: "http://localhost:9000",
          changeOrigin: true
        },
        // '^/.*\.(jpg|jpeg|png|gif|svg)$': {
        //   target: 'http://localhost:5173',  // Point to public directory
        //   rewrite: (path) => {
        //     // Remove any leading slash
        //     return path.replace(/^\//, '')
        //   }
        // }
      }
    }
  }
})








