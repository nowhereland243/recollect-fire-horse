import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        topic: resolve(__dirname, 'topic.html'),
        menu: resolve(__dirname, 'menu.html'),
        sponsors: resolve(__dirname, 'sponsors.html'),
      },
    },
  },
});
