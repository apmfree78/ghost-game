# Ghost Word Game - Player versus Computer

## Simple Description

In the game of Ghost, two players take turns building up an English word from left to right. Each player adds one letter per turn. The goal is to not complete the spelling of a word: if you add a letter that completes a word (of 4+ letters), or if you add a letter that produces a string that cannot be extended into a word, you lose. 

## How to Play

- Enter 1 letter in the input, and hit `Finish Turn` button
- The AI will now takes its turn and enter a 2nd letter
- It's now your turn again, enter a 3rd letter, be sure to make sure the 3rd letter you enter is a prefix of an actual word, if not, you lose! Click `Finish Turn` again.

After the computer enters a 4th letter you need to be super careful.  Not only does the next (5th) letter you enter have to be a prefix of a word,
but it cannot form an actual full word.  Otherwise you lose!  **Whoever, enters a letter that result in a string that cannot extend into a word (invalid prefix) OR a letter that forms a full word (4 characters or greater), first losses the game.**

To play again click the `Restart Game` button.

## Create with React and Javascript - plus some rad retro graphics and sounds too!

## Some notes on game creation

- Converted dictionary file to .js file containing array. Used vim macro to convert list to array. Took 5 mins for macro to process all 170k lines!
- Since focus was on the algorithm, kept design of game and program design very simple. There's 1 file that holds the dictionary. And rest of code is in 2 seperate files. See line 38 of computer.js for main algo for computer optimally picking next letter.
- If had to further refactor would make user input seperate from screen where current prefix string is shown and restrict user input to 1 character at a time - right now user can insert multiple characters, or remove characters.  This was helpful for debugging and testing.  That being said there is validation for user input - only [a-z] can be inputed.

## The algorithm

### Prefix Tree
- When the game is started, it immediately creates a prefix tree using the dictionary file (which i converted to a massive array)
- *the prefix tree allows us to efficient check if current input (by user + computer) is a valid prefix OR if it's a valid word (loss condition)*

### Game Play Simulaton using Recursion

This is the heart of the application. 

The game takes the following steps to determine optimal move for computer.

It uses a recursion function that simulates the 'pc' and the 'human' alterating turns and playing EVERY valid next letter. So we can track ALL possible win/lose scenarios and place them in a hashmap.

1. It takes the current prefix and first determines all valid next letters (that when added to current prefix will result in another valid prefix).
2. It then checks for each new prefix if it generates a valid word, if so the current player 'losses', if the current player is the computer, then we add the letter that generated the prefix to the hashmap and increment losses++. However if computer wins, it increments wins++.
3. This process is done recursively,keeping track of the cumlative wins and losses generated by first set of valid letters added to original prefix. 

The win/loss data structure looks like this:

```
a: {wins: 121, losses: 161}
e: {wins: 296, losses: 426}
i: {wins: 147, losses: 215}
o: {wins: 76, losses: 90}
r: {wins: 2, losses: 1}
u: {wins: 39, losses: 12}
y: {wins: 1, losses: 0}

```

This is generated for a given prefix!

Each letter is a valid next letter that can be added on current prefix.  If the game is played out in all possible scenarios picking a valid letter at each subsequent step, we can see for the letter 'y' it would result in a guaranteed win for the computer!

If there is are letters that have positive wins and no losses the computer picks one of them (randomly), if there's only 1, computer picks it.
If there are no losses: 0 , then computer randomly picks a letter where wins > losses. 

However if there are no wins > losses, then computer just picks the longest word containing the prefix and picks the letter from there.

