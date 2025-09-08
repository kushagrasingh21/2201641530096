// src/models/Url.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true, index: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  clicks: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: null }
});

module.exports = mongoose.model('Url', urlSchema);
