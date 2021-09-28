import explosion from "./Assets/explosion.svg";
import splash from "./Assets/splash.svg";
import wave from "./Assets/wave.svg";
const Cell = ({
  item,
  row,
  col,
  setBoard,
  game,
  opponent,
  turn,
  handleChangeTurn,
  ships,
}) => {
  const fireOnOpponent = (e) => {
    if (opponent === turn) {
      try {
        const fireResponse = game.fire(
          e.target.dataset.row,
          e.target.dataset.col
        );

        const gameOver = game.isGameOver();
        if (fireResponse === "MISS" && !game.isGameOver()) {
          handleChangeTurn();
        } else if (gameOver) {
          handleChangeTurn("GAME OVER");
        }
        setBoard([...game.getBoard()]);
      } catch {}
    }
  };
  if (item === 0) {
    return (
      <div
        key={`${row - 1}, ${col - 1}}`}
        data-row={row - 1}
        data-col={col - 1}
        className="cell"
        onClick={(e) => {
          fireOnOpponent(e);
        }}
      ></div>
    );
  } else if (item === 1) {
    return (
      <div data-row={row - 1} data-col={col - 1} className="cell">
        <img src={splash} style={{ width: "50%" }} alt="" />
      </div>
    );
  } else if (Array.isArray(item)) {
    /*     const sunkStatus = game.getShips()[item[0]].isSunk() ? "SUNK" : "FLOATING"; */
    if (item[1] !== "X")
      return ships === "show" ? (
        <div className="cell">
          <div
          style = {{width: "100%", height: "100%", zIndex:"10"}}
            key={`${row}, ${col}}`}
            data-row={row - 1}
            data-col={col - 1}
            className={`ship ${item[0][0]}${item[0][1]} ${item[3]} ${
              item[1] === 0 ? "start" : ""
            } ${item[0][1] - 1 === item[1] ? "end" : ""} }`}
            onClick={(e) => {
              fireOnOpponent(e);
            
            }}
          ></div>
        </div>
      ) : (
        <div
          key={`${row}, ${col}}`}
          data-row={row - 1}
          data-col={col - 1}
          className={`cell `}
          onClick={(e) => {
            fireOnOpponent(e);
          }}
        ></div>
      );
    else
      return item[2] ? (
        <div

          data-row={row - 1}
          data-col={col - 1}
          className={`cell sunk`}
        >
          <img src={explosion} style={{ width: "80%" }} alt="" />
        </div>
      ) : (
        <div
          style={{ backgroundColor: "pink" }}
          data-row={row - 1}
          data-col={col - 1}
          className={`cell `}
        >
          <img src={explosion} style={{ width: "80%" }} alt="" />
        </div>
      );
  }
};

export default Cell;
