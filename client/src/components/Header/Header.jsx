import { Typography } from "antd";
import logo from "../../assets/music-note.svg";
import wave from "../../assets/wave.svg";
import "./Header.css";

const Header = () => {
  return (
    <div
      className="header-wrapper"
      style={{
        background: `url(${wave})`
      }}
    >
      <div className="container">
        <div className="header-container">
          <div>
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

          {/* <Button
            type="primary"
            icon={<UploadOutlined />}
            loading={loading}
            onClick={onToggleModal}
          ></Button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
