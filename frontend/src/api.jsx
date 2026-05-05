import axios from "axios";

export const api = axios.create({
  baseURL: "https://projecthub-9l9g.onrender.com",
});

// Funzione per aggiornare il token dopo il login
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
