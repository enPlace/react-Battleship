const Cell = ({
  item,
  row,
  col,
  setBoard,
  game,
  opponent,
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
          if (opponent === turn) {
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
  }else if (Array.isArray(item)) {
    const sunkStatus = game.getShips()[item[0]].isSunk() ? "SUNK" : "FLOATING"
    return item[1] !=="X" ? (
      <div
        key={`${row}, ${col}}`}
        data-row={row - 1}
        data-col={col - 1}
        className={`cell ${item[0]} ${sunkStatus}`}
        onClick={(e) => {
          if (opponent === turn) {
            const fireResponse = game.fire(
              e.target.dataset.row,
              e.target.dataset.col
            );
            console.log(fireResponse);
            if (fireResponse === "MISS") handleChangeTurn();
            if(game.isGameOver()) handleChangeTurn("GAME OVER")
            setBoard([...game.getBoard()]);
          }
        }}
      >
        {item[0]}
      </div>
    ): (
      <div
        style={{ backgroundColor: "red" }}
        data-row={row - 1}
        data-col={col - 1}
        className={`cell ${item[0]} ${sunkStatus}`}
      >
        X
      </div>
    );
  }
};

export default Cell;
