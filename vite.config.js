import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // Proxy all API requests to the backend
      '/api/v1': {
        target: 'https://bonntonn.up.railway.app', // Use the full URL with protocol
        changeOrigin: true, // Ensures the host header matches the target
        secure: true, // If the backend uses HTTPS
      },
    },
    hmr: true,
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
