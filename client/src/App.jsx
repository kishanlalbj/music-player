import "./App.css";
import { ConfigProvider } from "antd";
import theme from "./utils/theme";

import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <RouterProvider router={router}>
      <ConfigProvider theme={theme}></ConfigProvider>
    </RouterProvider>
  );
}

export default App;
