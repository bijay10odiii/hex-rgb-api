/**
 * Integration tests for the GET /api/hex-to-rgb route.
 * Uses supertest to send HTTP requests to the app in-process.
 */
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /api/hex-to-rgb (integration)', () => {
  it('returns 200 and RGB for a valid hex', async () => {
    const res = await request(app).get('/api/hex-to-rgb').query({ hex: 'ff8800' });

    expect(res.status).to.equal(200);
    expect(res.type).to.match(/json/);
    expect(res.body).to.deep.equal({
      hex: 'ff8800',
      rgb: { r: 255, g: 136, b: 0 },
    });
  });

  it('accepts a "#"-prefixed hex when URL-encoded', async () => {
    const res = await request(app).get('/api/hex-to-rgb?hex=%23f80');

    expect(res.status).to.equal(200);
    expect(res.body.rgb).to.deep.equal({ r: 255, g: 136, b: 0 });
  });

  it('returns 400 when the hex parameter is missing', async () => {
    const res = await request(app).get('/api/hex-to-rgb');

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('returns 400 for an invalid hex value', async () => {
    const res = await request(app).get('/api/hex-to-rgb').query({ hex: 'zzzzzz' });

    expect(res.status).to.equal(400);
    expect(res.body.error).to.include('Invalid hex color');
  });

  it('returns 400 for a repeated parameter (non-string input)', async () => {
    const res = await request(app).get('/api/hex-to-rgb?hex=fff&hex=000');

    expect(res.status).to.equal(400);
  });

  it('returns 404 for an unknown route', async () => {
    const res = await request(app).get('/api/unknown');

    expect(res.status).to.equal(404);
  });
});
