import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
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
