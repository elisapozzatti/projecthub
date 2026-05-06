import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import Header from "./Header";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [organizationId, setOrganizationId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedrole, setSelectedrole] = useState("seleziona ruolo");
  const [selectedorganization, setSelectedorganization] = useState(
    "seleziona organizzazione",
  );

  useEffect(() => {
    const getOrganization = async () => {
      try {
        const res = await axios.get(
          "https://projecthub-9l9g.onrender.com/organizations",
        );
        setOrganizations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getOrganization();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      selectedrole == "seleziona ruolo" ||
      selectedorganization == "seleziona organizzazione"
    ) {
      prompt("Seleziona un ruolo o un'organizzazione");
      return;
    }
    try {
      const hash = await bcrypt.hash(password, 10);
      const res = await axios.post(
        "https://projecthub-9l9g.onrender.com/user",
        {
          name: name,
          email: email,
          password: hash,
          role: selectedrole,
          organizationName: selectedorganization,
          organizationId: organizationId,
        },
      );
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header width="150px" height="150px" />
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          height: "100vh",
          marginTop: "0",
        }}
      >
        <h2>Registrazione</h2>
        <input
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "20%",
          }}
        />
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
        <select
          value={selectedorganization}
          onChange={(e) => setSelectedorganization(e.target.value)}
          style={{
            width: "20%",
          }}
        >
          <option value="seleziona organizzazione">
            seleziona organizzazione
          </option>

          {organizations.map((org) => (
            <option key={org._id} value={org.name}>
              {org.name}
            </option>
          ))}
        </select>
        <input
          placeholder="id organizzazione"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <select
          value={selectedrole}
          onChange={(e) => setSelectedrole(e.target.value)}
          style={{
            width: "20%",
          }}
        >
          <option value="seleziona ruolo">seleziona ruolo</option>
          <option value="superuser">superuser</option>
          <option value="userdipendente">userdipendente</option>
        </select>
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
          <h2>Registrati</h2>
        </button>
        <p
          style={{
            margin: "0",
            cursor: "pointer",
          }}
        >
          <Link
            to="/registerorg"
            replace
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "12px",
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
              Registra la tua organizzazione se non l'hai ancora fatto
            </h2>
          </Link>
        </p>
      </form>
    </>
  );
}

export default Register;
