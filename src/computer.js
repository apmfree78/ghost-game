// determine winning set of words for computer
// to choose from
// arr is array of valid words that contain
// prefix and prefixSize is length of prefix
export const winningWords = (arr, prefixSize) => {
  // first find all words of size prefixSize + 1
  // we need to make sure next letter is NOT the 
  // final letter of these words, otherwise game
  // over for computer
  let lossLetters = '';
  const winners = [];
  let winningOdds = false;
  let longest = 0; // length of longest word


  for (const word of arr) {
    if (word.length === prefixSize + 1) {
      lossLetters += word[prefixSize];
    }

    //checking size
    if (word.length > longest) {
      longest = word.length;
    }
  }


  //generate list of winning words that do NOT contain
  // lossLetters at position word.length
  // also make sure word size is odd 

  for (const word of arr) {
    if (word.length > prefixSize + 1
      && !lossLetters.includes(word[prefixSize])
      && word.length % 2 !== 0)
      winners.push(word);
  }

  if (winners.length > 0) winningOdds = true;

  return [winningOdds, winners, longest];
}

// method to return array of words with length 'length'
export const getWordsOfLength = (arr, length) => {

  const finalWords = [];

  for (const word of arr) {
    if (word.length === length) finalWords.push(word);
  }

  return finalWords;
}

// choose random word from array
export const chooseRandomWord = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
