// LoggingMiddleware/demoServer.js
const express = require('express');
const logger = require('./logger');

const app = express();
app.use(express.json());
app.use(logger);

app.get('/demo', (req, res) => {
  res.json({ ok: true, msg: 'logger demo' });
});

app.listen(3001);
