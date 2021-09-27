import { checkSurroundingSquares } from "./computerPlayer";
import testGameboard from "./testGameBoard";

const game = testGameboard();

test("gameboard", () => {
  expect(game.getBoard()).toStrictEqual([
    [["s2a", "X", "SUNK"], ["s2a", 1], 0, 0, 0, 0, 0, 0, 0, 0],
    [["s2b", "X", "SUNK"], 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [["s2b", "X", "SUNK"], 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, ["s4", 0], ["s4", 1], ["s4", 2], ["s4", 3]],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, ["s2", "X"], ["s2", "X"], 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});
/* test("squareVars", ()=>{
    const left = col > 0 ? board[row][col - 1] : false;
    const right = col < 9 ? board[row][col + 1] : false;
    const top = row > 0 ? board[row - 1][col] : false;
    const bottom = row < 9 ? board[row + 1][col] : false;
}) */
test("checkSurroundingSquares function", () => {
  
  expect(checkSurroundingSquares(1, 0, game).checkArray).toStrictEqual([false,1, ["s2a", "X", "SUNK"], ["s2b", "X", "SUNK"] ]);
  expect(checkSurroundingSquares(1, 0, game).sum).toStrictEqual(4);
  expect(checkSurroundingSquares(7, 7, game).sum).toStrictEqual(0)
  expect(checkSurroundingSquares(9, 9, game).sum).toStrictEqual(2)
  expect(checkSurroundingSquares(3,0, game).sum).toStrictEqual(2)
  expect(checkSurroundingSquares(7,2, game).sum).toStrictEqual(4)
});
/* 
test("checkarray", () =>{
    const checkArray =checkSurroundingSquares(1, 0, game)
    let count
    checkArray.forEach((square) => {
        const notOpen = square === 1;
        const notHittableShip = Array.isArray(square) && square[1] === "X";
        if (square === false || notOpen || notHittableShip) count++;
      });
}) */
