import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Default base is root for Vercel; override with VITE_BASE_PATH if needed (e.g. GitHub Pages)
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://vercel-backend-zbs3.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
