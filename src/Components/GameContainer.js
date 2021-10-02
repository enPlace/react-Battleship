import Board from "./Board";
import EnemyBoard from "./EnemyBoard";
import GameState from "./GameState";
import ShipKey from "./ShipKey";

const GameContainer = ({
  p1Game,
  p1Board,
  setP1Board,
  p2Game,
  p2Board,
  setP2Board,
  turn,
  handleChangeTurn,
  newGame,
  computerDemo,
  setComputerDemo,
  mode,
  handleToggleMode,
  winner,
  setPlaceShips
}) => {
  return (
    <div className="gameContainer" style={{ display: "flex" }}>
      <div className="playerGame" style = {{margin:"0", width: "450px"}}>
        <Board
          game={p1Game}
          board={p1Board}
          setBoard={setP1Board}
          turn={turn}
          handleChangeTurn={handleChangeTurn}
        ></Board>

        <div className="playerInfo"style = {{overflow:"hidden"}}>
          <h3>Your grid</h3>
          <div className="buttons">
            <button
              id="shuffle"
              onClick={() => {
                newGame();
              }}
            >
              Shuffle / New Game
            </button>
            <button onClick={()=>setPlaceShips(true)}>Place Ships</button>
            <button
              id="shuffle"
              onClick={() => {
                if (turn === "GAME OVER") newGame();
                setComputerDemo(!computerDemo);
              }}
            >
              {!computerDemo ? "Run computer demo" : "Pause demo"}
            </button>
          </div>
        </div>
      </div>
      <div className="middleInfo" >
        <GameState
          turn={turn}
          winner={winner}
          newGame={newGame}
          computerDemo={computerDemo}
        />
        <div
          className="shipKeys"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ShipKey game={p1Game} justify="left"></ShipKey>
          <ShipKey game={p2Game} justify="right"></ShipKey>
          
        </div>
       {/*  <div className="buttons" style = {{display:"flex", flexDirection:"column", marginTop: "40px" }}>
        <button
            id="shuffle"
            onClick={() => {
              handleToggleMode();
            }}
          >
            Computer Mode: {mode}
          </button>
        <button
              id="shuffle"
              onClick={() => {
                if (turn === "GAME OVER") newGame();
                setComputerDemo(!computerDemo);
              }}
            >
              {!computerDemo ? "Run computer demo" : "Pause demo"}
            </button>
        </div> */}
        
          
      </div>
      <div className="playerGame">
        <EnemyBoard
          board={p2Board}
          game={p2Game}
          setBoard={setP2Board}
          turn={turn}
          handleChangeTurn={handleChangeTurn}
        ></EnemyBoard>

        <div className="playerInfo" style = {{display: "flex", flexDirection:"column", alignItems:"center"}}>
          <h3>Enemy Waters</h3>
          <button
            id="shuffle"
            onClick={() => {
              handleToggleMode();
            }}
          >
            Computer Mode: {mode}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
