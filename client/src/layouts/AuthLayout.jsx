import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#333",
        height: "100vh",
        color: "#fff",
      }}
    >
      <Header />

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
