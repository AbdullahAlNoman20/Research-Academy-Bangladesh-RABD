import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
    sourcemap: false,
    minify: 'esbuild',rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor';
            }
            if (id.includes('jspdf')) {
              return 'pdf';
            }
          }
        }
      }
    }
  },
  server: { port: 5173, strictPort: true }
});