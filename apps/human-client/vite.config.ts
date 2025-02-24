import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const clientId = process.env.FRONTEND_CLIENT_ID || 'human';
const server: any = {
    host: process.env.VITE_HOST || 'localhost',
    port: Number(process.env.VITE_PORT) || 3000, // Default to 3000 if not set
    allowedHosts: ['human.ringnetwork.com'],
};

if (process.env.API_URL) {
    server.proxy = {
        '/api': {
            target: process.env.API_URL,
            headers: {
              'x-client-id': clientId,
            },
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server,
});
