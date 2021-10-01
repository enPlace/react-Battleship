import PlacementBoard from "./PlacementBoard";
import ShipKey from "./ShipKey";
import { useState } from "react";
import gameboard from "../Game-Modules/gameboard";


const PlaceShips = ({
  p1Game,
  p1Board,
  setP1Board,
  turn,
  handleChangeTurn,
  togglePlaceShips,
}) => {
  const [orientation, setOrientation] = useState("horizontal");
  const [currentShipLength, setCurrentShipLength] = useState(4)

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
          <ShipKey game={p1Game} justify="left"></ShipKey>
          <button onClick={() => togglePlaceShips()}>Done</button>
        </div>
      </div>
      
    </div>
  );
};

export default PlaceShips;
