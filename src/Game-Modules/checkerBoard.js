let checkerBoardCoords = [[], [], [], [], [], [], [], [], [], []];

const smallestRemainingShipLength = (game) => {
  const ships = game.getShips();
  const shipKeys = Object.keys(ships);
  let smallestLength = 10;

  shipKeys.forEach((key) => {
    const ship = ships[key];
    if (ship.isSunk()) {
    } else {
      const shipArray = ship.shipArray;
      if (shipArray.length < smallestLength) smallestLength = shipArray.length;
    }
  });

  return smallestLength;
};
export const setCheckerBoardCoords = (game) => {
  checkerBoardCoords = [[], [], [], [], [], [], [], [], [], []];
  const shipLength = smallestRemainingShipLength(game);

  for (let i = 0; i < 10; i++) {
    const remainder = i % shipLength;
    for (let j = 0; j < 10; j++) {
      if ((j - remainder) % shipLength === 0) {
        checkerBoardCoords[i].push([i, j]);
      }
    }
  }

  return checkerBoardCoords;
};

export { checkerBoardCoords };
