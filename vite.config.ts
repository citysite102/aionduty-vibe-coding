import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // GitHub Pages 的 project site 服務在 https://<帳號>.github.io/<repo>/ 底下，
    // 不設 base 的話所有 JS/CSS/favicon 都會指到網域根目錄而 404。
    // 之後若改綁自訂網域，把這行改回 '/'。
    base: '/aionduty-vibe-coding/',
    plugins: [react(), tailwindcss()],
    build: {
      // 兩個入口：簡報在根目錄，課堂工具箱在 /tools/。
      // 同一個 repo、同一次部署，所以簡報上印的網址跟工具箱永遠是同一版。
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          tools: path.resolve(__dirname, 'tools/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3001,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
