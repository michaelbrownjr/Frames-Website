import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    cacheDir: '/tmp/frames-website-vite-cache',
     plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom/client', 'lucide-react', 'motion/react'],
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        maxParallelFileOps: 4,
        input: {
          main: path.resolve(__dirname, 'index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  };
});
