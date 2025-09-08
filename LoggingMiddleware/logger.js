// LoggingMiddleware/logger.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const LOG_FILE = path.join(__dirname, 'logs.txt');

// Fixed values for this server instance
const ACCESS_CODE = "sAWTuR";
const CLIENT_ID = uuidv4();

function safeStringify(obj) {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return '"[unserializable]"';
  }
}

function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const entry = {
      accessCode: ACCESS_CODE,
      clientId: CLIENT_ID,
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      ip: req.ip,
      status: res.statusCode,
      durationMs,
      body: req.body,
      headers: {
        'user-agent': req.get('User-Agent'),
        referer: req.get('Referer')
      }
    };

    try {
      fs.appendFileSync(LOG_FILE, safeStringify(entry) + '\n');
    } catch (err) {
      // Don't crash app on logging error
    }
  });

  next();
}

module.exports = logger;
