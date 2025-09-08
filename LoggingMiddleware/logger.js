// LoggingMiddleware/logger.js
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'logs.txt');

function safeStringify(obj) {
  try { return JSON.stringify(obj); } catch (e) { return '"[unserializable]"'; }
}

function logger(req, res, next) {
  const start = Date.now();

  // Attach listener for when response finishes to record status and duration
  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const entry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      ip: req.ip,
      status: res.statusCode,
      durationMs,
      // record small request details; body may be large but we keep it
      body: req.body,
      headers: {
        'user-agent': req.get('User-Agent'),
        referer: req.get('Referer')
      }
    };

    try {
      fs.appendFileSync(LOG_FILE, safeStringify(entry) + '\n');
    } catch (err) {
      // swallow logging errors: don't crash app
    }
  });

  next();
}

module.exports = logger;
