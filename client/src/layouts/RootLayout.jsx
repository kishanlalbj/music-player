import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

const RootLayout = () => {
  return (
    <div>
      <Header />

      <Outlet />

      <MusicPlayer></MusicPlayer>
    </div>
  );
};

export default RootLayout;
