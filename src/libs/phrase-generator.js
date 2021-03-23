import dictionaries from "./load-dictionaries";
import ucFirst from "./uc-first";

/**
 * Minimum amount of entries in a dictionary
 * @constant
 * @type {number}
 */
const MIN_DICTIONARY_LENGTH = 100;

/**
 * Infinite loop prevention timeout (msec)
 * @constant
 * @type {number}
 */
const INFINITE_LOOP_TIMEOUT = 3000;

/**
 * Dictionary cache object
 * @type {Object}
 */
const dictionaryCache = {};

/**
 * Fetch a dictionary
 * @param {string} name Name of a dictionary
 * @return {Promise} Resolved into an array of the dictionary entries
 */
const fetchDictionary = (name) => {
  return new Promise(async (resolve, reject) => {
    // check dictionary in the cache
    if (name in dictionaryCache) {
      resolve(dictionaryCache[name]);
      return;
    }

    try {
      const dictData = dictionaries.get(name);
      if (!dictData) {
        throw new Error("Unable to get dictionary information");
      }

      const url = new URL("https://ren-phrase-dict.netlify.app/");
      url.pathname = dictData.path;

      const resp = await fetch(url, { method: "GET" });

      const text = await resp.text();

      // split a dictionary into an array
      // convert all entries to lower case
      const parsedArray = text
        .split(/\r|\n/)
        .map((e) => e.trim().toLowerCase());

      // check if the dictionary is loaded by measuring its length
      if (parsedArray.length < MIN_DICTIONARY_LENGTH) {
        throw new Error("Dictionary is too short");
      }

      // store an array in the cache
      dictionaryCache[name] = parsedArray;

      resolve(parsedArray);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * Get a cryptographically secure random number, similar to Math.random()
 * @return {number} A random float between 0 and 1
 */
const getCryptoRandom = () => {
  // division by max value of Uint32 (4 bytes)
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 0xffffffff;
};

/**
 * Get a cryptographically secure random number
 * @param {number} min Minimum integer
 * @param {number} max Maximum integer
 * @return {number} A random integer between `min` and `max`
 */
const getCryptoRandomArbitrary = (min = 0, max = 1) => {
  const rnd = getCryptoRandom();
  return Math.round(rnd * (max - min) + min);
};

window.getCryptoRandomArbitrary = getCryptoRandomArbitrary;
window.getCryptoRandom = getCryptoRandom;

/**
 * Get a cryptographically secure random number as a string of specific length
 * @param {number} length Length ot a string
 * @return {string} A random string of specific length
 */
const getRandomDigits = (length) => {
  const arr = new Array(length).fill(1).map((e) => {
    return getCryptoRandomArbitrary(0, 9);
  });

  return arr.join("");
};

/**
 * Convert a case of the string
 * @param {string} str Input string
 * @param {string} wCase Target case, possible values: lower, upper, ucfirst
 * @return {string} Converted string
 */
const convertCase = (str, wCase) => {
  switch (wCase) {
    case "lower":
      return str.toLowerCase();
    case "upper":
      return str.toUpperCase();
    case "ucfirst":
      return ucFirst(str);
    default:
      throw new Error("Unknown case");
  }
};

/**
 * Get a random phrase
 * @param {Object} opts Phrase generation options
 * @param {string} opts.dictionary A dictionary to use
 * @param {number} opts.words Amount of words
 * @param {number} opts.digitsCount Amount of ranomd digits (0 to disable)
 * @param {number} opts.minWordLength Minimum word length
 * @param {number} opts.maxWordLength Maximum word length
 * @param {string} opts.wordCase Word case (allowed: lower, upper, ucfirst, ranom)
 * @param {string} opts.delimiter A delimiter between parts of a phrase
 */
const getRandomPhrase = async ({
  dictionary = null,
  words = 3,
  digitsCount = 4,
  minWordLength = 3,
  maxWordLength = 8,
  wordCase = "lower",
  delimiter = "-",
} = {}) => {
  // check params
  if (!dictionary) {
    throw new Error("Dictionary name is not defined");
  }

  if (minWordLength > maxWordLength) {
    throw new Error("Incorrect min or max option");
  }

  if (words <= 0) {
    throw new Error("Incorrect amount of words");
  }

  // loading the dictionary
  const dictArray = await fetchDictionary(dictionary);

  // create an empty set for a phrase
  // (prevents repetitive entries)
  const wordSet = new Set();

  // generation process start time
  const startTime = performance.now();

  while (1) {
    // get a random entry from the dictionary and split words into an array
    const wds = dictArray[~~(dictArray.length * getCryptoRandom())].split(
      /\s+/,
    );

    wds.forEach((w) => {
      // check constraints
      if (w.length < minWordLength) return;
      if (w.length > maxWordLength) return;

      // add a word to a set
      wordSet.add(w);
    });

    // stop if there are enough words
    if (wordSet.size >= words) break;

    // terminate on timeout
    if (performance.now() - startTime > INFINITE_LOOP_TIMEOUT) {
      throw new Error("Unable to generate password with specified options");
    }
  }

  // offset for random case
  const randomCaseOffset = getCryptoRandomArbitrary(0, 1);

  // convert a set to an array
  let phrase = [...wordSet];

  // if there are more words than needed -> skip them
  phrase = phrase.slice(0, words);

  // convert case
  phrase = phrase.map((e, idx) => {
    const nextCase =
      wordCase === "random"
        ? idx % 2 === randomCaseOffset
          ? "lower"
          : "upper"
        : wordCase;
    return convertCase(e, nextCase);
  });

  // add digits
  if (digitsCount > 0) {
    phrase.push(getRandomDigits(digitsCount));
  }

  // convert an array to a string
  phrase = phrase.join(delimiter);

  return phrase;
};

export default getRandomPhrase;
