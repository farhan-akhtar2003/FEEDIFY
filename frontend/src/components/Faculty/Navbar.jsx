import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate;

  const handleLogout = () => {
    setUser(null);
    navigate("/");
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-white font-semibold text-lg">
          FEEDIFY
        </Link>
        <div className="flex items-center">
          <>
            <Link
              to="/dashboard"
              className="text-white mr-4  hover:text-gray-300"
            >
              <P>user.name</P>
              {user.userType}
            </Link>
            <button
              onClick={handleLogout}
              className="text-white mx-4 hover:text-red-500"
            >
              Logout
            </button>
          </>
          {/* // <>
            //   <Link
            //     to="/register"
            //     className="text-white mx-4 hover:text-yellow-400"
            //   >
            //     Register
            //   </Link>
            //   <Link
            //     to="/login"
            //     className="text-white mx-4 hover:text-green-500"
            //   >
            //     Login
            //   </Link>
            // </> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
