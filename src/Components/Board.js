import Cell from "./Cell";

const Board = ({game, board, setBoard, turn, handleChangeTurn}) => {
    let row = 0;
    return ( 
        <div className="board" style={{}}>
            {board.map((array) => {
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
                    game={game}
                    setBoard={setBoard}
                    opponent="p2"
                    turn={turn}
                    handleChangeTurn={handleChangeTurn}
                    ships="show"
                  />
                );
              });
            })}
          </div>
     );
}
 
export default Board;