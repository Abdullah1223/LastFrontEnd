import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from network
    port: 5173, // Ensure it's the correct port
    strictPort: true, // Ensures Vite doesn't change the port
    allowedHosts: ['.ngrok-free.app'], // Allows any ngrok subdomain
  },
});
