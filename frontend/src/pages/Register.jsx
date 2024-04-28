//FEEDIFY>FRONTEND>SRC>PAGES>REGISTER.JSX
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userId: "",
    userType: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { userId, userType, name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        userId,
        userType,
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          userId: "",
          userType: "",
          name: "",
          email: "",
          password: "",
        });
        toast.success("Sign Up Successful! Please sign in to continue.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white bg-[radial-gradient(#e5e7eb_3px,transparent_1px)] [background-size:36px_36px] overflow-y-auto">
      <div className="mx-auto font-poppins rounded-xl shadow-lg flex flex-col lg:flex-row md:flex-row w-3/4 md:w-2/3">
        <div className="bg-n-4 items-center md:rounded-l-xl md:rounded-r-none rounded-t-xl shadow-lg justify-between p-5 md:p-10 md:w-1/2">
          <div className="w-32 md:w-44 h-16">
            <img src="/Image/logo.png" alt="Logo" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-[75%]">
              <img src="/Image/charts.png" alt="Charts" />
            </div>
            <div className="items-center text-base md:text-lg text-center font-semibold text-n-2 ">
              Unlock the power of feedback. Sign Up to Feedify and discover a
              world of insights waiting just for you.
            </div>
          </div>
        </div>

        <div className="bg-n-1 flex flex-col justify-center items-center md:rounded-r-xl md:rounded-l-none rounded-b-xl shadow-lg md:w-[50%] p-[10%] md:p-[40px]">
          <div className="text-center mb-4">
            <p className="text-n-5 font-bold text-xl">Sign Up</p>
          </div>
          <form className="w-full" onSubmit={registerUser}>
            <div className="mb-4">
              <label
                htmlFor="userType"
                className="block text-n-3 font-medium mb-2"
              >
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                onChange={handleChange}
                value={data.userType}
                className="w-full border border-n-3 rounded-full px-4 py-2 focus:outline-none focus:border-n-4 text-n-5 text-base"
                required
              >
                <option value="">Select User Type</option>
                <option value="Admin">Admin</option>
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-n-3 font-medium mb-2"
              >
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                onChange={handleChange}
                value={data.userId}
                className="w-full border border-n-3 rounded-full px-4 py-2 focus:outline-none focus:border-n-4 text-n-5 text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-n-3 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={data.name}
                className="w-full border border-n-3 rounded-full px-4 py-2 focus:outline-none focus:border-n-4 text-n-5 text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-n-3 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                className="w-full border border-n-3 rounded-full px-4 py-2 focus:outline-none focus:border-n-4 text-n-5 text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-n-3 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                className="w-full border border-n-3 rounded-full px-4 py-2 focus:outline-none focus:border-n-4 text-n-5 text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-n-4 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      //{" "}
    </div>
  );
};

export default Register;
