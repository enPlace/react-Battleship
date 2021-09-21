import "./App.css";
import gameboard from "./Game-Modules/gameboard";
import ship from "./Game-Modules/ship";
function App() {

  const game = gameboard();
  game.placeShipsRandomly()
  console.log(game.getShips())

  return (
    <div className="App">
      <div className="board">
        {game.getBoard().map((array) => {
          return array.map((item) => {
            return item === 1 ? (
              <div className="cell"></div>
            ) : (
              <div className="cell">{item[0]}</div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default App;
