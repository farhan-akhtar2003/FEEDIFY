import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../../public/assets/logo.png";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user));
      if (location.pathname === "/register" || location.pathname === "/login") {
        navigate("/");
      }
    } else {
      if (
        location.pathname === "/create" ||
        location.pathname === "/forms" ||
        location.pathname.slice(0, 12) === "/submissions"
      ) {
        navigate("/login");
      }
    }
  }, [user, location, navigate]);
// console.log(user.user.id);
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
    }
  };

  // Function to determine home page based on userType
  const getHomePage = () => {
    switch (user.user.userType) {
      case "Admin":
        return "/adminhome";
      case "Faculty":
        return "/facultyhome";
      case "Student":
        return "/studenthome";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-gray-800 py-4 fixed top-0 w-full z-50 mb-30rem">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className=" h-8 mr-2" />
        </Link>
        {/* <Link to="/query" className="flex items-center">
          hugging face
        </Link> */}
        <Link to="/forms" className="flex items-center">
          All Forms
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link
                to={getHomePage()} // Redirect to user-specific home page
                className="text-white mr-4 hover:text-gray-300"
              >
                {user.user.name}
              </Link>
              <Link
                onClick={handleLogout}
                className="text-white mx-4 hover:text-red-500"
              >
                LOG OUT
              </Link>
            </>
          ) : (
            <>
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
