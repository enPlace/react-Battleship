import battleShipIcon from "./Assets/battleship.png"
const Header = ({turn, newGame}) => {
    

    
  return (
    <header>
        <div><img src={battleShipIcon} alt="" style = {{width: "100px", marginLeft: "-20px"}} /></div>
      <h1>Battleship</h1>
    
   
    </header>
  );
};

export default Header;
