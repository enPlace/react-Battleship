const GameState = ({ turn, newGame, winner }) => {
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
    <div className = "gameState" style = {{margin: "20px", width: "100px"}}  >
      <p style = {{fontSize: "12px"}}>{gameState}</p>
      
      {playAgain}
    </div>
  );
};

export default GameState;
