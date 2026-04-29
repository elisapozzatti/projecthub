import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Homepage from "./Homepage.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Registerorg from "./components/Registerorg.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Caricamento...</p>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/homepage" replace /> : <Login />}
        />

        <Route
          path="/homepage"
          element={user ? <Homepage /> : <Navigate to="/" replace />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/registerorg" element={<Registerorg />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
