import "./App.css";
import { ConfigProvider } from "antd";
import theme from "./utils/theme";

import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUserAsync } from "./app/slices/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        ...theme,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;
