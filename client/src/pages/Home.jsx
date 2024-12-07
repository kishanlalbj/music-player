import { useContext, useEffect, useState } from "react";
import { Loader, PlayIcon } from "lucide-react";
import { MusicPlayerContext } from "../contexts/MusicPlayerContext";
import SongsList from "../components/SongsList";
import usePrivateApi from "../hooks/usePrivateApi";
import { privateApi } from "../utils";
import SongsGrid from "../components/SongsGrid";

const Home = () => {
  usePrivateApi();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setSongs: ctxSetSongs } = useContext(MusicPlayerContext);

  const fetchAllSongs = async () => {
    try {
      setLoading(true);
      const res = await privateApi.get(`/api/songs`);
      setSongs(res.data.results);
    } catch (error) {
      setError(error.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSongs();
  }, []);

  const handleSelectSong = (song) => {
    ctxSetSongs([song]);
  };

  const handlePlayAllSongs = () => {
    ctxSetSongs(songs);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Songs</h1>

        <button
          className="bg-primary text-white text-sm p-2 rounded-sm inline-flex items-center gap-1"
          onClick={handlePlayAllSongs}
        >
          <PlayIcon size={18} />
          Play All
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-1/2">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="mt-5">
          {/* <SongsList songs={songs} onSelect={handleSelectSong} /> */}
          <SongsGrid songs={songs} onSelect={handleSelectSong}></SongsGrid>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
