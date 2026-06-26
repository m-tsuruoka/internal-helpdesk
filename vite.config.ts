import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss(),],
  test: {
    environment: 'jsdom',         // ブラウザ環境をエミュレート
    globals: true,                // describe/it/expect をインポートなしで使う
    setupFiles: './src/test/setup.ts',  // テスト前の共通設定
  },
})