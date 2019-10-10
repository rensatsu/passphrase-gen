/** Class representing a dictionary */
class Dictionary {
    /**
     * Create a new dictionary
     * @param {Object} params Dictionary parameters
     * @param {string} code Dictionary code
     * @param {string} name Dictionary name to show in the <select>
     * @param {string} title Full title of the disctionary
     * @param {string} source Source URL of the dictionary
     */
    constructor({ code, name, path, title, source }) {
        this.code = code;
        this.name = name;
        this.path = path;
        this.title = title;
        this.source = source;
    }
}

export default Dictionary;
