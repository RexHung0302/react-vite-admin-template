import { defineConfig } from 'vite';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  // server: {
  //   host: '0.0.0.0',
  // },
  base: '/',
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  resolve: {
    // 這邊設定完需要再到 tsconfig.json 去設定 paths 不然會出錯
    alias: [
      {
        find: '@/',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '@/utils',
        replacement: resolve(__dirname, 'src/utils'),
      },
      {
        find: '@/constants',
        replacement: resolve(__dirname, 'src/constants'),
      },
      {
        find: '@/store',
        replacement: resolve(__dirname, 'src/store'),
      },
      {
        find: '@/components',
        replacement: resolve(__dirname, 'src/components'),
      },
      {
        find: '@/assets',
        replacement: resolve(__dirname, 'src/assets'),
      },
      {
        find: '@/router',
        replacement: resolve(__dirname, 'src/router'),
      },
      {
        find: '@/pages',
        replacement: resolve(__dirname, 'src/pages'),
      },
      {
        find: '@/i18n',
        replacement: resolve(__dirname, 'src/i18n'),
      },
    ],
  },
});
