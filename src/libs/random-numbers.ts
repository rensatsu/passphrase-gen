/**
 * Get a cryptographically secure random number, similar to Math.random()
 * @return {number} A random float between 0 and 1
 */
function getCryptoRandom(): number {
  // division by max value of Uint32 (4 bytes)
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff;
}

/**
 * Get a cryptographically secure random number
 * @param {number} min Minimum integer
 * @param {number} max Maximum integer
 * @return {number} A random integer between `min` and `max`
 */
function getCryptoRandomArbitrary(min: number = 0, max: number = 1): number {
  const rnd = getCryptoRandom();
  return Math.round(rnd * (max - min) + min);
}

/**
 * Get a cryptographically secure random number as a string of specific length
 * @param {number} length Length ot a string
 * @return {string} A random string of specific length
 */
function getRandomDigits(length: number): string {
  const result = new Array(length)
    .fill(1)
    .map(() => getCryptoRandomArbitrary(0, 9))
    .join("");

  return result;
}

export { getCryptoRandom, getCryptoRandomArbitrary, getRandomDigits };
