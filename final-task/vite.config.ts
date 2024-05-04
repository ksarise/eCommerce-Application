import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: './',

  plugins: [eslint()],

  server: {
    port: 8080,
    open: true,
  },
});
