import { Typography } from "antd";
import { useGetAllPlaylistsQuery } from "../app/services/playlistService";
import { useNavigate } from "react-router-dom";
import Playlist from "../components/Playlist/Playlist";

const Playlists = () => {
  const navigate = useNavigate();
  const { data, isError, error } = useGetAllPlaylistsQuery();

  const handlePlaylistClick = (id) => {
    navigate(`/playlists/${id}`);
  };

  return (
    <div className="container">
      <br />
      <Typography.Title level={4}>Latest playlists</Typography.Title>
      <div className="playlist-grid">
        {data?.result?.map((playlist) => (
          <Playlist
            key={playlist._id}
            {...playlist}
            onClick={handlePlaylistClick}
          ></Playlist>
        ))}
      </div>
      {isError && <Typography.Text>{error.data.message}</Typography.Text>}
    </div>
  );
};

export default Playlists;
