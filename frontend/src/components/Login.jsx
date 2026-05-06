import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import Header from "./Header.jsx";

function Login() {
  const { login: authLogin, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://projecthub-9l9g.onrender.com/login",
        {
          email,
          password,
        },
      );

      authLogin(res.data.token);
      navigate("/homepage");
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return <Navigate to="/homepage" replace />;
  }

  return (
    <>
      <Header width="200px" height="200px" />
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          height: "100vh",
          marginTop: "10vh",
        }}
      >
        <h2>Login</h2>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "20%",
          }}
        />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "20%",
          }}
        />

        <button
          type="submit"
          style={{
            width: "10%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Accedi</h2>
        </button>
        <p
          style={{
            margin: "0",
            cursor: "pointer",
          }}
        >
          <Link
            to="/register"
            replace
            style={{
              textDecoration: "none",
              color: "white",
              margin: "0",
            }}
          >
            <h2
              style={{
                borderBottom: "2px solid #2563eb",
                fontSize: "12px",
                margin: "0",
              }}
            >
              Registrati se non l'hai ancora fatto
            </h2>
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
