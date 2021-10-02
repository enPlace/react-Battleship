import PlacementBoard from "./PlacementBoard";
import { useState } from "react";
import PlaceShipsKey from "./PlaceShipsKey";

const PlaceShips = ({
  p1Game,
  p1Board,
  setP1Board,
  togglePlaceShips,
  newGame,
  resetP1Game,
}) => {
  const [orientation, setOrientation] = useState("horizontal");

  let shipList = p1Game.getShips();
  let keys = Object.keys(shipList);
  const [currentShip, setCurrentShip] = useState(shipList[keys.shift()]);
  const [shipKeys, setShipKeys] = useState([...keys]);
  const [currentShipLength, setCurrentShipLength] = useState(2);
  console.log("keys", keys);
  console.log("shipkeys", shipKeys);
  console.log("currentShip", currentShip);
  console.log("currentShipLength", currentShipLength);
  const handleReset = () => {
    resetP1Game();
    shipList = p1Game.getShips();
    keys = Object.keys(shipList);
    setCurrentShip(shipList[keys.shift()]);
    setShipKeys([...keys]);
    setCurrentShipLength(2);
  };
  const handleNextShip = () => {
    if (currentShip.name === "s5" || (currentShip.name && !shipKeys[0])) {
      setShipKeys([]);
      setCurrentShip(null);
      setCurrentShipLength(1);
    }
    if (!shipKeys[0]) {
      return;
    }
    const newKeys = [...shipKeys];
    const newCurrentShip = shipList[newKeys.shift()];
    setShipKeys(newKeys);
    setCurrentShip(newCurrentShip);
    setCurrentShipLength(newCurrentShip.shipArray.length);
  };
  const removeShipFromBoard = (shipName) => {
    if (currentShip !== null) {
      const newKeys = [...shipKeys];
      newKeys.unshift(currentShip.name);
      setShipKeys(newKeys);
    }

    setCurrentShip(shipList[shipName]);
    setCurrentShipLength(shipList[shipName].shipArray.length);
    p1Game.removeShip(shipName);
    setP1Board(p1Game.getBoard());
    //remove ship from gameboard
    //unshift ship name to shipKeys
    //make that ship the current ship
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="placeBoard"
        style={{ display: "flex", marginLeft: "100px" }}
      >
        <PlacementBoard
          game={p1Game}
          board={p1Board}
          orientation={orientation}
          setBoard={setP1Board}
          currentShip={currentShip}
          currentShipLength={currentShipLength}
          setCurrentShipLength={setCurrentShipLength}
          handleNextShip={handleNextShip}
          removeShipFromBoard={removeShipFromBoard}
        ></PlacementBoard>
        <div
          className="shipMenu"
          style={{
            marginLeft: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "250px",
          }}
        >
          <div className="topSection" style= {{display:"flex", flexDirection: "column", alignItems:"center", width: "100%"}}>
            <button 
            style = {{width: "100%"}}
              onClick={() => {
                orientation === "horizontal"
                  ? setOrientation("vertical")
                  : setOrientation("horizontal");
              }}
            >
              Orientation: {orientation}
            </button>
            <div style={{ color: "white", fontSize: "14px", width: "220px" }}>
              <p>Click on a square to place a ship</p>
              <p>
                To move a ship after placing it on the board, click on the ship again
              </p>
            </div>
          </div>

          <PlaceShipsKey
            game={p1Game}
            justify="left"
            currentShip={currentShip}
          ></PlaceShipsKey>
          <div
            className="bottomButtons"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <button
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </button>
            <button
              onClick={() => {
                if (currentShipLength !== 1) {
                  newGame();
                }
                togglePlaceShips();
              }}
            >
              {currentShipLength === 1 ? "Done" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceShips;
