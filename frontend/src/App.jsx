import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Navbar from "../src/components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "../src/components/Footer";
import Forms from "./pages/Admin/Forms";
import Fill from "../src/pages/Student/Fill";
import StudentSubmissions from "../src/pages/Student/Submissions";
import AllSubmissions from "../src/pages/Admin/Submissions";
import Create from "../src/pages/Admin/Create";
import Home from "../src/pages/Home";
import { UserContext } from "../context/userContext";
import AdminHome from "../src/pages/Admin/Home";
import FacultyHome from "../src/pages/Faculty/Home";
import StudentHome from "../src/pages/Student/Home";
import StudentForms from "./components/Student/Forms.jsx";
import Analysis from "./pages/Faculty/Analysis.jsx";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     // Redirect to home page if no user is logged in
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <>
      <div className="App">
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {user && user.user.userType === "Admin" && (
            <>
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/create" element={<Create />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/submission/:id" element={<AllSubmissions />} />
            </>
          )}
          {user && user.user.userType === "Faculty" && (
            <>
              <Route path="/facultyhome" element={<FacultyHome />} />
              <Route path="/analysis/:id" element={<Analysis />} />
            </>
          )}
          {user && user.user.userType === "Student" && (
            <>
              <Route path="/studenthome" element={<StudentHome />} />
              <Route path="/forms" element={<StudentForms />} />
              <Route path="/fill/:id" element={<Fill />} />
              <Route path="/submissions/:id" element={<StudentSubmissions />} />
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
