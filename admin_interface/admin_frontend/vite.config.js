// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
    plugins: [react(),tailwindcss()],
      css: {
    postcss: {
      plugins: [tailwindcss()],
    },
    server: {
        port: 3000, // Change to your desired port
      },
  }
})