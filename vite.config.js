import { fileURLToPath, URL } from 'node:url'
import { NodePackageImporter } from 'sass-embedded'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron'
// https://vite.dev/config/
export default defineConfig({
  base: './',
  // publicPath: './',
  //   // （可选）把静态资源都挪到一个子目录
  //   assetsDir: 'static'
  plugins: [
    vue(),
    /* vueDevTools(), */ tailwindcss(),

    electron({
      entry: 'src/electron/main.js',
      onstart(options) {
        // 開發時同時啟動 Vite 與 Electron
        options.startup()
      },
      vite: {
        build: {
          outDir: 'dist-electron',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // 或 "modern"
      },
    },
  },
})
