import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import usePrivateApi from "../hooks/usePrivateApi";
import { Loader } from "lucide-react";

const Layout = () => {
  const privateApi = usePrivateApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get("/api/auth/me");

        if (res.status === 200 || res.status === 304) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [navigate, privateApi]);

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
