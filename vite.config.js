import { fileURLToPath, URL } from 'node:url'
import { NodePackageImporter } from 'sass-embedded'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig(({ command, mode }) => {
  // const isDev = mode === 'development'

  return {
    base:
      mode === 'staging'
        ? '/vue-ccity/' // 例如 /staging/
        : mode === 'production'
          ? './' // 例如 /prod/
          : './', // development 時通常用根目錄
    plugins: [
      vue(),
      /* vueDevTools(), */
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        // scss: {
        //   api: 'modern-compiler', // 或 "modern"
        // },
      },
    },
  }
})
