import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                 // allows external access (inside Docker)
    allowedHosts: ['frontend', 'localhost'], // 👈 add this line
    port: 5173
  }
})
