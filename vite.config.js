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
  },
  resolve: {
    alias: {
      // This tells Vite that "@" refers to the root folder (aurumapp)
      "@": path.resolve(__dirname, "./"),
    },
  },
})
