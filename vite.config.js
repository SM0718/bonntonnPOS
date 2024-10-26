import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     external: ['uuid']
  //   }
  // },
  server: {
    proxy: {
      '/api/v1': 'http://localhost:4000'
    },
    hmr: false
  },
  plugins: [react()],
})
