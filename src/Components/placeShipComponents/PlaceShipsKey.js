import { useEffect, useState } from "react";

const PlaceShipsKey = ({ game, justify }) => {
  const [ships, setShips] = useState(game.getShips());
  const shipKeys = Object.keys(ships);

  useEffect(() => {
    setShips({ ...game.getShips() });
  }, [game]);

  return (
    <div
      style={{
        width: "51px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: `${justify}`,
      }}
    >
      {shipKeys.map((key) => {
        const shipArray = ships[key].getShipArray();
        const isSunk = ships[key].isSunk();
        const color = !isSunk ? "rgb(116, 140, 248)" : "red";
        console.log(key)
        console.log(game.getShipPlacements()[key].length ===0)
        return game.getShipPlacements()[key].length !== 0 ? null : (
          <div
            key={key}
            style={{
              display: "flex",
              margin: "3px",
              border: "1px solid rgb(116, 140, 248)",
            }}
            className="shipkey"
          >
            {shipArray.map((index) => {
              return (
                <div
                  key={Math.floor(Math.random() * 100000000)}
                  style={{
                    width: "5px",
                    height: "5px",
                    margin: "1px 2px 1px 2px",
                    backgroundColor: `${color}`,
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PlaceShipsKey;
