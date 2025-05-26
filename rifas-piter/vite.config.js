// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // o @vitejs/plugin-react si cambiaste
import path from "path"
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react() ,   tailwindcss()
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server.allowedHosts{
     rifa-sypi.onrender.com
  }
})