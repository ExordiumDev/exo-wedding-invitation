const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const cors = require('cors');

const app = express();
const host = '0.0.0.0';

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(cors({
  credentials: true
}));
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'dist/index.html'));
});

var server = app.listen(process.env.VITE_APP_PORT || 8001, host, function () {
  var port = server.address().port;
  console.log("App now running on host", host);
  console.log("App now running on port", port);
});