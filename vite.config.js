// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // *** AÑADE O VERIFICA ESTA LÍNEA ***
  base: '/', // O la ruta base donde se servirá tu aplicación en Render, por ejemplo, '/mi-app/'
  // **********************************
  server: {
    allowedHosts: [
      'rifa-sypi.onrender.com',
      'localhost',
      '127.0.0.1',
    ],
    host: '0.0.0.0'
  }
})