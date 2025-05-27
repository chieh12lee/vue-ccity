import { fileURLToPath, URL } from 'node:url'
import { NodePackageImporter } from 'sass-embedded'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig(({ command, mode }) => {
  const isDev = mode === 'development'
  return {
    base: isDev ? './' : '/vue-ccity/',
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
