import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TokenContext } from "../context/authContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

axios.defaults.baseURL = "http://94.74.86.174:8080/api";

const RoutesChecklist = () => {
  const [token, setToken] = useState(null);
  const jwtToken = useMemo(() => ({ token, setToken }), [token]);

  useEffect(() => {
    const getToken = localStorage.getItem("token") || "0";
    setToken(getToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;
  }, [token]);

  if (token) {
    return (
      <TokenContext.Provider value={jwtToken}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </TokenContext.Provider>
    );
  }
};

export default RoutesChecklist;
