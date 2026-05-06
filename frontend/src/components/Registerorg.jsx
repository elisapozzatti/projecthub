import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Registerorg() {
  const navigate = useNavigate();

  const [organizationName, setOrganizationName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://projecthub-9l9g.onrender.com/organizations",
        {
          name: organizationName,
        },
      );
      navigate("/register");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Header width="200px" height="200px" />
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          height: "100vh",
          marginTop: "10vh",
        }}
      >
        <h2>Registrazione</h2>
        <input
          placeholder="nome organizzazione"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <button
          type="submit"
          style={{
            width: "17%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              borderBottom: "2px solid #2563eb",
              fontSize: "12px",
              margin: "0",
            }}
          >
            Registra organizzazione
          </h2>
        </button>
      </form>
    </>
  );
}

export default Registerorg;
