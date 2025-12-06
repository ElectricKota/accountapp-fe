import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { join, resolve } from 'node:path'
import process from 'node:process'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueI18n({
      include: [resolve(process.cwd(), 'src/locales/**')],
      strictMessage: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '/src': resolve(process.cwd(), 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://account-app.localhost',
        changeOrigin: true,
      } },
    host: true,
    https: false },
})
