import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': 'http://localhost:4000'
      // '/api/v1': 'bonntonnbackend.railway.internal'
    },
    hmr: false
  },
  plugins: [react()],
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api/v1': {
//         target: 'https://bonntonnbackend.railway.app', // Use your actual public URL here
//         changeOrigin: true, // This is often useful to avoid CORS issues
//         rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Optional: rewrite path if needed
//       }
//     },
//     hmr: false
//   },
//   plugins: [react()],
// })
