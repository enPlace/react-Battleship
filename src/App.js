import "./App.css";
import { useState, useEffect } from "react";
import GameContainer from "./Components/GameContainer";
import PlaceShips from "./Components/placeShipComponents/PlaceShips";
import Header from "./Components/Header";

import gameboard from "./Game-Modules/gameboard";
import computerPlayer from "./Game-Modules/computerPlayer";

export let p1Game = gameboard();
p1Game.placeShipsRandomly();
p1Game.removeShip("s2a")
console.log(p1Game.getBoard())
console.log(p1Game.getShipPlacements())

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

  const resetP1Game = () =>{
    p1Game = gameboard();
    setP1Board(p1Game.getBoard());
  }
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
  const togglePlaceShips = () =>{
    if(!placeShips){
      setComputerDemo(false)
    resetP1Game()
    setPlaceships(true)

    p2Game = gameboard()
    p2Game.placeShipsRandomly()
    setP2Board(p2Game.getBoard())
  }else setPlaceships(false)
  }
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
      <Header></Header>
      {placeShips ? (
        <PlaceShips 
        p1Game={p1Game}
        p1Board={p1Board}
        setP1Board={setP1Board}
        turn = {turn}
        handleChangeTurn = {handleChangeTurn}
        togglePlaceShips={togglePlaceShips}
        newGame = {newGame}
        resetP1Game = {resetP1Game}
        />
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
          setPlaceShips = {togglePlaceShips}
        />
      )}

      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
