import { useEffect, useState } from "react";
import PlaceShipCell from "../Cell";
const PlacementBoard = ({ board, setBoard, game, orientation, currentShipLength }) => {
  const [root, setRoot] = useState([0,0]);
  const [shipCanBePlaced, setShipCanBePlaced] = useState(true)


  // mouseOver changes the root 
  //for each cell, we can see if the cell is in range of the ship or not, 
  // and if it can be placed there or not


  const checkCoords = (row, col) => {
    //checks an individual coord to see if it is empty
    const board = game.getBoard();
    return board[row][col] === 0 
  };
  const checkCanBePlaced = (row, col, length = currentShipLength) => {
    let placement = true;
    for (let i = 0; i < length; i++) {
      let isEmpty;
      if (orientation === "horizontal") {
        isEmpty = checkCoords(row, col + i);

              
      } else if (orientation === "vertical") {
        if(row+i>9) isEmpty = false
        else isEmpty = checkCoords(row + i, col);
      }
      if (!isEmpty) placement = false;
    }
 
    return placement;
  };

  useEffect(()=>{
    
    setShipCanBePlaced(checkCanBePlaced(root[0], root[1]))

  },[root, shipCanBePlaced, orientation])
 

  const isInShip =(row, col)=>{
      if(orientation ==="horizontal"){
        if(row === root[0] && col>=root[1] && col<=root[1]+currentShipLength-1){
            return true
        }
      }if(orientation ==="vertical"){
          if(col===root[1] && row>=root[0] && row<=root[0]+currentShipLength-1){
              return true
          }
      }
      return false 
  }

  let row = 0;
  return (
    <div className="board" style={{}}>
      {board.map((array) => {
        let col = 0;
        row++;
        return array.map((item) => {
          col++;
          return (
            <PlaceShipCell
              key={`${row - 1}, ${col - 1}}`}
              item={item}
              row={row}
              col={col}
              root = {root}
              setRoot={setRoot} //moseOver => setRoot to coords
              highlightGreen = {shipCanBePlaced && isInShip(row-1, col-1) ?true : false}
              highlightRed = {!shipCanBePlaced && isInShip(row-1, col-1) ?true : false}
              mode = "place"
              game={game}
              setBoard={setBoard}
              opponent="p2"

              ships="show"
            />
          );
        });
      })}
    </div>
  );
};

export default PlacementBoard;
