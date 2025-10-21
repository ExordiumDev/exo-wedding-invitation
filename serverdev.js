// // ------------------------------------------------------------------------------------------

// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import https from 'https';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// const options = {
//   key: fs.readFileSync(path.join(__dirname, '../crt/pratiwi-ahmad.com-key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, '../crt/pratiwi-ahmad.com.pem')),
// };
// app.use(
//   '/',
//   createProxyMiddleware({
//     target: 'https://127.0.0.1', // atau http://localhost:9015 jika Vite tidak pakai SSL
//     changeOrigin: true,
//     ws: true, 
//     secure: false,
//   })
// );

// const server = https.createServer(options, app);


// server.on('upgrade', (req, socket, head) => {
//   const proxy = require('http-proxy').createProxyServer({
//     target: 'https://127.0.0.1',
//     ws: true,
//     secure: false,
//   });

//   // Tambahkan ini untuk WS Origin
//   proxy.on('proxyReqWs', function (proxyReq) {
//     proxyReq.setHeader('Origin', 'https://pratiwi-ahmad.com');
//   });

//   proxy.ws(req, socket, head);
//   console.log('WS upgrade:', req.url);
// });

// server.listen(443, () => {
//   console.log('Express server proxying Vite now running at: https://pratiwi-ahmad.com');
// });

// app.listen(8080, () => {
//   console.log('HTTP server running at http://pratiwi-ahmad.com:8080');
// })

// // ------------------------------------------------------------------------------------------

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Proxy semua request ke Vite dev server
app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:3000', // arahkan ke Vite dev server
    changeOrigin: true,
    ws: true,
    secure: false,
  })
);

const PORT_HTTP = 8080;

app.listen(PORT_HTTP, () => {
  console.log(`HTTP proxy server running at http://localhost:${PORT_HTTP}`);
});
