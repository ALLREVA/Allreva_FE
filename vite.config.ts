import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
    mkcert(),
    svgr(),
  ],
  define: {
    global: 'window',
  },
});
