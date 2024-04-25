import { PlayCircleFilled } from "@ant-design/icons";
import "./Playlist.css";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/music-note.svg";

const Playlist = ({ _id, name }) => {
  const navigate = useNavigate();

  return (
    <div
      className="playlist-card"
      onClick={() => navigate(`/playlists/${_id}`)}
    >
      <div className="playlist-cover">
        <div className="playlist-cover-overlay">
          <PlayCircleFilled
            color="#fff"
            style={{ fontSize: "2rem", color: "#fff" }}
          />
        </div>
        <img src={logo} width={"100%"}></img>
      </div>

      <div className="card-content">
        <Typography.Text style={{ fontWeight: "700" }}>{name}</Typography.Text>
      </div>
    </div>
  );
};

export default Playlist;
