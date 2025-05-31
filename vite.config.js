import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import viteOgp from 'vite-plugin-open-graph'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: '怪談白ツール',
        description: '怪談白やるときのGM向け補助ツール',
        theme_color: '#fff',
        display: 'standalone',
        lang: 'ja-jp',
        icons: [
          {
            src: 'icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          }, {
            src: 'icon_128.png',
            sizes: '128x128',
            type: 'image/png'
          }
        ]
      },
    }),
    viteOgp({
      basic: {
        title: '怪談白ツール',
        type: 'website',
        image: 'https://ramune314159265.github.io/kaidanhakuTool/icon_128.png',
        description: '怪談白やるためのGM向け補助ツール',
        url: 'https://ramune314159265.github.io/kaidanhakuTool/',
        locale: 'ja_JP'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
})
