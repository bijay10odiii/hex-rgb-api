/**
 * Unit tests for the hexToRgb library function.
 */
import { expect } from 'chai';
import { hexToRgb } from '../src/hexToRgb.js';

describe('hexToRgb (unit)', () => {
  it('converts a 6-digit hex with "#"', () => {
    expect(hexToRgb('#ff8800')).to.deep.equal({ r: 255, g: 136, b: 0 });
  });

  it('converts a 6-digit hex without "#"', () => {
    expect(hexToRgb('00ff00')).to.deep.equal({ r: 0, g: 255, b: 0 });
  });

  it('expands 3-digit shorthand', () => {
    expect(hexToRgb('#f80')).to.deep.equal({ r: 255, g: 136, b: 0 });
  });

  it('is case-insensitive', () => {
    expect(hexToRgb('#AbCdEf')).to.deep.equal(hexToRgb('#abcdef'));
  });

  it('handles boundary values black and white', () => {
    expect(hexToRgb('#000000')).to.deep.equal({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ffffff')).to.deep.equal({ r: 255, g: 255, b: 255 });
  });

  it('throws on invalid characters', () => {
    expect(() => hexToRgb('#gg0000')).to.throw('Invalid hex color');
  });

  it('throws on wrong length', () => {
    expect(() => hexToRgb('#ff88')).to.throw('Invalid hex color');
    expect(() => hexToRgb('')).to.throw('Invalid hex color');
  });

  it('throws TypeError on non-string input', () => {
    expect(() => hexToRgb(123456)).to.throw(TypeError);
    expect(() => hexToRgb(null)).to.throw(TypeError);
  });
});
