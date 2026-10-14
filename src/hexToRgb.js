/**
 * Hex-to-RGB conversion library.
 * @module hexToRgb
 */

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * Converts a hex color string to an RGB object.
 * Accepts 3- or 6-digit hex values, with or without a leading "#",
 * in upper or lower case (e.g. "#ff8800", "f80", "FF8800").
 *
 * @param {string} hex - The hex color value.
 * @returns {{r: number, g: number, b: number}} RGB values, each 0-255.
 * @throws {TypeError} If the input is not a string.
 * @throws {Error} If the string is not a valid hex color.
 */
export function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Hex value must be a string');
  }

  const match = HEX_PATTERN.exec(hex.trim());
  if (!match) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }

  let digits = match[1];
  if (digits.length === 3) {
    // Expand shorthand: "f80" -> "ff8800"
    digits = digits.split('').map((c) => c + c).join('');
  }

  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16),
  };
}
