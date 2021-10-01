import PlacementBoard from "./PlacementBoard";
import { useState } from "react";
import PlaceShipsKey from "./PlaceShipsKey"


const PlaceShips = ({
  p1Game,
  p1Board,
  setP1Board,
  turn,
  handleChangeTurn,
  togglePlaceShips,
}) => {
  const [orientation, setOrientation] = useState("horizontal");
  
  const [shipList, setShipList] = useState(p1Game.getShips())
  const [shipKeys, setShipKeys] = useState(Object.keys(shipList))
  const [currentShip, setCurrentShip] = useState(shipList[shipKeys.shift()])
  const [currentShipLength, setCurrentShipLength] = useState(currentShip.shipArray.length)

  
  return (
    <div style={{ height: "100vh" }}>
      Place your ships here
      <div className="placeBoard" style={{ display: "flex", marginLeft: "100px" }}>
        <PlacementBoard
          game={p1Game}
          board={p1Board}
          orientation = {orientation}
          setBoard={setP1Board}
          currentShipLength = {currentShipLength}
          
        ></PlacementBoard>
        <div
          className="shipMenu"
          style={{
           marginLeft: "10px", 
           display: "flex", 
           flexDirection:"column",
           justifyContent: "space-around"
          
          }}
        >
          <button
            onClick={() => {
              orientation === "horizontal"
                ? setOrientation("vertical")
                : setOrientation("horizontal");
            }}
          >
            Orientation: {orientation}
          </button>
          <PlaceShipsKey game={p1Game} justify="left"></PlaceShipsKey>
          <button onClick={() => togglePlaceShips()}>Done</button>
        </div>
      </div>
      
    </div>
  );
};

export default PlaceShips;
