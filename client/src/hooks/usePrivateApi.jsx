import { api, privateApi } from "../utils";
import { useEffect } from "react";
import useAuth from "./useAuth";

const usePrivateApi = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = privateApi.interceptors.request.use(
      (config) => {
        console.log("using private api");

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const res = await api.get("/api/auth/refresh-token", {
            withCredentials: true
          });
          const newAccessToken = res.data.access_token;
          setAuth({ accessToken: newAccessToken });

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateApi(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestIntercept);
      privateApi.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return privateApi;
};

export default usePrivateApi;
