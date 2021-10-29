# Building an algorithm that plays as your opponent

<p>I started off building this thinking about how I typically play the game of battleship, which generally has three phases: </p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. Randomly target coordinates on a board until I get a hit. Lets call this phase the “hunting” phase.</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. Once I get a hit, find out the orientation of the ship (that is, is the ship placed horizontally or vertically on the board) by firing around the target. This phase we can call “honing in” </p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. Once I get an orientation for the ship, I fire along that axis until I sink the ship. The “sinking” phase.</p>

  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pretty straightforward right? Well, there are some other things that we want to take into consideration when thinking through this algorithm if we want to make it an effective one-- that is, one that at least isn’t super easy to beat, and mimmicks how humans play the game. </p>

## Phase 1: Hunt for the ship
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The first thing that we might note about phase 1 as stated above is that when we play the game of battleship, we really don’t just fire randomly at a board.  This is because, for one,  humans can’t really think in random patterns anyway, but more importantly it is because it isn’t really an effective strategy for finding a ship. I noticed this after building my first version of this algorithm, which carried out the hunting phase by firing at random coordinates at the board, and in playing against it I beat it easily every time. </p>

  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instead of firing randomly at the board, I was distributing my shots more evenly across the board. And this makes sense because we wouldn’t want to, for instance, to fire into a single square coordinate surrounded by four occupied coordinates, because the smallest ship is two units in length. Or if we were  looking for a ship that was four squares long, we would want to focus on the areas of the board that have space for that ship rather than indiscriminately firing at any empty square. </p>
  
### The Checkerboard Strategy

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;One way to effectively carry out phase one is to use a “checkerboard” strategy-- firing at every other coordinate on the board. Since every ship has a minimum length of two, every ship will have at least one part on an odd or even square. On a 10x10 board, this means that we can fire at 50 squares to find our ship, rather than 100. </p>

(insert checkerboard image here) 

We can go further and make the checkerboard depend the length of the smallest ship. If both of the two-square ships are hit early and the smallest ship is three squares long, the strategy then becomes to fire at every second square. If the smallest ship left is four units long, then we fire at every third square. In other words, we want to fire at every nth square where n = the length of the smallest ship - 1.
(insert other checkerboard images)
We can generate a dynamic checkerboard based off of the length of the smallest ship with a nested loop to create a subset of checkerboard coordinates like so:  
```js
const setCheckerBoardCoords = (game) => {
  checkerBoardCoords = [[], [], [], [], [], [], [], [], [], []]; //2d array to house the new coords
  const shipLength = smallestRemainingShipLength(game); // the smallest ship left to sink

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
```
Each position in the new 2d array holds coordinates to target the main board, like this: 

(show example)

We can then randomly fire at these coordinates and greatly increase our likelihood of hitting a ship on any given attempt. There might be other strategies besides randomly firing at the coordinates (this site mentions probability functions), but in the scope of this project, the goal of this algorithm is to be reasonably effective and difficult to beat, not necesarily to be the *most* optimized algorithm possible, and randomly firing accomplishes this goal quite well. 

### Hunting for a ship: 
We simply generate two random coordinates in our checkerboard, and then fire at the main board with the coordinates that we get from the checkerboard. If we can't fire there (because it has already been attempted before and contains either a hit or a miss), we'll get an error and call the function again. Once we get a hit, we move to phase 2, which is the "hone in" phase-- trying to find the orientation of the ship. 


```js
const randomFireCheckerboard = (game) => {

  const checkerBoardCoords = setCheckerBoardCoords(game)
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * checkerBoardCoords[0].length+1);
  const target = checkerBoardCoords[row][col]

  try {
    const res = game.fire(target[0], target[1]);
    move = { res: res, board: game.getBoard() };
    if (Array.isArray(res)) {
      //it's a hit, add to hitArray and note surrounding squares. This moves the algorithm into phase two, 
      //which will be talked about below
      hitArray.push([target[0], target[1]]);
      generateSurroundingSquares(target[0], target[1]);
    }
  } catch {
    //if error is returned, try again
    randomFireCheckerboard(game);
  }
};

```


## Phases 2 and 3: Hone In and Sink

So what happens in phases 2 and 3? Ideally, these are the steps: 

  **Hone In**
  
  1. Generate the four surrounding squares of the hit target
  2. Randomly fire at those squares
  3. Once another square is hit, determine an orientation (vertical or horizontal)
  
  **Sink**
  
  4.   Fire along a given axis until we get a sunk ship
 

However, ships can be placed next to each other in various ways, which means that: 
  - getting a sunk ship does not always mean that this phase is finished. 
  - we may not even get a sunk ship if two ships are placed parallel to each other. 
  
Consider the following examples: 

1. <img src = "./bsScenario.jpeg" alt = "" width = "250">
2. <img src = "./bsScenario2.jpeg" alt = "" width = "250">

- In example 1, we had seemingly found an axis, but upon not sinking anything, a human would realize that there are three parallel ships to attack, and that the three hit points are actually  _each_ a starting point for the hone in phase. 
- In example 2, we _do_ get a sunk ship, but there is an extra hit square that hasn't been sunk. Again, a human would realize that this is another ship to hone in on.

## Using stacks to hone in on all ships


