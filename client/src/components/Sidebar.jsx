import { HeartIcon, ListMusic, Mic, Music4 } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    {
      id: 1,
      name: "Songs",
      Icon: Music4,
      link: ""
    },

    {
      id: 2,
      name: "Artist",
      Icon: Mic,
      link: "artists"
    },
    {
      id: 3,
      name: "Playlist",
      Icon: ListMusic,
      link: "playlists"
    },
    {
      id: 4,
      name: "Favourites",
      Icon: HeartIcon,
      link: "favourites"
    }
  ];

  return (
    <div className="h-full  border-r-zinc-800 px-2 w-[200px]">
      <div className="mt-6">
        <ul className="flex flex-col gap-6 w-full">
          {navItems.map((Item) => (
            <li key={Item.id} className="cursor-pointer">
              <div className="">
                <Link
                  to={`/home/${Item.link}`}
                  className="flex items-center gap-3"
                >
                  <Item.Icon className="text-primary"></Item.Icon>{" "}
                  <p>{Item.name}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
