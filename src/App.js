import "./App.css";
import { useState } from "react";
import Cell from "./Cell";
import gameboard from "./Game-Modules/gameboard";

const p1Game = gameboard();
p1Game.placeShipsRandomly();
function App() {
  const [p1Board, setP1Board] = useState(p1Game.getBoard());
  let row = 0;
  return (
    <div className="App">
      <div className="board">
        {p1Board.map((array) => {
          let col = 0;
          row++;
          return array.map((item) => {
            col++;
            return (
              <Cell
                key={`${row - 1}, ${col - 1}}`}
                item={item}
                row={row}
                col={col}
                game={p1Game}
                setBoard = {setP1Board}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default App;
