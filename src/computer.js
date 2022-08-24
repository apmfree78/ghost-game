

// loop through 'arr' the array of words
// to find number of even length words
// if this number is greater than the odd
// number of words , computer has greater 
// chance of winning
// also finds longest word and returns it
export const WordAnalysis = (arr, minLength) => {

  let oddCount = 0;
  let evenCount = 0;
  const evenWords = [];
  let longest = 0; // length of longest word
  const min = Math.max(minLength, 4);

  for (const word of arr) {

    //checking word length
    if (word.length >= min) {
      if (word.length % 2 === 0) {
        evenWords.push(word);
        evenCount++;
      } else oddCount++;
    }
    //checking size
    if (word.length > longest) {
      longest = word.length;
    }
  }

  const computerAdvantage = evenCount > oddCount;

  return [computerAdvantage, evenWords, longest];
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
  return arr[index]
}
