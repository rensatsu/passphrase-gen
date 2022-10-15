/** A module for a list of delimiters in a passphrase */

const delimiters = new Map([
  ["Dash", "-"],
  ["Space", " "],
  ["Underscore", "_"],
  ["Plus", "+"],
  ["Equals", "="],
  ["Asterisk", "*"],
  ["Dollar", "$"],
  ["Exclamation mark", "!"],
  ["No delimiter", ""],
]) as Map<string, string>;

export { delimiters };
