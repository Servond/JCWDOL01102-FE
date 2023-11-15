import axios from "axios";

export const server = axios.create({
  baseURL: `http://${import.meta.env.VITE_SERVER_HOST}:${
    import.meta.env.VITE_SERVER_PORT
  }`,
});
