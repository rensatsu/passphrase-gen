import IDictionary from "./struct/i-dictionary";

/** Class representing a dictionary */
class Dictionary {
  private dictionary: IDictionary;

  constructor(dictionary: IDictionary) {
    this.dictionary = dictionary;
  }

  get code(): string {
    return this.dictionary.code;
  }

  get name(): string {
    return this.dictionary.name;
  }

  get path(): string {
    return this.dictionary.path;
  }

  get title(): string {
    return this.dictionary.title;
  }

  get source(): string {
    return this.dictionary.source;
  }
}

export default Dictionary;
