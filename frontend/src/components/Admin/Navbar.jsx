import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useAuthenticated, logout } from "../../db";

function Navbar() {
  const user = useAuthenticated();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
      if (location.pathname === "/signup" || location.pathname === "/login") {
        history.push("/");
      }
    } else {
      if (
        location.pathname === "/create" ||
        location.pathname === "/forms" ||
        location.pathname.slice(0, 12) === "/submissions"
      ) {
        history.push("/login");
      }
    }
  }, [user, location, history]);

  return (
    <nav className="bg-gray-800 py-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-white font-semibold text-lg">
          Home
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white mr-4 hover:text-gray-300"
              >
                {user.name}
              </Link>
              <span
                onClick={logout}
                className="text-white mx-4 hover:text-red-500"
              >
                Logout
              </span>
            </>
          ) : (
            <>
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
}

export default Navbar;
