import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Box from "./Box.jsx";

function Sidebar({
  organization,
  projects,
  loadTasks,
  addProject,
  deleteProject,
  editProject,
}) {
  const { user, logout } = useAuth();

  const [cancel, setCancel] = useState(false);
  const [project, setProject] = useState(null);
  const [add, setAdd] = useState(null);
  const [projectname, setProjectname] = useState("");
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <nav
        style={{
          width: "30vw",
          background: "rgba(2, 6, 23, 0.7)",
          borderRadius: "10px",
          height: "95vh",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          marginRight: "20px",
        }}
      >
        <h3
          style={{
            textTransform: "uppercase",
          }}
        >
          {organization?.name}
        </h3>
        <p>
          Nome Utente: {user.name} ({user.role})
        </p>
        <button
          onClick={() => setAdd(true)}
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.3)",
          }}
        >
          + Nuovo Progetto
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {projects.map((p) => (
            <div
              key={p._id}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#1e293b",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "10px",
                position: "relative",
                height: "30px",
              }}
              onClick={() => loadTasks(p)}
            >
              {p.name}
              {user.role === "superuser" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCancel(true);
                    setProject(p._id);
                  }}
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.3)",
                    position: "absolute",
                    top: "-5px",
                    right: "5px",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  x
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEdit(true);
                  setProject(p._id);
                }}
                style={{
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                  position: "absolute",
                  bottom: "5px",
                  right: "5px",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                📝
              </button>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => {
              localStorage.removeItem("token");
              logout();
              navigate("/");
            }}
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.3)",
            }}
          >
            Logout
          </button>
          <a
            href="https://portfolio-mipresento.vercel.app/"
            style={{
              textDecoration: "none",
              color: "white",
              textAlign: "center",
              fontSize: "12px",
              marginTop: "5px",
            }}
          >
            Torna al portfolio
          </a>
        </div>
      </nav>
      {cancel && (
        <Box
          title="Sei sicuro di voler cancellare il progetto? Non potrai ripristinarlo."
          confirm="SI"
          cancel="ANNULLA"
          onClickConfirm={() => {
            deleteProject(project);
            setCancel(false);
          }}
          onClickCancel={() => setCancel(false)}
        />
      )}
      {add && (
        <Box
          title="Inserisci il nome del nuovo progetto:"
          input={
            <input
              value={projectname}
              onChange={(e) => setProjectname(e.target.value)}
              placeholder="Nome progetto"
            />
          }
          confirm="AGGIUNGI"
          cancel="ANNULLA"
          onClickConfirm={() => {
            addProject(projectname);
            setAdd(false);
            setProjectname("");
          }}
          onClickCancel={() => setAdd(false)}
        />
      )}
      {edit && (
        <Box
          title="Modifica il nome del progetto:"
          input={
            <input
              value={projectname}
              onChange={(e) => setProjectname(e.target.value)}
              placeholder="Nome progetto"
            />
          }
          confirm="MODIFICA"
          cancel="ANNULLA"
          onClickConfirm={() => {
            editProject(projectname, project);
            setEdit(false);
            setProjectname("");
          }}
          onClickCancel={() => setEdit(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
