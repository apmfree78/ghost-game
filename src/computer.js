

// loop through 'arr' the array of words
// to find number of even length words
// if this number is greater than the odd
// number of words , computer has greater 
// chance of winning
// also finds longest word and returns it
export const WordAnalysis = (arr) => {

  let evenCount = 0;
  let longestWord = '';
  let longest = 0; // length of longest word

  for (const word of arr) {

    //checking word length
    if (word.length % 2 === 0) evenCount++;

    //checking size
    if (word.length > longest) {
      longest = word.length;
      longestWord = word;
    }
  }

  const oddCount = arr.length - evenCount;
  const computerAdvantage = evenCount > oddCount;

  return [computerAdvantage, longestWord];
}
