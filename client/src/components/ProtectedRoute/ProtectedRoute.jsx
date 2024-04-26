import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    console.log("called");
    return <Navigate to="/login"></Navigate>;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
