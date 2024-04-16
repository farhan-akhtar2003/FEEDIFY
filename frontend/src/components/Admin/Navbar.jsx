import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  console.log("entered admin navbar");
  const location = useLocation();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  console.log("ADMIN NAVBAR", user);
  useEffect(() => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
      if (location.pathname === "/register" || location.pathname === "/login") {
        navigate("/"); // Use navigate instead of history.push
      }
    } else {
      if (
        location.pathname === "/create" ||
        location.pathname === "/forms" ||
        location.pathname.slice(0, 12) === "/submissions"
      ) {
        navigate("/login"); // Use navigate instead of history.push
      }
    }
  }, [user, location, navigate]); // Replace history with navigate
  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      window.localStorage.clear();
      localStorage.removeItem("token");
      toast.success("LOGGED OUT SUCCESSFULLY");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "An error occurred";
      toast.error(errorMessage);
      console.error("Logout error:", error);
      throw errorMessage; // Throw an error if the request fails
    }
  };

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
                {user.user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-white mx-4 hover:text-red-500"
              >
                LOG OUT
              </button>
            </>
          ) : (
            <>
              {/* Add Insights, Teammates, and Rates and Reviews buttons only on home page */}
              {location.pathname === "/" && (
                <div className="hidden md:flex space-x-4">
                  <a
                    href="#Insights"
                    className="text-white hover:text-yellow-400"
                  >
                    Insights
                  </a>
                  <a
                    href="#rates-and-reviews"
                    className="text-white hover:text-yellow-400"
                  >
                    Rates and Reviews
                  </a>
                  <a
                    href="#Teammates"
                    className="text-white hover:text-yellow-400"
                  >
                    Teammates
                  </a>
                </div>
              )}
              {user ? null : (
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
                    LOG IN
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
