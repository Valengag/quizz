import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(),  VitePWA({
      includeAssets: ['favicon.ico', 'carte-a-jouer.png', 'carte-a-jouer-192.png'],
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'carte-a-jouer-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'carte-a-jouer.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })]
})
