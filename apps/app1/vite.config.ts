import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl({
      include: [
        '**/*.glsl',
        '**/*.vs',
        '**/*.fs',
        '**/*.vert',
        '**/*.frag'
      ]
    }),
  ],
  optimizeDeps:{
    include:[
      'leva',
    ],
  },
  server: {
    port: 5000, open: true,
  },
  build: {
    outDir: 'dist', emptyOutDir: true
  },
  resolve: {
    alias: {
      "@lib1/*":"../../packages/lib1/*"
    }
  }
})
