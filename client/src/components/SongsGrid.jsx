import { ListPlusIcon, PlayCircleIcon } from "lucide-react";

const SongsGrid = ({ songs, onSelect }) => {
  const handleSelectSong = (song) => {
    onSelect(song);
  };

  const handleContextMenu = (e) => {
    console.log(e);
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
      {songs.map((song) => {
        return (
          <div
            key={song._id}
            className="rounded-lg"
            onContextMenu={handleContextMenu}
          >
            <div className="relative">
              <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)]">
                <PlayCircleIcon
                  role="button"
                  onClick={() => handleSelectSong(song)}
                  size={32}
                  className="cursor-pointer text-white absolute right-2 bottom-2"
                />
              </div>
              <img
                src={`data:image/png;base64,${song.cover}`}
                className="rounded-lg w-fit"
              ></img>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-semibold mt-3">{song.name}</h5>
                <p
                  title={song.artist}
                  className="text-sm text-zinc-200 w-40 overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {song.artist}
                </p>
              </div>

              <ListPlusIcon className="flex-grow" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongsGrid;
