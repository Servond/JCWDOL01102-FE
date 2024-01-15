import axios from "axios";
export const server = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

export const adminServer = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
