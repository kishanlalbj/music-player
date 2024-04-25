import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Playlists from "../pages/Playlists";
import PlaylistDetail from "../pages/PlaylistDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Playlists />
      },
      {
        path: "test/",
        element: <Home />
      },
      {
        path: "playlists/:id",
        element: <PlaylistDetail />
      }
    ]
  }
]);

export default router;
