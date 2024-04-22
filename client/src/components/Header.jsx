import { Typography } from "antd";
import logo from "../assets/music-note.svg";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="container">
        <div className="header-container">
          <Typography.Title
            level={4}
            style={{
              fontFamily: `"Dancing Script", cursive`,
              display: "flex",
              gap: "8px",
              color: "#fff"
            }}
          >
            <img src={logo} width={"24px"}></img>
            Thenisai Thendral
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default Header;
