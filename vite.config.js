import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    open: true, // opens browser automatically
  },
})

// export default defineConfig({
//   plugins: [
//     react()

//   ],
// //   build: {
// //     outDir: 'build', // CRA's default build output
// //   },
//   server: {
//     open: true, // opens browser automatically
//   },
// });