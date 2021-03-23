/**
 * Capitalize first letters of every word in a string
 * @param {string} str A string
 * @return {string} A formatted string
 */
const ucFirst = (str) => {
  const pieces = str.split(" ");

  for (let i = 0; i < pieces.length; i++) {
    const j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }

  return pieces.join(" ");
};

export default ucFirst;
