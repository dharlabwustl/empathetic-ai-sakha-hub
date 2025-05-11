
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 8080 // Changed from 3000 to 8080 as per requirement
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Enable sourcemaps for debugging
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  // Configure base path for deployment
  base: '/',
  // Custom domain configuration
  preview: {
    port: 8080,
    host: 'test.prepzr.com',
    strictPort: true,
    cors: true
  }
})
