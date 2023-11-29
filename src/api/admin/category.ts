// {{base_url}}/api/category

import { server } from "../server";

export const fetchCategory = async () => {
  const response = await server.get(`api/category`);
  return response;
};
