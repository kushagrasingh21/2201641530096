// src/routes/urlRoutes.js
const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

// Import nanoid dynamically inside async function
async function getNanoid() {
  const { nanoid } = await import('nanoid');
  return nanoid;
}

// ... inside your POST /shorten
router.post('/shorten', async (req, res) => {
  try {
    const { longUrl, customCode, validity } = req.body;
    // ...
    let code = null;

    if (!customCode) {
      const nanoid = await getNanoid();
      let tries = 0;
      do {
        code = nanoid(7);
        const exists = await Url.findOne({ shortCode: code });
        if (!exists) break;
        tries++;
      } while (tries < 5);
    } else {
      // customCode validation as before
    }

    // rest of logic stays the same
  } catch (err) {
    return res.status(500).json({ error: 'server_error', details: err.message });
  }
});
