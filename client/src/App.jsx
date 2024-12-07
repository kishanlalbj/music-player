import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Layout from "./layouts/layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import PrivateRoute from "./utils/PrivateRoute";
import AuthContextProvider from "./contexts/AuthContext";
import Playlists from "./pages/Playlists";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: (
            <PrivateRoute>
              <HomeLayout />
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: "playlists",
              element: <Playlists />
            },
            {
              path: "*",
              element: <p>404 page not found</p>
            }
          ]
        },
        {
          path: "/",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]
    }
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  );
}

export default App;
