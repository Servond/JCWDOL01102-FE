import axios from "axios";

export const server = axios.create({
  baseURL: `${import.meta.env.PORT}`,
});
