

const isInShip = (row, col, orientation, root, currentShipLength) => {
  if (orientation === "horizontal") {
    if (
      row === root[0] &&
      col >= root[1] &&
      col <= root[1] + currentShipLength - 1
    ) {
      return true;
    }
  }
  if (orientation === "vertical") {
    if (
      col === root[1] &&
      row >= root[1] &&
      row <= root[1] + currentShipLength - 1
    ) {
      return true;
    }
  }
  return false;
};

test("isInShip", ()=>{
    expect(isInShip(0, 2, "horizontal", [0,0], 2)).toBeFalsy()
    expect(isInShip(0, 2, "horizontal", [0,0], 3)).toBeTruthy()
    expect(isInShip(0, 2, "horizontal", [0,0], 4)).toBeTruthy()
    expect(isInShip(1, 1, "horizontal", [0,0], 2)).toBeFalsy()


    expect(isInShip(1, 0, "vertical", [0,0], 2)).toBeTruthy()
    expect(isInShip(1, 1, "vertical", [0,0], 2)).toBeFalsy()
    expect(isInShip(8, 7, "vertical", [4,7], 5)).toBeTruthy()
    

})
