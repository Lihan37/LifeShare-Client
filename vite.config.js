// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add an alias for importing JSON files
      '@/data': '/path/to/your/data/folder',
    },
  },
});
