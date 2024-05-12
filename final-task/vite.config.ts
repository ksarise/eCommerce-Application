import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: './',

  plugins: [eslint()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  server: {
    port: 8080,
    open: true,
  },
});
