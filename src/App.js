import "./App.css";
import { useState, useEffect } from "react";
import Cell from "./Cell";
import Header from "./Header";
import GameState from "./GameState";
import Footer from "./Footer";
import radar from "./Assets/radar4.svg";
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

  const newGame = () => {
    p1Game = gameboard();
    p2Game = gameboard();
    p1Game.placeShipsRandomly();
    p2Game.placeShipsRandomly();

    setP1Board(p1Game.getBoard());
    setP2Board(p2Game.getBoard());
    setTurn("p1");
    setWinner("")
  };

  const handleChangeTurn = (value) => {
    if (value) {
      setWinner(turn);
      setTurn(value);
    } else return turn === "p1" ? setTurn("p2") : setTurn("p1");
    
  };

  const handleBot = () => {
    if (!p1Game.isGameOver()) {
      if (turn === "p2"/*  || turn === "p1" */) {
        const botMove = computerPlayer(p1Game);

        if (botMove["res"] === "MISS") {
          handleChangeTurn();
        } else if (Array.isArray(botMove["res"]) || botMove["res"] === "SUNK") {
          setP1Board([...botMove.board]);
          if (p1Game.isGameOver()) handleChangeTurn("GAME OVER");
        }
      }
    }
  };
  useEffect(() => {
    setTimeout(handleBot, 400);
  });

  let row = 0;
  return (
    <div className="App">
      <Header turn={turn} newGame={newGame}></Header>
      <div className="gameContainer" style={{ display: "flex" }}>
        <div className="board" style={{}}>
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
                  ships="show"
                />
              );
            });
          })}
          <div className="playerInfo">
            <h3>Your grid</h3>
            <button
              onClick={() => {
                newGame();
              }}
            >
              Randomize
            </button>
          </div>
        </div>
        <GameState turn={turn} winner = {winner} newGame={newGame} />
        <div
          className="board"
          style={{
            position: "relative",
          }} /* style = {{backgroundImage : `url(${radar})`, backgroundSize: "contain" }} */
        >
          <img
            src={radar}
            alt=""
            style={{
              position: "absolute",
              width: "100%",
              zIndex: "-1",
              opacity: "0.7",
            }}
          />
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
                  ships="hide"
                />
              );
            });
          })}
          <h3>Opponent's grid</h3>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
