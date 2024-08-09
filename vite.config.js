import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' // Sau khi cài vite-plugin-svgr thì import svgr

// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép Vite sử dụng được process.env, mặc định thì không và sẽ phải dùng import.meta.env
  define: {
    'process.env': process.env
  },
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
