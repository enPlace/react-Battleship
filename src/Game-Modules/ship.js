const ship = (num, shipName) => {
  let shipArray = [];
  const name = shipName;

  for (let i = 0; i < num; i++) {
    shipArray.push(true);
  }

  const isSunk = () => {
    let count = 0;
    shipArray.forEach((position) => {
      if (!position) count++;
    });
    return count === shipArray.length ? true : false;
  };

  const hitPosition = (pos) => {
    shipArray[pos] = false;
  };
  return { shipArray, name, hitPosition, isSunk };
};

export default ship;
