import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/MusicPlayer";
import MusicPlayerContextProvider from "../contexts/MusicPlayerContext";

const HomeLayout = () => {
  return (
    <div className="h-[calc(100vh-4.7rem)] grid grid-cols-[auto,1fr] gap-4">
      <>
        <MusicPlayerContextProvider>
          <Sidebar />

          <div className="mt-6">
            <Outlet />
          </div>

          <MusicPlayer />
        </MusicPlayerContextProvider>
      </>
    </div>
  );
};

export default HomeLayout;
