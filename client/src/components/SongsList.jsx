import { ListPlusIcon } from "lucide-react";

const SongsList = ({ songs, onSelect }) => {
  const handleSelectSong = (song) => {
    onSelect(song);
  };

  const handlePlaylistAdd = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <ul className="mt-5">
        {songs.map((song) => (
          <li
            key={song._id}
            onClick={() => handleSelectSong(song)}
            className="pb-2 my-4 flex items-center justify-between cursor-pointer"
          >
            <div className="inline-flex items-center gap-2">
              <div>
                <img
                  src={`data:image/png;base64,${song.cover}`}
                  width={48}
                  alt={song.name}
                  className="rounded-md"
                ></img>
              </div>

              <div>
                <p>{song.name}</p>
                <p className="text-zinc-500 text-sm">{song.album}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-3">
              <p className="text-sm">{song.duration}</p>

              <div className="relative">
                <ListPlusIcon
                  className="cursor-pointer"
                  onClick={handlePlaylistAdd}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
