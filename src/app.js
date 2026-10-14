/**
 * Express application exposing the hex-to-RGB conversion as a REST API.
 * The app is exported separately from the server start-up so tests can use it
 * without opening a network port.
 */
import express from 'express';
import { hexToRgb } from './hexToRgb.js';

const app = express();

/**
 * GET /api/hex-to-rgb?hex=ff8800
 * Note: "#" must be URL-encoded as %23 in query strings, so it is optional.
 *
 * 200: { "hex": "ff8800", "rgb": { "r": 255, "g": 136, "b": 0 } }
 * 400: { "error": "..." } for missing or invalid input
 */
app.get('/api/hex-to-rgb', (req, res) => {
  const { hex } = req.query;

  if (hex === undefined) {
    return res.status(400).json({ error: 'Query parameter "hex" is required' });
  }

  try {
    const rgb = hexToRgb(hex);
    return res.status(200).json({ hex, rgb });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default app;
