import { Typography } from "antd";
import logo from "../../assets/music-note.svg";
import wave from "../../assets/wave.svg";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="header-wrapper"
      style={{
        background: `url(${wave})`,
        backgroundPosition: "center"
      }}
    >
      <div className="container">
        <div className="header-container">
          <div>
            <Link to="/" className="logo-link">
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
