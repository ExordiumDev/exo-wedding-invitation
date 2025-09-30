import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// import 'dotenv/config';
// import { config } from 'dotenv';
// config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
      host: env.VITE_APP_ALLOWED_HOSTS,
      port: 443,
      https: {
        key: fs.readFileSync('./crt/exordium.id-key.pem'),
        cert: fs.readFileSync('./crt/exordium.id.pem'),
      },
      hmr: {
        protocol: 'wss',
        host: 'exordium.id',
        clientPort: 443,
      },
      cors: { 
        origin: '*'
      },
      strictPort: true,
    },
  }
})
