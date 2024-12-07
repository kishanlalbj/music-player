import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LogOutIcon } from "lucide-react";

const Header = () => {
  const { auth } = useAuth();
  return (
    <div className="h-14 border-b border-b-zinc-800 bg-[#1c1c1c]">
      <div className="container flex items-center justify-between h-full">
        <Link to="/home" className="text-lg">
          Idha
          <span className="text-primary font-semibold">Kelu</span>
        </Link>

        {auth?.accessToken && (
          <nav>
            <ul className="inline-flex items-center gap-6">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <p>{auth?.name}</p>
              </li>
              <li>
                <LogOutIcon className="cursor-pointer" />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
