const PlaceShipCell = ({
  item,
  row,
  col,
  setRoot,
  highlightRed,
  highlightGreen,
  handlePlaceShip,
  removeShipFromBoard
}) => {
  let highlightClass;
  if (highlightRed || highlightGreen) {
    highlightClass = highlightRed ? "highlightRed" : "highlightGreen";
  } else {
    highlightClass = "";
  }

  if (item === 0) {
    return (
      <div
        key={`${row - 1}, ${col - 1}}`}
        data-row={row - 1}
        data-col={col - 1}
        className={`cell ${highlightClass}`}
        onMouseEnter={() => {
          setRoot([row - 1, col - 1]);
        }}
        onClick={(e) => {
          handlePlaceShip();
        }}
      ></div>
    );
  } else if (Array.isArray(item)) {
    return (
      <div className={`cell ${highlightClass}`}>
        <div
          style={{ width: "100%", height: "100%", zIndex: "10" }}
          key={`${row}, ${col}}`}
          data-row={row - 1}
          data-col={col - 1}
          className={`ship ${item[0][0]}${item[0][1]} ${item[3]} ${
            item[1] === 0 ? "start" : ""
          } ${item[0][1] - 1 === item[1] ? "end" : ""} }`}
          onMouseEnter={() => {
            setRoot([row - 1, col - 1]);
          }}
          onClick={()=>{
            removeShipFromBoard(item[0])
          }}
        ></div>
      </div>
    );
  }
};

export default PlaceShipCell;
