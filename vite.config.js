// import { defineConfig, loadEnv } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

// // import 'dotenv/config';
// // import { config } from 'dotenv';
// // config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// import fs from 'fs';

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')

//   return {
//     plugins: [vue()],
//     resolve: {
//       alias: {
//         '@': path.resolve(__dirname, 'src'),
//       }
//     },
//     server: {
//       middlewareMode: false,
//       configureServer(server) {
//         server.middlewares.use((req, res, next) => {
//           res.setHeader('Access-Control-Allow-Origin', '*');
//           next();
//         });
//       },
//       host: env.VITE_APP_ALLOWED_HOSTS,
//       port: 443,
//       https: {
//         key: fs.readFileSync('../crt/exo-wedding-invitation/pratiwi-ahmad.com-key.pem'),
//         cert: fs.readFileSync('../crt/exo-wedding-invitation/pratiwi-ahmad.com.pem'),
//       },
//       hmr: {
//         protocol: 'wss',
//         host: 'pratiwi-ahmad.com',
//         clientPort: 443,
//       },
//       cors: { 
//         origin: '*'
//       },
//       strictPort: true,
//     },
//   }
// })


import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    server: {
      middlewareMode: false,
      host: 'localhost',
      port: 3000, // port dev server Vite
      cors: { origin: '*' },
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
      },
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        });
      },
    },
  }
})
