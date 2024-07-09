import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' // Sau khi cài vite-plugin-svgr thì import svgr

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr() // Thêm svgr để sử dụng svg icon
  ],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
  // base: './'
})
