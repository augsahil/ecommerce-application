import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Headers from "./components/Header";
import LoginUser from "./pages/auth/LoginUser";

const App = () => {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </>
  );
};

export default App;
