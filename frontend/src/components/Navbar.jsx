import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    navigate("/");
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-gray-800 py-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="/" className="text-white font-semibold text-lg">
          Home
        </a>
        <div className="flex items-center">
          {!!user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white mr-4 hover:text-gray-300"
              >
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-white mx-4 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Add Insights, Teammates, and Rates and Reviews buttons */}
              <a
                href="#Insights"
                className="text-white mx-4 hover:text-yellow-400"
              >
                Insights
              </a>
              <a
                href="#rates-and-reviews"
                className="text-white mx-4 hover:text-yellow-400"
              >
                Rates and Reviews
              </a>
              <a
                href="#Teammates"
                className="text-white mx-4 hover:text-yellow-400"
              >
                Teammates
              </a>
              <Link
                to="/register"
                className="text-white mx-4 hover:text-yellow-400"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white mx-4 hover:text-green-500"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
