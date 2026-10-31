import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // /api/* is handled by the Worker: run `npx wrangler dev` (port 8787) next to `npm run dev`.
  server: {
    proxy: { '/api': 'http://localhost:8787' },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});