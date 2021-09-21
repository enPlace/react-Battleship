const Cell = ({
  item,
  row,
  col,
  setBoard,
  game,
  name,
  turn,
  handleChangeTurn,
}) => {
  if (item === 0) {
    return (
      <div
        key={`${row - 1}, ${col - 1}}`}
        data-row={row - 1}
        data-col={col - 1}
        className="cell"
        onClick={(e) => {
          if (name !== turn) {
            const fireResponse = game.fire(
              e.target.dataset.row,
              e.target.dataset.col
            );
            console.log(fireResponse);
            if (fireResponse === "MISS") handleChangeTurn();
            setBoard([...game.getBoard()]);
          }
        }}
      ></div>
    );
  } else if (item === 1) {
    return (
      <div data-row={row - 1} data-col={col - 1} className="cell">
        x
      </div>
    );
  } else if (item === "X") {
    return (
      <div
        style={{ backgroundColor: "red" }}
        data-row={row - 1}
        data-col={col - 1}
        className="cell"
      >
        X
      </div>
    );
  } else if (Array.isArray(item)) {
    return (
      <div
        key={`${row}, ${col}}`}
        data-row={row - 1}
        data-col={col - 1}
        className="cell"
        onClick={(e) => {
          if (name !== turn) {
            const fireResponse = game.fire(
              e.target.dataset.row,
              e.target.dataset.col
            );
            console.log(fireResponse);
            if (fireResponse === "MISS") handleChangeTurn();
            setBoard([...game.getBoard()]);
          }
        }}
      >
        {item[0]}
      </div>
    );
  }
};

export default Cell;
