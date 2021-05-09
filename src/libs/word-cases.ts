/** A module for a list of word cases in a passphrase */

/**
 * Word Case enum.
 *
 * @enum {number}
 */
enum WordCase {
  Lower = "lower",
  Upper = "upper",
  UcFirst = "ucfirst",
  Random = "random",
}

const wordCaseNames = {
  [WordCase.Lower]: "lower case",
  [WordCase.Upper]: "UPPER CASE",
  [WordCase.UcFirst]: "Upper Case First Letter",
  [WordCase.Random]: "RANDOM case",
};

export { WordCase, wordCaseNames };
