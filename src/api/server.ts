import axios from "axios";
export const server = axios.create({
  baseURL: `http://${import.meta.env.VITE_SERVER_HOST}`,
});

export const adminServer = axios.create({
  baseURL: `http://${import.meta.env.VITE_SERVER_HOST}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
