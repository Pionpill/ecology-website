import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ecology/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
