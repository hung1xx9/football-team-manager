import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'Tinh Hoa FC',
                short_name: 'THFC',
                description: 'Ứng dụng quản lý Tinh Hoa Football Club',
                theme_color: '#121212', // Assuming dark theme is preferred or it will match the theme
                background_color: '#121212',
                display: 'standalone',
                icons: [
                    {
                        src: 'favicon.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'favicon.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                cleanupOutdatedCaches: true
            }
        })
    ],
    base: '/',
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
})
