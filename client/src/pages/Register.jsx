import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../api";
import { Loader } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
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
      const data = await registerApi(creds);

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <>
        <div className="card">
          <h4 className="text-2xl mb-2 font-bold text-center">Register</h4>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={creds.name}
                onChange={handleChange}
                required
              />
            </div>

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

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={creds.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-2">
              <button type="submit">
                {loading ? <Loader className="animate-spin" /> : "Register"}
              </button>
              {error && (
                <p className="text-sm text-red-500">Something went wrong</p>
              )}
              <span className="ml-4 text-sm">
                Alredy have an account ?
                <Link to="/" className="ml-1 underline">
                  Login here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default Register;
