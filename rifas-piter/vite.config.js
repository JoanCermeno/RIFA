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
  server: { // Esto es para la configuración del servidor de desarrollo de Vite
    host: '0.0.0.0', // Permite el acceso desde cualquier IP
    port: 5173, // Puerto por defecto de Vite
    // Aquí puedes añadir allowedHosts si es necesario para el DESARROLLO
    // pero no es para producción en Render
    // origin: 'https://rifa-sypi.onrender.com', // Esto es más para CORS y cosas de despliegue con proxy
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:XXXX', // Tu backend local
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
    allowedHosts: [ // Si lo necesitas para desarrollo en red
      'rifa-sypi.onrender.com', // Esto solo tendría sentido si Render redirige a tu dev server, lo cual es raro
      '.onrender.com', // Otra forma, pero insisto, esto es para dev server
      'https://rifa-sypi.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  }
})