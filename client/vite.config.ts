import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('react-github-calendar') || id.includes('react-activity-calendar')) {
              return 'vendor-calendar';
            }
            if (id.includes('react-router-dom') || id.includes('react-helmet-async')) {
              return 'vendor-router';
            }
            return 'vendor-core';
          }
        }
      }
    }
  }
});
