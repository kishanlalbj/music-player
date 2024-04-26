import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import wave from "./assets/wave.svg";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Noto Sans", sans-serif;'
        }
      }}
    >
      <div
        style={{
          background: `url(${wave}) no-repeat`,
          backgroundSize: "cover",
          width: "100%"
        }}
      >
        <Header />

        <Home />
      </div>
    </ConfigProvider>
  );
}

export default App;
