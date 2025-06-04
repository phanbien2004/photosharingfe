import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';
import UploadPhoto from "./pages/UploadPhoto";
import SignUp from "./pages/SignUp";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const login = sessionStorage.getItem('login');
    setIsLogin(login === "true");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/upload_photo" element={<UploadPhoto />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to={isLogin ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
