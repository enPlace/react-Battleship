import PlacementBoard from "./PlacementBoard";
import { useState } from "react";
import PlaceShipsKey from "./PlaceShipsKey";

const PlaceShips = ({
  p1Game,
  p1Board,
  setP1Board,
  togglePlaceShips,
  newGame,
  resetP1Game
}) => {
  const [orientation, setOrientation] = useState("horizontal");

  let shipList = p1Game.getShips();
  let keys = Object.keys(shipList);
  const [currentShip, setCurrentShip] = useState(shipList[keys.shift()]);
  const [shipKeys, setShipKeys] = useState([...keys]);
  const [currentShipLength, setCurrentShipLength] = useState(2);

  const handleReset = () => {
   resetP1Game()
    shipList = p1Game.getShips()
    keys = Object.keys(shipList)
    setCurrentShip(shipList[keys.shift()])
    setShipKeys(([...keys]))
    setCurrentShipLength(2)
  };
  const handleNextShip = () => {
    if (currentShip.name === "s5") {
      setShipKeys(null);
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

  return (
    <div style={{ height: "100vh" }}>
      Place your ships here
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
        ></PlacementBoard>
        <div
          className="shipMenu"
          style={{
            marginLeft: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
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
