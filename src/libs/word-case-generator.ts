import { getCryptoRandomArbitrary } from "./random-numbers";

function* sameWordCaseGenerator(wordCase: string): Generator<string> {
  while (1) {
    yield wordCase;
  }
}

function* randomWordCaseGenerator(): Generator<string> {
  const randomCaseOffset = getCryptoRandomArbitrary(0, 1);
  let idx = 0;
  while (1) {
    const nextRes = idx % 2 === randomCaseOffset ? "lower" : "upper";
    yield nextRes;
    idx++;
  }
}

/**
 * Generate next word case (starting from random case).
 * Expected: lower, upper, lower, upper... or upper, lower, upper, ...
 */
function* getNextWordCase(wordCase: string): Generator<string> {
  const generator =
    wordCase === "random"
      ? randomWordCaseGenerator()
      : sameWordCaseGenerator(wordCase);

  yield* generator;
}

export { getNextWordCase };
