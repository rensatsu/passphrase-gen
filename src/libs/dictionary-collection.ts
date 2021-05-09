import Dictionary from "./dictionary";

/** Class representing a collection of dictionaries */
class DictionaryCollection {
  #collection: Map<string, Dictionary>;

  /**
   * Create a new collection.
   */
  constructor() {
    this.#collection = new Map();
  }

  /**
   * Add a dictionary to the collection.
   */
  add(dictionary: Dictionary) {
    this.#collection.set(dictionary.code, dictionary);
  }

  /**
   * Get an array of all dictionaries in the collection.
   */
  list(): Map<string, Dictionary> {
    return this.#collection;
  }

  /**
   * Get a dictionary by its code.
   */
  get(code: string): Dictionary | null {
    if (this.#collection.has(code)) {
      return this.#collection.get(code) ?? null;
    }

    return null;
  }
}

export default DictionaryCollection;
