// {{base_url}}/api/category

import { adminServer } from "../server";

export const fetchCategory = async () => {
  const response = await adminServer.get(`api/category`);
  return response;
};
