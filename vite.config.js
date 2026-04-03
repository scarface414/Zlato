import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    open: true, // opens browser automatically
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // The port where your Vercel dev or Node server runs
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      // This tells Vite that "@" refers to the root folder (aurumapp)
      "@": path.resolve(__dirname, "./"),
    },
  },
})
