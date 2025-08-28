// import express from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// import 'dotenv/config';
// import { config } from 'dotenv';
// config({ path: '.env.development' });

// const app = express();
// const host = '127.0.0.1';
// const port = process.env.VITE_APP_PORT || 5173;

// app.use(
//   '/',
//   createProxyMiddleware({
//     target: `https://localhost:${process.env.VITE_APP_PORT}`,
//     secure: false,
//     changeOrigin: true,
//     ws: true, 
//     logLevel: 'silent',
//   })
// );

// app.listen(port, host, () => {
//   console.log('Express server proxying Vite now running at:', `http://${host}:${port}`);
// });


// ------------------------------------------------------------------------------------------


import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const options = {
  key: fs.readFileSync(path.join(__dirname, './crt/elibrary-dev.jalaera.com-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './crt/elibrary-dev.jalaera.com.pem')),
};
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://127.0.0.1', // atau http://localhost:9015 jika Vite tidak pakai SSL
    changeOrigin: true,
    ws: true, 
    secure: false,
  })
);

const server = https.createServer(options, app);


server.on('upgrade', (req, socket, head) => {
  const proxy = require('http-proxy').createProxyServer({
    target: 'https://127.0.0.1',
    ws: true,
    secure: false,
  });

  // Tambahkan ini untuk WS Origin
  proxy.on('proxyReqWs', function (proxyReq) {
    proxyReq.setHeader('Origin', 'https://elibrary-dev.jalaera.com');
  });

  proxy.ws(req, socket, head);
  console.log('WS upgrade:', req.url);
});

server.listen(9015, () => {
  console.log('Express server proxying Vite now running at: https://elibrary-dev.jalaera.com');
});

// ------------------------------------------------------------------------------------------

