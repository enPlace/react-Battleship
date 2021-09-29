import radar from "../Assets/radar4.svg";
import Cell from "./Cell";

const EnemyBoard = ({board, game, setBoard, turn, handleChangeTurn }) => {
    let row = 0
    return (  <div
        className="board enemyBoard"
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
        {board.map((array) => {
          let col = 0;
          row++;
          return array.map((item) => {
            col++;
            return (
              <Cell
                key={`${row - 1}, ${col - 1}}`}
                item={item}
                row={row }
                col={col}
                game={game}
                setBoard={setBoard}
                opponent="p1"
                turn={turn}
                handleChangeTurn={handleChangeTurn}
                ships="hide"
              />
            );
          });
        })}
      </div> );
}
 
export default EnemyBoard;