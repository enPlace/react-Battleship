import ship from "./ship";

const gameboard = () => {
  let board = [];
  const getBoard = () => board;

  for (let i = 0; i < 10; i++) {
    //nested loop fills board with a 10x10 2d array of 0's to represent empty squares
    let boardArray = [];
    for (let j = 0; j < 10; j++) {
      boardArray.push(0);
    }
    board.push(boardArray);
  }

  const ships = {
    //ship objects to be placed on board
    s2a: ship(2, "s2a"),
    s2b: ship(2, "s2b"),
    s3a: ship(3, "s3a"),
    s3b: ship(3, "s3b"),
    s4: ship(4, "s4"),
    s5: ship(5, "s5"),
  };

  const placeShipHorizontally = (row, col, shipName) => {
    const ship = ships[shipName];
    if (col > 10 - ship.shipArray.length) {
      //check to see if ship can fit from starting coords
      throw new Error("ship cannot be placed here");
    }
    for (let i = 0; i < ship.shipArray.length; i++) {
      //check to see if ship will intersect with another ship
      if (board[row][col + i] !== 0) {
        throw new Error("ship cannot be placed here");
      }
    }
    for (let i = 0; i < ship.shipArray.length; i++) {
      //insert an array into the board with the ship name and index
      board[row][col + i] = [ship.name, i];
    }
  };

  const placeShipVertically = (row, col, shipName) => {
    const ship = ships[shipName];
    if (row > 10 - ship.shipArray.length) {
      //check to see if ship can fit from starting coords
      throw new Error("ship cannot be placed here");
    }
    for (let i = 0; i < ship.shipArray.length; i++) {
      //check to see if ship will intersect with another ship
      if (board[row + i][col] !== 0)
        throw new Error("ship cannot be placed here");
    }
    for (let i = 0; i < ship.shipArray.length; i++) {
      //insert an array into the board with the ship name and index
      board[row + i][col] = [ship.name, i];
    }
  };

  const placeShipRandomly = (shipName) => {
    const orientation = Math.floor(Math.random() * 2); //0= horizontal, 1 = vertical
    if (orientation === 0) {
      const rowPos = Math.floor(Math.random() * 10);
      const colPos = Math.floor(
        Math.random() * (10 - ships[shipName].shipArray.length)
      );
      try {
        placeShipHorizontally(rowPos, colPos, shipName);
      } catch {
        //recursively calls function again until it finds a place to put the ship
        placeShipRandomly(shipName);
      }
    } else if (orientation === 1) {
      const rowPos = Math.floor(
        Math.random() * (10 - ships[shipName].shipArray.length)
      );
      const colPos = Math.floor(Math.random() * 10);
      try {
        placeShipVertically(rowPos, colPos, shipName);
      } catch {
        placeShipRandomly(shipName);
      }
    }
  };
  const placeShipsRandomly = () => {
    const keys = Object.keys(ships);
    keys.forEach((shipName) => placeShipRandomly(shipName));
  };

  return {
    getBoard,
    placeShipHorizontally,
    placeShipVertically,
    placeShipsRandomly,
  };
};

export default gameboard;

/* 
next:
    -fire at a particular coordinate
    -if coord has 0, change 0 to X
    -if coord has X, throw error
    -if coord has a ship array, 
        pass the ship name and info to the function that hits a ship
     */
