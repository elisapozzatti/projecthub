import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./components/Sidebar.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Box from "./components/Box.jsx";

function Homepage() {
  const { user, logout } = useAuth();

  const [organization, setOrganization] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProj, setSelectedProj] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [t, setT] = useState(false);
  const [taskname, setTaskname] = useState("");
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get("https://projecthub-9l9g.onrender.com/projects", {
          params: { organizationId: user.organizationId },
        })
        .then((res) => setProjects(res.data));
      axios
        .get(
          `https://projecthub-9l9g.onrender.com/organizations/${user.organizationId}`,
        )
        .then((res) => setOrganization(res.data));
    }
  }, [user]);

  const loadTasks = async (proj) => {
    setSelectedProj(proj);
    const res = await axios.get(
      `https://projecthub-9l9g.onrender.com/tasks/${proj._id}`,
    );
    setTasks(res.data);
  };

  const addProject = async (name) => {
    const res = await axios.post(
      "https://projecthub-9l9g.onrender.com/projects",
      {
        name,
        organizationId: user.organizationId,
      },
    );
    const res2 = await axios.get(
      "https://projecthub-9l9g.onrender.com/projects",
      {
        params: { organizationId: user.organizationId },
      },
    );

    setProjects(res2.data);
  };

  const addTask = async (title) => {
    await axios.post("https://projecthub-9l9g.onrender.com/tasks", {
      title,
      projectId: selectedProj._id,
      organization: user.organizationId,
    });
    loadTasks(selectedProj);
  };

  const updateTaskStatus = async (id, status) => {
    await axios.put(`https://projecthub-9l9g.onrender.com/tasks/${id}`, {
      status,
    });
    loadTasks(selectedProj);
  };

  const removeTask = async (id) => {
    await axios.delete(`https://projecthub-9l9g.onrender.com/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    loadTasks(selectedProj);
  };

  const deleteProject = async (id) => {
    await axios.delete(`https://projecthub-9l9g.onrender.com/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await axios.get(
      `https://projecthub-9l9g.onrender.com/projects`,
      {
        params: {
          organizationId: user.organizationId,
        },
      },
    );
    setProjects(res.data);
    setSelectedProj(null);
  };

  const editProject = async (name, id) => {
    await axios.patch(`https://projecthub-9l9g.onrender.com/projects/${id}`, {
      name: name,
    });
    const res = await axios.get(
      `https://projecthub-9l9g.onrender.com/projects`,
      {
        params: {
          organizationId: user.organizationId,
        },
      },
    );
    setProjects(res.data);
    const updatedProjects = res.data;
    const updatedProject = updatedProjects.find((p) => p._id === id);
    setSelectedProj(updatedProject);
  };

  const editTask = async (title, id) => {
    await axios.patch(`https://projecthub-9l9g.onrender.com/tasks/${id}`, {
      title: title,
    });
    loadTasks(selectedProj);
  };

  const handleStatusClick = async (task) => {
    const order = ["in review", "done", "to do"];

    const currentIndex = order.indexOf(task.status);
    const nextStatus = order[(currentIndex + 1) % order.length];

    await updateTaskStatus(task._id, nextStatus);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        organization={organization}
        projects={projects}
        loadTasks={loadTasks}
        addProject={addProject}
        deleteProject={deleteProject}
        editProject={editProject}
      />

      <main style={{ flex: 1, padding: "20px" }}>
        {selectedProj ? (
          <div>
            <h2>{selectedProj.name}</h2>
            <button
              onClick={() => setAdd(true)}
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.3)",
                marginBottom: "20px",
              }}
            >
              + Aggiungi Task
            </button>

            <table
              style={{
                width: "70vw",
                marginRight: "20px",
              }}
            >
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr
                    key={t._id}
                    style={{
                      background: "#1e293b",
                      padding: "15px",
                      marginTop: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <td
                      style={{
                        padding: "0 10px",
                        width: "60%",
                      }}
                    >
                      {t.title}
                    </td>
                    <td
                      style={{
                        padding: "0 10px",
                        textAlign: "center",
                        width: "30%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleStatusClick(t)}
                    >
                      {t.status}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          padding: "0 10px",
                        }}
                      >
                        <p
                          onClick={() => {
                            setEdit(true);
                            setT(t._id);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          📝
                        </p>
                        {user.role === "superuser" && (
                          <p
                            onClick={() => {
                              setCancel(true);
                              setT(t._id);
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            X
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              width: "70.5vw",
            }}
          >
            <p>Seleziona un progetto dalla sidebar</p>
          </div>
        )}
      </main>
      {cancel && (
        <Box
          title="Sei sicuro di voler cancellare il task? Non potrai ripristinarlo."
          confirm="SI"
          cancel="ANNULLA"
          onClickConfirm={() => {
            removeTask(t);
            setCancel(false);
          }}
          onClickCancel={() => setCancel(false)}
        />
      )}
      {add && (
        <Box
          title="Inserisci il nome del nuovo task:"
          input={
            <input
              value={taskname}
              onChange={(e) => setTaskname(e.target.value)}
              placeholder="Nome task"
            />
          }
          confirm="AGGIUNGI"
          cancel="ANNULLA"
          onClickConfirm={() => {
            addTask(taskname);
            setAdd(false);
            setTaskname("");
          }}
          onClickCancel={() => setAdd(false)}
        />
      )}
      {edit && (
        <Box
          title="Modifica il nome del task:"
          input={
            <input
              value={taskname}
              onChange={(e) => setTaskname(e.target.value)}
              placeholder="Nome task"
            />
          }
          confirm="MODIFICA"
          cancel="ANNULLA"
          onClickConfirm={() => {
            editTask(taskname, t);
            setEdit(false);
            setTaskname("");
          }}
          onClickCancel={() => setEdit(false)}
        />
      )}
    </div>
  );
}

export default Homepage;
