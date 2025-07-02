import { WordCase } from "../word-cases.js";

interface IOptions {
  /**
   * A dictionary to use.
   *
   * @type {string}
   * @memberof IOptions
   */
  dictionary: string;

  /**
   * Amount of words.
   *
   * @type {number}
   * @memberof IOptions
   */
  words: number;

  /**
   * Amount of ranomd digits (0 to disable)
   *
   * @type {number}
   * @memberof IOptions
   */
  digits: number;

  /**
   * Minimum word length.
   *
   * @type {number}
   * @memberof IOptions
   */
  minWordLength: number;

  /**
   * Maximum word length.
   *
   * @type {number}
   * @memberof IOptions
   */
  maxWordLength: number;

  /**
   * Word case (allowed: lower, upper, ucfirst, random).
   *
   * @type {WordCase}
   * @memberof IOptions
   */
  wordCase: WordCase;

  /**
   * A delimiter between parts of a phrase.
   *
   * @type {string}
   * @memberof IOptions
   */
  delimiter: string;

  /**
   * Amount of phrases to generate.
   *
   * @type {number}
   * @memberof IOptions
   */
  count?: number;

  /**
   * Show advanced options UI.
   *
   * @type {boolean}
   * @memberof IOptions
   */
  isAdvanced?: boolean;
}

export default IOptions;
