import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  auth: {},
  setAuth: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const handleSetAuth = (val) => {
    const decoded = jwtDecode(val?.accessToken);

    setAuth({ ...val, ...decoded });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
