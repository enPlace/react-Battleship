import "./App.css";
import { useState, useEffect } from "react";
import Cell from "./Cell";

import gameboard from "./Game-Modules/gameboard";
import computerPlayer from "./Game-Modules/computerPlayer";

const p1Game = gameboard();
p1Game.placeShipsRandomly();

const p2Game = gameboard();
p2Game.placeShipsRandomly();

function App() {
  const [p1Board, setP1Board] = useState(p1Game.getBoard());
  const [p2Board, setP2Board] = useState(p2Game.getBoard());
  const [turn, setTurn] = useState("p1");

  const handleChangeTurn = (value) => {
    if (value) setTurn(value);
    else return turn === "p1" ? setTurn("p2") : setTurn("p1");
  };

  const handleBot = () => {
    if (!p1Game.isGameOver()) {
      if (turn === "p2" || turn === "p1") {
        const botMove = computerPlayer(p1Game);

        if (botMove["res"] === "MISS") {
          handleChangeTurn();
        } else if (Array.isArray(botMove["res"]) || botMove["res"] === "SUNK") {
          setP1Board([...botMove.board]);
        }
      }
    }
  };
  useEffect(() => {
   /*  setTimeout(handleBot, 100); */
  });

  let row = 0;
  return (
    <div className="App">
      <div className="board" style={{ marginRight: "20px" }}>
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
                setBoard={setP1Board}
                opponent="p2"
                turn={turn}
                handleChangeTurn={handleChangeTurn}
              />
            );
          });
        })}
        <h1>Player 1</h1>
      </div>

      <div className="board">
        {p2Board.map((array) => {
          let col = 0;
          row++;
          return array.map((item) => {
            col++;
            return (
              <Cell
                key={`${row - 10}, ${col - 1}}`}
                item={item}
                row={row - 10}
                col={col}
                game={p2Game}
                setBoard={setP2Board}
                opponent="p1"
                turn={turn}
                handleChangeTurn={handleChangeTurn}
              />
            );
          });
        })}
        <h1>Player 2</h1>
      </div>
    </div>
  );
}

export default App;
