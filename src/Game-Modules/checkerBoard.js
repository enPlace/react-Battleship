let checkerBoardCoords = [[], [], [], [], [], [], [], [], [], []];

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i % 2 === 0) {
      if (j % 2 === 1) {
        checkerBoardCoords[i].push([i, j]);
      }
    } else {
      if (j % 2 === 0) {
        checkerBoardCoords[i].push([i, j]);
      }
    }
  }
}



export { checkerBoardCoords };
