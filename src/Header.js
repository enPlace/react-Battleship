import battleShipIcon from "./Assets/battleship.svg"
const Header = ({turn, newGame}) => {
  let gameState;
  const playAgain = turn !=="GAME OVER" ? null : ( <button onClick = {()=>newGame()}>Play Again</button> )
  if (turn === "p1") gameState = "Your turn";
  else if (turn=== "p2") gameState = "Computer's turn";
  else if (turn === "GAME OVER") gameState = "GAME OVER";
    
  return (
    <header>
        <div><img src={battleShipIcon} alt="" style = {{width: "50px"}} /></div>
      <h1>BATTLESHIP</h1>
      <div>
        <p>{gameState}</p>
        {playAgain}
      </div>
    </header>
  );
};

export default Header;
