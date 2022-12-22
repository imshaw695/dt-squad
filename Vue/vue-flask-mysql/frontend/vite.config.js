import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true
  },
  build: {
    outDir: path.resolve(__dirname, '../back_end/website/templates/') ,
    assetsDir:'./static/assets',
    sourcemap: 'inline',
    emptyOutDir: true,
  },
  // Use the base option to force references from this path rather than the root which is the default
  base:'./',
})
