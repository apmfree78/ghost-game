import { useEffect, useRef, useState } from "react";
import {
  chooseRandomWord,
  getLongestWords,
  getValidLetters,
  getWinningLetters,
  mineWinningLetters
} from './computer';
import { playSound } from './library/sounds'
import "./App.css";
import { dictionary } from "./ghost";
import trie from 'trie-prefix-tree';

function App() {
  const [win, setWin] = useState(''); // message for who has won 
  const [isWinner, setIsWinner] = useState(false);
  const [turn, setTurn] = useState(true);  // toggle turn between human and computer
  const [matches, setMatches] = useState([]); // words that match input letters
  const [letters, setLetters] = useState(""); // string of input letters

  //****************************************************************
  //*********** PREFIX TREE OF DICTIONARY *********************
  let prefixTree = useRef();
  // load words into trie when application first loads
  useEffect(() => {
    prefixTree.current = trie(dictionary);
  }, []);
  //****************************************************************
  //****************************************************************



  // computer plays it's turn - see also useEffect [turn]
  function computerPlays() {

    // USING RECURSIVE ALGO TO SIMULATE GAME PLAY
    // AND FIND OPTIMAL LETTERS FOR COMPUTERS TO PLAY
    const winningLetters = mineWinningLetters(letters, prefixTree.current);
    console.log(`winning letters: ${winningLetters}`);

    // checking to see if recursive simulation found winning letters
    // if so , randomly picking one
    if (winningLetters) { // WIN SCENARIO

      // choose a random letter from winningLetters
      // generated above
      const newLetter = chooseRandomWord(winningLetters);
      console.log('getting letter');
      console.log(newLetter);
      //setting state with new letter
      setLetters(letters + newLetter);
      return newLetter;
    }
    else { // LOSE SCENARIO

      // getting array of possible words from current prefix
      const prefixWords = prefixTree.current.getPrefix(letters);

      // computer odds are low, so lets stretch out the game
      // by picking from words of the longest length 
      const LongestWords = getLongestWords(prefixWords);
      console.log('longest words');
      console.log(LongestWords);
      const LongWord = chooseRandomWord(LongestWords);
      if (LongWord.length <= letters.length) return '';

      const newLetter = LongWord[letters.length];
      // setting state 
      setLetters(letters + newLetter);
      return newLetter;
    }
  }

  // set winner of game
  function declareWinner(winner) {

    if (winner === 'pc') {
      setWin('Computer has WON!');
      setIsWinner(true);
      playSound('lost')
    } else {
      setWin('Human Player has WON!');
      setIsWinner(true);
      playSound('win')
    }
  }
  // this function determins state of game
  // based on letters imputed by user or computer
  // if there is a winner, winner is set
  // sample output of potential word matches
  // is show on screen too
  function gameLogic(currentPlayer = 'human', sequence = letters) {

    //check if valid prefix was submitted
    const isValidPrefix = prefixTree.current.isPrefix(sequence);

    if (isValidPrefix) {
      //update matches
      console.log(`${sequence} is valid`)
      const _words = prefixTree.current.getPrefix(sequence);
      setMatches([..._words]);

      // if we have more than 3 sequence than check trie for a match
      if (sequence.length > 3) {
        // check if prefix exists

        //check if sequence form word, if so it's a losing move! 

        if (prefixTree.current.hasWord(sequence)) {
          //WE GOT A WINNER!  
          console.log(`${sequence} is a word`)
          if (currentPlayer === 'human') declareWinner('pc');
          else declareWinner('human');
        }
      }
    }
    else {

      console.log('no prefixes found, game over');
      if (currentPlayer === 'human') declareWinner('pc');
      else declareWinner('human');
    }
  }

  // human just finished it turn, 
  // running gameLogic to see if there is a winner
  // and then switching to turn to computer
  const finishTurn = () => {
    // human has finished turn
    // run gameLogic to see if game is over and there is a winner
    gameLogic('human');

    //switch to computer player
    setTurn(!turn);
  }

  // this useEffect runs when 'turn' changes
  // then if there is no winner , computer plays
  useEffect(() => {
    //now it's computer's turn to play if there is no winner
    if (!isWinner && letters !== '') {
      const newLetter = computerPlays();
      // run game logic again to see if there is a winner
      gameLogic("computer", letters + newLetter);
    }
  }, [turn])


  // validate user input and set state
  const handleOnChange = (event) => {
    const currentInput = event.target.value;

    //validating current input
    const lastChar = currentInput[currentInput.length - 1];

    // set state if a valid character was submitted
    if ((/[a-z]/).test(lastChar)) setLetters(currentInput);
  };

  return (
    <div className="App">
      <h1>Ghost Game</h1>
      <label htmlFor="search" >Enter Letter:{` `}</label>
      <input
        type="text"
        disabled={isWinner}
        name="search"
        value={letters}
        id="search"
        onChange={handleOnChange}
      />
      <button className="button_title" disabled={isWinner} onClick={finishTurn}>Finish Turn</button>
      {win && <div>{win}</div>}
      <ul>
        {matches && matches.map((word, index) => {
          if (index < 20) return <li key={word}>{word}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
