import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:process.env.VITE_BASE_PATH || "/vercel-frontend",
  server: { port: 5173,
    proxy :{
      '/api':{
        target:'https://vercel-backend-zbs3.onrender.com',
        changeOrigin:true,
      },
    },
   },
});
