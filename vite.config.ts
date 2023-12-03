/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import * as vite from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default vite.defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  base: '/cinelounge', // * <REPO> * //
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTest.ts'],
  },
  build: {
    outDir: './dist',
  },
});
