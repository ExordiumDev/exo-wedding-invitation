import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import 'dotenv/config';
import { config } from 'dotenv';
config({ path: '.env.development' });

import fs from 'fs';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    }
  },
  server: {
    middlewareMode: false,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      });
    },
    proxy: {
      '/getmaster-v2':{
            target: `https://api.jalaera.com/`,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/getmaster-v2/, '/elibrary/master'),
            secure: false,
        },
        '/article-api-v2':{
            target: `https://api.jalaera.com/`,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/article-api-v2/, '/elibrary'),
            secure: false,
        },
        '^/files-api-v2': {
            target: 'https://api.jalaera.com/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/files-api-v2/, '/elibrary/articles/files'),
        },
        '/pdf-api-v2': {
            target: 'https://jalaniagaelok.web.id',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/pdf-api-v2/, '/files/elibrary/Files'),
        },

    },
    host: process.env.VITE_APP_ALLOWED_HOSTS,
    port: parseInt(process.env.VITE_APP_PORT) || 8015,
    // https: true,
    https: {
      key: fs.readFileSync('./crt/elibrarys.jalaera.com-key.pem'),
      cert: fs.readFileSync('./crt/elibrarys.jalaera.com.pem'),
    },
    hmr: {
      protocol: 'wss',
      host: 'elibrarys.jalaera.com',
      clientPort: 9015,
    },
    cors: { 
      origin: '*'
    },
    strictPort: true,
  },
})
