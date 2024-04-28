import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const RegisterModalStudent = ({ isOpen, onClose }) => {
  const [data, setData] = useState({
    userId: "",
    userType: "Student",
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
          userType: "Student",
          name: "",
          email: "",
          password: "",
        });
        toast.success("Registered Successful !!");
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } fixed z-10 inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center w-full min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={registerUser}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col gap-5">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 flex justify-center font-medium text-gray-900"
                    id="modal-title"
                  >
                    Register New Student
                  </h3>
                  <div className="mt-6">
                    <div className="mb-2">
                      <label
                        htmlFor="userId"
                        className="block text-n-5 font-medium mb-1"
                      >
                        Roll No
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
                      <label
                        htmlFor="name"
                        className="block text-n-5 font-medium mb-1"
                      >
                        Student Name
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
                        className="block text-n-5 font-medium mb-1"
                      >
                        Student Email ID
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
                        className="block text-n-5 font-medium mb-1"
                      >
                        Password (D.O.B)
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
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-n-4 text-base font-medium text-white hover:bg-blue-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Register
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-n-2 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModalStudent;
