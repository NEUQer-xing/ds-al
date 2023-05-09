import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import prismjs from 'vite-plugin-prismjs';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prismjs({
      languages: 'all',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
