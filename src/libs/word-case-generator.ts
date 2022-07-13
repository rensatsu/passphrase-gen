import { getCryptoRandomArbitrary } from "./random-numbers";
import { WordCase } from "./word-cases";

function* sameWordCaseGenerator(wordCase: WordCase): Generator<string> {
  while (1) {
    yield wordCase;
  }
}

function* randomWordCaseGenerator(): Generator<string> {
  const randomCaseOffset = getCryptoRandomArbitrary(0, 1);
  let idx = 0;
  while (1) {
    const nextRes =
      idx % 2 === randomCaseOffset ? WordCase.Lower : WordCase.Upper;
    yield nextRes;
    idx++;
  }
}

/**
 * Generate next word case (starting from random case).
 * Expected: lower, upper, lower, upper... or upper, lower, upper, ...
 */
function* getNextWordCase(wordCase: WordCase): Generator<string> {
  const generator =
    wordCase === WordCase.Random
      ? randomWordCaseGenerator()
      : sameWordCaseGenerator(wordCase);

  yield* generator;
}

export { getNextWordCase };
