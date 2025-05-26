import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    // Only expose specific environment variables
    'process.env.VITE_CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.VITE_CLOUDINARY_CLOUD_NAME)
  }
})