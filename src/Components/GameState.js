const GameState = ({ turn, newGame, winner, computerDemo }) => {
  let gameState;
  const playAgain =
    turn !== "GAME OVER" ? null : (
      <button onClick={() => newGame()}>Play Again</button>
    );
  if (turn === "p1") gameState = "Your turn";
  else if (turn === "p2") gameState = "Computer's turn";
  else if (turn === "GAME OVER"){
      gameState = winner==="p1" ? "You win!!" : "Computer wins!!"
  };


 
  return (
    <div className = "gameState" style = {{margin: "30px", width: "150px"}}  >
      {!computerDemo? <p style = {{fontSize: "17px"}}>{gameState}</p>: null}
      
      {playAgain}
    </div>
  );
};

export default GameState;
