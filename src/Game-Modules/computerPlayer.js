let mode = "random";
let hitArray = []; //tracks hit targets
let surroundingSquares = []; //tracks the surrounding squares for a hit target
let move; // move response to be set and returned
let orientation; // to set an orientation once the computer finds two parallel hit squares

const sunkShip = () => {
  mode = "random";
  hitArray = [];
  surroundingSquares = [];
  orientation = false;
};
const randomFire = (game) => {
  //fires at randomly generated position
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);

  try {
    const res = game.fire(row, col);
    move = { res: res, board: game.getBoard() };
    if (Array.isArray(res)) {
      hitArray.push([row, col]);
      surroundingSquares.push(
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1]
      );
      mode = "hone";
    }
  } catch {
    randomFire(game);
  }
};

const honeIn = (game) => {
  //searches for the ship in the surrounding squares of the previous hit
  const randomIndex = Math.floor(Math.random() * surroundingSquares.length);
  const target = surroundingSquares[randomIndex];

  try {
    const res = game.fire(target[0], target[1]);
    move = { res: res, board: game.getBoard() };
    if (res === "SUNK") {
      //ship is only two squares long and we aren't looking for anything else
      sunkShip();
    }
    if (Array.isArray(res)) {
      //hit a ship, now push the coordinates to the hitArray
      //and  compare to see what the orientation of the ship is

      mode = "sink";

      if (hitArray[0][0] === target[0]) {
        //row is the same
        orientation = "horizontal";
        if (target[1] > hitArray[0][1]) {
          //make sure hitArray is in ascending column order
          hitArray.push(target);
        } else hitArray.unshift(target);
      } else if (hitArray[0][1] === target[1]) {
        //col is the same
        orientation = "vertical";
        if (target[0] > hitArray[0][0]) {
          //make sure hit array is in ascending row order
          hitArray.push(target);
        } else hitArray.unshift(target);
      }
    }
  } catch {
    //encountered error with firing at a surrounding square. Try again.
    honeIn(game);
  }
};

const sinkShip = (game) => {
  if (orientation === "horizontal") {
    const rowVal = hitArray[0][0];
    const lowTargetColumnValue = hitArray[0][1] - 1;
    const highTargetColumnValue = hitArray[hitArray.length - 1][1] + 1;
    try {
      //try to fire at left side of ship first
      const res = game.fire(rowVal, lowTargetColumnValue);
      move = { res: res, board: game.getBoard() };
      if (res === "SUNK") {
        sunkShip();
      }
      if (Array.isArray(res)) {
        //hit a target, unshift coords to hitArray
        hitArray.unshift([rowVal, lowTargetColumnValue]);
      }

      return;
    } catch {
      //can't fire to left side of ship, try right side
      try {
        const res = game.fire(rowVal, highTargetColumnValue);
        move = { res: res, board: game.getBoard() };
        if (res === "SUNK") {
          sunkShip();
        }
        if (Array.isArray(res)) {
          //hit a target, push coords to hitArray
          hitArray.push([rowVal, highTargetColumnValue]);
        }

        return;
      } catch {
        //can't fire to left or right, but haven't sunk a ship. Parallel ships
        console.log("parallel ships but for now randomize line 102");
        sunkShip();
        randomFire(game);
      }
    }
  } else if (orientation === "vertical") {
    const colValue = hitArray[0][1];
    const lowTargetRowValue = hitArray[0][0] - 1;
    const highTargetRowValue = hitArray[hitArray.length - 1][0] + 1;

    try {
      //try top side of ship first
      const res = game.fire(lowTargetRowValue, colValue);
      move = { res: res, board: game.getBoard() };
      if (res === "SUNK") {
        sunkShip();
        return;
      }
      if (Array.isArray(res)) {
        //hit a ship, unshift to array
        hitArray.unshift([lowTargetRowValue, colValue]);
      }
    } catch {
      try {
        //can't fire at top side, try bottom side
        const res = game.fire(highTargetRowValue, colValue);
        move = { res: res, board: game.getBoard() };
        if (res === "SUNK") {
          sunkShip();
        }
        if (Array.isArray(res)) {
          hitArray.push([highTargetRowValue, colValue]);
        }
      } catch {
        //can't fire to top or bottom, but haven't sunk a ship. Parallel ships
        console.log("parallel ships but for now randomize line 133");
        sunkShip();
        randomFire(game);
      }
    }
  }
};

const computerPlayer = (game) => {
  if (mode === "random") {
    randomFire(game);
    return move;
  }
  if (mode === "hone") {
    honeIn(game);
    return move;
  }
  if (mode === "sink") {
    sinkShip(game);
    return move;
  }
};

export default computerPlayer;
