import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src'), '@domain': path.resolve(__dirname, './src/domain'), '@infrastructure': path.resolve(__dirname, './src/infrastructure'), '@application': path.resolve(__dirname, './src/application') } },
  server: { port: 3000, open: true },
})
