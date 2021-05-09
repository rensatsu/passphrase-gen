interface IDictionary {
  /**
   * Dictionary code.
   *
   * @type {string}
   * @memberof IDictionary
   */
  code: string;

  /**
   * Dictionary name to show in the <select>.
   *
   * @type {string}
   * @memberof IDictionary
   */
  name: string;

  /**
   * Dictionary file path.
   *
   * @type {string}
   * @memberof IDictionary
   */
  path: string;

  /**
   * Full title of the dictionary.
   *
   * @type {string}
   * @memberof IDictionary
   */
  title: string;

  /**
   * Source URL of the dictionary.
   *
   * @type {string}
   * @memberof IDictionary
   */
  source: string;
}

export default IDictionary;
