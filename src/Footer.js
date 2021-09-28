import githubIcon from "./Assets/github.svg";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        height: "34px",
        backgroundColor: "black",
        bottom: "0",
        
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        
      }}
    >
      <a
        href="https://github.com/enPlace/react-redux-ComputerShop"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <h4 style={{ marginRight: "20px" }}>Created by Nicholas Place</h4>
        <div
          className="imgContainer"
          style={{
            width: "34px",
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        >
          <img
            src={githubIcon}
            alt=""
            style={{ width: "30px", backgroundSize: "40", borderRadius: "50%" }}
          />
        </div>
      </a>
    </footer>
  );
};

export default Footer;