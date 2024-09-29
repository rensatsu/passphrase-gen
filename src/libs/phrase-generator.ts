import dictionaries from "./load-dictionaries.js";
import { upperCaseFirst } from "upper-case-first";
import IOptions from "./struct/i-options.js";
import { getCryptoRandom, getRandomDigits } from "./random-numbers.js";
import { getNextWordCase } from "./word-case-generator.js";
import { WordCase } from "./word-cases.js";

/**
 * Minimum amount of entries in a dictionary.
 */
const MIN_DICTIONARY_LENGTH: number = 100;

/**
 * Infinite loop prevention timeout (msec).
 */
const INFINITE_LOOP_TIMEOUT: number = 3000;

/**
 * Dictionary cache object.
 */
const dictionaryCache = new Map() as Map<string, string[]>;

/**
 * Fetch a dictionary
 * @param {string} name Name of a dictionary
 * @return {Promise} Resolved into an array of the dictionary entries
 */
async function fetchDictionary(name: string): Promise<string[]> {
  // check dictionary in the cache
  if (dictionaryCache.has(name)) {
    const result = dictionaryCache.get(name);
    if (!result) throw new Error("Something went wrong");
    return result;
  }

  const dictData = dictionaries.get(name);
  if (!dictData) {
    throw new Error("Unable to get dictionary information");
  }

  const url = new URL(
    `https://passphrase-gen-dict-b86.pages.dev/dict/${dictData.path}`,
    location.href
  );

  const resp = await fetch(url.toString());
  if (!resp.ok) {
    throw new Error("Unable to fetch dictionary due to network error");
  }

  const text = await resp.text();

  // split a dictionary into an array
  // convert all entries to lower case
  const parsedArray = text.split(/\r|\n/).map((e) => e.trim().toLowerCase());

  // check if the dictionary is loaded by measuring its length
  if (parsedArray.length < MIN_DICTIONARY_LENGTH) {
    throw new Error("Dictionary is too short");
  }

  // store an array in the cache
  dictionaryCache.set(name, parsedArray);

  return parsedArray;
}

/**
 * Convert a case of the string
 * @param {string} str Input string
 * @param {string} wCase Target case, possible values: lower, upper, ucfirst
 * @return {string} Converted string
 */
function convertCase(str: string, wCase: WordCase): string {
  switch (wCase) {
    case WordCase.Lower:
      return str.toLowerCase();
    case WordCase.Upper:
      return str.toUpperCase();
    case WordCase.UcFirst:
      return upperCaseFirst(str);
    default:
      throw new Error("Unknown case");
  }
}

/**
 * Get a random phrase
 * @param {IOptions} opts Phrase generation options
 */
async function getRandomPhrase(opts: IOptions): Promise<string> {
  // check params
  if (opts.dictionary === null) {
    throw new Error("Dictionary name is not defined");
  }

  if (opts.minWordLength > opts.maxWordLength) {
    throw new Error("Incorrect min or max option");
  }

  if (opts.words <= 0) {
    throw new Error("Incorrect amount of words");
  }

  // loading the dictionary
  const dictArray = await fetchDictionary(opts.dictionary);

  // create an empty set for a phrase
  // (prevents repetitive entries)
  const wordSet = new Set() as Set<string>;

  // generation process start time
  const startTime = performance.now();

  while (1) {
    // get a random entry from the dictionary and split words into an array
    const wds = dictArray[~~(dictArray.length * getCryptoRandom())].split(
      /\s+/
    ) as Array<string>;

    wds.forEach((w) => {
      // check constraints
      if (w.length < opts.minWordLength) return;
      if (w.length > opts.maxWordLength) return;

      // add a word to a set
      wordSet.add(w);
    });

    // stop if there are enough words
    if (wordSet.size >= opts.words) break;

    // terminate on timeout
    if (performance.now() - startTime > INFINITE_LOOP_TIMEOUT) {
      throw new Error("Unable to generate password with specified options");
    }
  }

  // convert a set to an array
  let phrase = [...wordSet];

  // if there are more words than needed -> skip them
  phrase = phrase.slice(0, opts.words);

  // random word case generator
  const nextCaseGenerator = getNextWordCase(opts.wordCase);

  // convert case
  phrase = phrase.map((e) => {
    const nextCase = nextCaseGenerator.next().value;
    return convertCase(e, nextCase);
  });

  // add digits
  if (opts.digits > 0) {
    phrase.push(getRandomDigits(opts.digits));
  }

  return phrase.join(opts.delimiter);
}

export { getRandomPhrase };
