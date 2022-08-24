import { useEffect, useRef, useState } from "react";
import { WordAnalysis } from './computer.js';
import "./App.css";
import { dictionary } from "./ghost.js";
import trie from 'trie-prefix-tree';

function App() {
  let words = useRef();
  const [win, setWin] = useState(''); // message for who has won 
  const [isWinner, setIsWinner] = useState(false);
  const [turn, setTurn] = useState(true);  // toggle turn between human and computer
  const [matches, setMatches] = useState([]); // words that match input letters
  const [letters, setLetters] = useState(""); // string of input letters
  // load words into trie when application first loads
  useEffect(() => {
    words.current = trie(dictionary);
  }, []);

  // computer plays it's turn
  function computerPlays() {

    // determine if odds are in computers favor
    // getting array of possible words from current prefix
    const prefixWords = words.current.getPrefix(letters);

    // using WordAnalysis method to determine if computer has
    // favorable odds and returning longest word as well
    const [odds, longestWord] = WordAnalysis(prefixWords);

    console.log(`odds are ${odds},longest word is ${longestWord}`)

    if (odds) { // WIN SCENARIO


      // we pull a random word that contains the prefix contained in 'letters'
      // than the computer's letter will be the letters.length character of that word
      let randomWord = '';
      while (randomWord.length <= letters.length) randomWord = words.current.getRandomWordWithPrefix(letters);
      console.log('getting word');
      console.log(randomWord);
      // since gameLogic ran right before this function was called
      // we know that this prefix is valid and contains words
      // and it's not a completed word, otherwise game would be over
      //setting state with new letter
      const newLetter = randomWord[letters.length];
      setLetters(letters + newLetter);
      return newLetter;
    }
    else { // LOSE SCENARIO

      // computer odds are less than 50%, so lets stretch out the game
      // by picking the longest word
      const newLetter = longestWord[letters.length];
      // setting state 
      setLetters(letters + newLetter);
      return newLetter;
    }
  }

  // this function determins state of game
  // based on letters imputed by user and computer
  function gameLogic(currentPlayer = 'human', sequence = letters) {

    // if we have more than 3 sequence than check trie for a match
    if (sequence.length > 3) {
      // check if prefix exists
      if (words.current.isPrefix(sequence)) {
        //update matches
        console.log(`${sequence} is valid`)
        const _words = words.current.getPrefix(sequence);
        setMatches([..._words]);

        //check if sequence form word, if so we have a winner!

        if (words.current.hasWord(sequence)) {
          //WE GOT A WINNER!  
          console.log(`${sequence} is a word`)
          if (currentPlayer === 'human') {
            setWin('Human Player has WON!');
            setIsWinner(true);
          } else {

            setWin('Computer has WON!');
            setIsWinner(true);
          }
        }
      }
      else { // there are no matching prefexes
        // who ever is current player loses! no more matches
        console.log('no prefixes found, game over');
        if (currentPlayer === 'human') {
          setWin('Computer has WON!');
          setIsWinner(true);
        } else {
          setWin('Human Player has WON!');
          setIsWinner(true);
        }
      }
    }
    else {
      //clear matches if there are any
      setMatches([]);
      // restart game
      setWin('');
    }
  }

  const finishTurn = () => {
    // human has finished turn
    // run gameLogic to see if game is over and there is a winner
    gameLogic('human');

    //switch to computer player
    setTurn(!turn);
  }

  useEffect(() => {
    //now it's computer's turn to play if there is no winner
    if (!isWinner && letters !== '') {
      const newLetter = computerPlays();
      // run game logic again to see if there is a winner
      gameLogic("computer", letters + newLetter);
    }
  }, [turn])

  const handleOnChange = (event) => {
    const currentInput = event.target.value;

    //validating current input
    const lastChar = currentInput[currentInput.length - 1];

    // set state if a valid character was submitted
    if ((/[a-z]/i).test(lastChar)) setLetters(currentInput);
  };

  return (
    <div className="App">
      <label htmlFor="search">Enter Letter:{` `}</label>
      <input
        type="text"
        name="search"
        value={letters}
        id="search"
        onChange={handleOnChange}
      />
      <button onClick={finishTurn}>Finish Turn</button>
      {win && <div>{win}</div>}
      <ul>
        {matches && matches.map(word => <li key={word}>{word}</li>)}
      </ul>
    </div>
  );
}

export default App;
