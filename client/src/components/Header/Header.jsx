import { Typography } from "antd";
import logo from "../../assets/music-note.svg";
import wave from "../../assets/wave.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, setIsLoggedIn } from "../../app/slices/auth";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(getAuth);

  const handleLogout = () => {
    localStorage.removeItem("musico_token");

    dispatch(setIsLoggedIn(false)).unwrap();
  };

  return (
    <div
      className="header-wrapper"
      style={{
        background: `url(${wave})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
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
                  color: "#fff",
                }}
              >
                <img src={logo} width={"24px"} />
                Thenisai Thendral
              </Typography.Title>
            </Link>
          </div>

          {isLoggedIn && (
            <ul className="nav-list">
              <li>
                <Link to="/test" className="nav-link">
                  <Typography.Text style={{ color: "#fff" }}>
                    Songs
                  </Typography.Text>
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout} className="logo-link">
                  <Typography.Text style={{ color: "#fff" }}>
                    <LogoutOutlined style={{ fontSize: "18px" }} />
                  </Typography.Text>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
