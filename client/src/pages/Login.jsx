import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api";
import { CircleAlertIcon, Loader } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [creds, setCreds] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await loginApi(creds);

      if (data.success) {
        console.log(data.token);

        setAuth({ accessToken: data.token });

        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <>
        <div className="card">
          <h4 className="text-xl font-bold">Login</h4>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={creds.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={creds.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-2">
              <button type="submit">
                {loading ? <Loader className="animate-spin" /> : "Login"}
              </button>

              <span className="ml-4 text-sm">
                Dont have an account ?
                <Link to="/register" className="ml-1 underline">
                  Register here
                </Link>
              </span>
            </div>
            {error && (
              <dic className="inline-flex items-center gap-2">
                <CircleAlertIcon className="text-red-500" size={16} />
                <p className="text-red-500 text-sm">{error}</p>
              </dic>
            )}
          </form>
        </div>
      </>
    </div>
  );
};

export default Login;
