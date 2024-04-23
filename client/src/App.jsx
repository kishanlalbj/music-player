import "./App.css";
import { ConfigProvider } from "antd";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import store from "./app/store";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <ConfigProvider theme={theme}>
          {/* <div
            style={{
              background: `url(${wave}) no-repeat`
            }}
          >
            

            <Home />
          </div> */}
        </ConfigProvider>
      </RouterProvider>
    </Provider>
  );
}

export default App;
