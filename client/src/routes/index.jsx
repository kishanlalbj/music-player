import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Playlists from "../pages/Playlists";
import PlaylistDetail from "../pages/PlaylistDetail";
import Login from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Playlists />
          </ProtectedRoute>
        ),
      },
      {
        path: "test/",
        element: <Home />,
      },
      {
        path: "playlists/:id",
        element: <PlaylistDetail />,
      },
    ],
  },
]);

export default router;
