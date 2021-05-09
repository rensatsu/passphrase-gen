/** A module to load and save form parameters in query string */

import IOptions from "./struct/i-options";
import { WordCase } from "./word-cases";

class Options implements IOptions {
  dictionary: string = "";
  words: number = 3;
  digits: number = 4;
  minWordLength: number = 3;
  maxWordLength: number = 8;
  wordCase: WordCase = WordCase.Lower;
  delimiter: string = "-";
  count: number = 1;

  constructor() {
    const sp = new URLSearchParams(location.search);

    sp.forEach((val, key) => {
      switch (key) {
        case "dictionary":
          this.dictionary = val;
          break;
        case "words":
          this.words = parseInt(val);
          break;
        case "digits":
          this.digits = parseInt(val);
          break;
        case "minWordLength":
          this.minWordLength = parseInt(val);
          break;
        case "maxWordLength":
          this.maxWordLength = parseInt(val);
          break;
        case "wordCase":
          this.wordCase = val as WordCase;
          break;
        case "delimiter":
          this.delimiter = val;
          break;
        case "count":
          this.count = parseInt(val);
          break;
      }
    });
  }

  save() {
    const sp = new URLSearchParams();

    if (this.dictionary) sp.set("dictionary", this.dictionary);
    sp.set("words", this.words.toString());
    sp.set("digits", this.digits.toString());
    sp.set("minWordLength", this.minWordLength.toString());
    sp.set("maxWordLength", this.maxWordLength.toString());
    sp.set("wordCase", this.wordCase);
    sp.set("delimiter", this.delimiter);
    sp.set("count", this.count.toString());

    history.replaceState({}, document.title, "?" + sp.toString());
  }
}

export { Options };
