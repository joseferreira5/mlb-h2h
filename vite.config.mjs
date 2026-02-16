import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      include: '**/*.{js,jsx,ts,tsx}'
    })
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  resolve: {
    alias: {
      'react/jsx-runtime': fileURLToPath(
        new URL('./src/shims/jsx-runtime.js', import.meta.url)
      ),
      'react/jsx-dev-runtime': fileURLToPath(
        new URL('./src/shims/jsx-dev-runtime.js', import.meta.url)
      )
    }
  },
  server: {
    port: 5173
  }
});
