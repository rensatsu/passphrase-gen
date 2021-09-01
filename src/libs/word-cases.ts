/** A module for a list of word cases in a passphrase */

/**
 * Word Case enum.
 *
 * @constant
 * @enum {number}
 */
const enum WordCase {
  Lower = "lower",
  Upper = "upper",
  UcFirst = "ucfirst",
  Random = "random",
}

const wordCaseNames = new Map([
  [WordCase.Lower, "lower case"],
  [WordCase.Upper, "UPPER CASE"],
  [WordCase.UcFirst, "Upper Case First Letter"],
  [WordCase.Random, "RANDOM case"],
]) as Map<WordCase, string>;

export { WordCase, wordCaseNames };
