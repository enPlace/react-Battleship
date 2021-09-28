import "./App.css";
import { useState, useEffect } from "react";
import ShipKey from "./ShipKey";
import Cell from "./Cell";
import Header from "./Header";
import GameState from "./GameState";

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
  const [computerDemo, setComputerDemo] = useState(false);

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

  const handleBot = () => {
    if (!computerDemo) {
      if (turn === "p2") {
        const botMove = computerPlayer(p1Game);

        if (botMove["res"] === "MISS") {
          handleChangeTurn();
        } else if (Array.isArray(botMove["res"]) || botMove["res"] === "SUNK") {
          setP1Board([...botMove.board]);
          if (p1Game.isGameOver()) handleChangeTurn("GAME OVER");
        }
      }
    } else {
      const botMove = computerPlayer(p1Game);

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
    if (!p1Game.isGameOver() && !computerDemo) setTimeout(handleBot, 400);
    else if (!p1Game.isGameOver() && computerDemo) setTimeout(handleBot, 100);
  });

  let row = 0;
  return (
    <div className="App">
      <Header turn={turn} newGame={newGame}></Header>
      <div className="gameContainer" style={{ display: "flex" }}>
        <div className="playerGame">
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
          </div>
          <div className="playerInfo">
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
              {/*  <button
                id="shuffle"
                onClick={() => {
                  newGame();
                }}
              >
                Place Ships
              </button> */}
              <button
                id="shuffle"
                onClick={() => {
                  if(turn==="GAME OVER") newGame()
                  setComputerDemo(!computerDemo);
                }}
              >
                {!computerDemo ? "Run computer demo" : "Pause demo"}
              </button>
            </div>
          </div>
        </div>
        <div className="middleInfo">
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
        </div>
        <div className="playerGame">
          <div
            className="board"
            style={{
              position: "relative",
            }}
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
          </div>
          <div className="playerInfo">
            <h3>Opponent's grid</h3>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
