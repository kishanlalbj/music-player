import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  return auth?.accessToken ? children : <Navigate to={"/"} replace></Navigate>;
};

export default PrivateRoute;
