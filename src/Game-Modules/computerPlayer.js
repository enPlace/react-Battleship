let mode = "random";
let parallelMode; // mode for tracking steps in the parallel ship attack process

let hitArray = []; //tracks hit targets
let surroundingSquares = []; //tracks the surrounding squares for a hit target
let move; // move response to be set and returned
let orientation; // to set an orientation once the computer finds two parallel hit squares
let parallelShips = [];

const sunkShip = () => {
  //reverts back to randomly firing after a ship has been sunk
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
    if (res === "SUNK") {
      sunkShip();
    }
    if (Array.isArray(res)) {
      //it's a hit, add to hitArray and note surrounding squares

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
    //if error is returned, call function again
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
    honeIn(game); //need to fix infinite loop issue
  }
};
const PerpindicularOrConnectedOnSameAxis = (game) => {
  let row = hitArray[hitArray.length - 1][0];
  let col = hitArray[hitArray.length - 1][1];
  const board = game.getBoard();

  if (!board[row][col][2]) {
    //check last target first
    hitArray = [hitArray[hitArray.length - 1]]; //focus in on that target
    surroundingSquares = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    mode = "hone";
    return true;
  }

  for (let i = 0; i < hitArray.length; i++) {
    //
    row = hitArray[i][0];
    col = hitArray[i][1];
    if (!board[row][col][2]) {
      //means something in the hitArray hasn't been sunk
      hitArray = [hitArray[i]]; //focus in on that target
      surroundingSquares = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];
      mode = "hone";
      return true;
    }
  }
  return false;
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
        const test = PerpindicularOrConnectedOnSameAxis(game);
        if (!test) sunkShip();
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
          const test = PerpindicularOrConnectedOnSameAxis(game);
          if (!test) sunkShip();
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
        const test = PerpindicularOrConnectedOnSameAxis(game);
        if (!test) sunkShip();
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
          const test = PerpindicularOrConnectedOnSameAxis(game);
          if (!test) sunkShip();
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

const parallelAttack = () => {
  //for when parallel ships are found.
  //take the hitArray coords and split them into their own object.

  /*   Honestly, there should be another mode variable here. 

        mode = "parallel attack"
        parallel modes: 
          "split", 
          "hone", 
          "sink", --  attacks the ship on its axis  
           sunkShip() but sets parallel mode to "hone" instead of random unless there are no more parallel array objs



    
  For the parallel attack decision tree, the first step is to check whether or not the hitArray has been 
    split into its own object. 
    2a. If it has not, we split the hitArray up, assign the surrounding squares, make the first target the hit array. 
      3a then we use the honeIn() method to find the orientation
      4a then we use the sinkShip() method to attack the ship once we find the direction. 
    
    2b if it has already been split, we need to 
    
  */

  if (!parallelShips[0]) {
    hitArray.forEach((target) => {
      parallelShips.push(hitArray);
    });
    hitArray = [];
    hitArray = [parallelShips.shift()];
    surroundingSquares = [];
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
  if (mode === "parallel ships") {
    parallelAttack(game);
    return move;
  }
};

export default computerPlayer;
