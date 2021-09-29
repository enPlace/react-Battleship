import "./App.css";
import { useState, useEffect } from "react";
import GameContainer from "./Components/GameContainer";
import PlaceShips from "./Components/PlaceShips";
import Header from "./Header";

import gameboard from "./Game-Modules/gameboard";
import computerPlayer from "./Game-Modules/computerPlayer";

let p1Game = gameboard();
p1Game.placeShipsRandomly();

let p2Game = gameboard();
p2Game.placeShipsRandomly();

function App() {
  const [p1Board, setP1Board] = useState(p1Game.getBoard());
  const [p2Board, setP2Board] = useState(p2Game.getBoard());
  const [turn, setTurn] = useState("p1");
  const [winner, setWinner] = useState();
  const [computerDemo, setComputerDemo] = useState(false);
  const [mode, setMode] = useState("hard");
  const [placeShips, setPlaceships] = useState(false);

  const newGame = () => {
    p1Game = gameboard();
    p2Game = gameboard();
    p1Game.placeShipsRandomly();
    p2Game.placeShipsRandomly();
    setP1Board(p1Game.getBoard());
    setP2Board(p2Game.getBoard());
    setTurn("p1");
    setWinner("");
  };

  const handleChangeTurn = (value) => {
    if (value) {
      setWinner(turn);
      setTurn(value);
    } else return turn === "p1" ? setTurn("p2") : setTurn("p1");
  };
  const handleToggleMode = () => {
    mode === "easy" ? setMode("hard") : setMode("easy");
  };
  const handleBot = () => {
    if (!computerDemo) {
      if (turn === "p2") {
        const botMove = computerPlayer(p1Game, mode);

        if (botMove["res"] === "MISS") {
          handleChangeTurn();
        } else if (Array.isArray(botMove["res"]) || botMove["res"] === "SUNK") {
          setP1Board([...botMove.board]);
          if (p1Game.isGameOver()) handleChangeTurn("GAME OVER");
        }
      }
    } else {
      const botMove = computerPlayer(p1Game, mode);

      if (botMove["res"] === "MISS") {
        handleChangeTurn();
      } else if (Array.isArray(botMove["res"]) || botMove["res"] === "SUNK") {
        setP1Board([...botMove.board]);
        if (p1Game.isGameOver()) {
          setComputerDemo(!computerDemo);
          handleChangeTurn("GAME OVER");
        }
      }
    }
  };
  useEffect(() => {
    if (!p1Game.isGameOver() && !computerDemo) setTimeout(handleBot, 100);
    else if (!p1Game.isGameOver() && computerDemo) setTimeout(handleBot, 100);
  });

  return (
    <div className="App">
      <Header turn={turn} newGame={newGame}></Header>
      {placeShips ? (
        <PlaceShips />
      ) : (
        <GameContainer
          p1Game={p1Game}
          p1Board={p1Board}
          setP1Board={setP1Board}
          p2Game={p2Game}
          p2Board={p2Board}
          setP2Board={setP2Board}
          turn={turn}
          handleChangeTurn={handleChangeTurn}
          newGame={newGame}
          computerDemo={computerDemo}
          setComputerDemo={setComputerDemo}
          mode={mode}
          handleToggleMode={handleToggleMode}
          winner={winner}
        />
      )}

      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
