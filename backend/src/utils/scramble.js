/**
 * Shuffles the letters of a string.
 * @param {string} text - The text to scramble.
 * @returns {string} The scrambled text.
 */
function scrambleWord(text) {
  const letters = text.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]]; // Swap
  }
  
  const scrambled = letters.join('');

  // Optional: Check if scrambled word is same as original (rare for long words)
  // If it is, and the word is longer than 2 letters, try scrambling again.
  if (scrambled === text && text.length > 2) {
    return scrambleWord(text); // Recurse
  }
  
  return scrambled;
}

export { scrambleWord };