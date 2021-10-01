import gameboard from "./gameboard";

const newGame = gameboard();

test("empty gameboard creation", () => {
  expect(newGame.getBoard()).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  expect(newGame.getBoard()[0][0]).toBeFalsy();
});

test("place a ship horizontally", () => {
  newGame.placeShipHorizontally(0, 0, "s2a");
  newGame.placeShipHorizontally(4, 6, "s4");

  expect(newGame.getBoard()).toStrictEqual([
    [["s2a", 0, false, "horizontal"], ["s2a", 1, false, "horizontal"], 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0,["s4", 0, false, "horizontal"], ["s4", 1, false, "horizontal"], ["s4", 2, false, "horizontal"], ["s4", 3, false, "horizontal"]],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  expect(() => newGame.placeShipHorizontally(0, 0, "s2b")).toThrow(
    "ship cannot be placed here"
  );
  expect(() => newGame.placeShipHorizontally(9, 7, "s4")).toThrow(
    "ship cannot be placed here"
  );
});

test("place a ship vertically", () => {
  newGame.placeShipVertically(1, 0, "s2b");
  expect(newGame.getBoard()).toStrictEqual([
    [["s2a", 0, false, "horizontal"], ["s2a", 1, false, "horizontal"], 0, 0, 0, 0, 0, 0, 0, 0],
    [["s2b", 0, false, "vertical"], 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [["s2b", 1, false, "vertical"], 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, ["s4", 0, false, "horizontal"], ["s4", 1, false, "horizontal"], ["s4", 2, false, "horizontal"], ["s4", 3, false, "horizontal"]],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  expect(() => newGame.placeShipVertically(1, 0, "s3a")).toThrow(
    "ship cannot be placed here"
  );
  expect(() => newGame.placeShipVertically(1, 0, "s3b")).toThrow(
    "ship cannot be placed here"
  );
});

test("remove a ship", () => {
  newGame.removeShip("s2a");
  expect(newGame.getBoard()).toStrictEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [["s2b", 0, false, "vertical"], 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [["s2b", 1, false, "vertical"], 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, ["s4", 0, false, "horizontal"], ["s4", 1, false, "horizontal"], ["s4", 2, false, "horizontal"], ["s4", 3, false, "horizontal"]],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  expect(newGame.getShipPlacements()["s2a"]).toStrictEqual([])
});

test("fire at a position", () => {
  newGame.placeShipHorizontally(0, 0, "s2a")
  newGame.fire(3, 0); //miss

  expect(newGame.getBoard()[3][0]).toBe(1);
  expect(() => newGame.fire(3, 0)).toThrow("you already tried this spot");
  expect(() => newGame.fire(-1, 0)).toThrow();
  expect(() => newGame.fire(0, 10)).toThrow();
  expect(newGame.fire(0, 0)).toStrictEqual([false, true]); //hit
  expect(newGame.getBoard()[0][0][1]).toBe("X");

  expect(newGame.fire(0, 1)).toBe("SUNK"); // sink a ship
  expect(newGame.getBoard()[0][1][1]).toBe("X");
});
