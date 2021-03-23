/** Class representing a collection of dictionaries */
class DictionaryCollection {
  /** Create a new collection */
  constructor() {
    this.collection = {};
  }

  /**
   * Add a dictionary to the collection
   * @param {Dictionary} dictionary An instance of the dictionary
   */
  add(dictionary) {
    this.collection[dictionary.code] = dictionary;
  }

  /**
   * Get an array of all dictionaries in the collection
   * @return {array} Array of dictionaries
   */
  list() {
    return this.collection;
  }

  /**
   * Get a dictionary by its code
   * @param {string} code Dictionary code
   * @return {Dictionary} A dictionary
   */
  get(code) {
    if (code in this.collection) {
      return this.collection[code];
    } else {
      return null;
    }
  }
}

export default DictionaryCollection;
