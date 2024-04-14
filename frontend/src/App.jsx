import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/Admin/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Forms from "./pages/Admin/Forms";
import Fill from "./pages/Admin/Fill";
import Submissions from "./pages/Admin/Submissions";
import Create from "./pages/Admin/Create";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<Create/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forms" element={<Forms/>} />
          <Route path="/fill/:id" element={<Fill/>} />
          <Route path="/submissions/:id" element={<Submissions/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
