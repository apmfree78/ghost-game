const GameInput = ({
  isWinner,
  letters,
  handleOnChange,
  resetGame,
  finishTurn,
}) => {
  return (
    <>
      <label htmlFor='search'>Enter Letter:{` `}</label>
      <input
        type='text'
        disabled={isWinner}
        name='search'
        value={letters}
        id='search'
        onChange={handleOnChange}
      />
      <button className='button_title' disabled={isWinner} onClick={finishTurn}>
        Finish Turn
      </button>
      {isWinner && (
        <div>
          {win}
          <button className='button_title' onClick={resetGame}>
            Restart Game
          </button>
        </div>
      )}
    </>
  );
};

export default GameInput; 
