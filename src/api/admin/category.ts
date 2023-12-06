// {{base_url}}/api/category

import { IQuery } from "../../data/interfaces";
import { adminServer } from "../server";

export const fetchCategory = async () => {
  const response = await adminServer.get(`api/category`);
  return response;
};

export const fetchCategoryPage = async (query: IQuery) => {
  const response = await adminServer.get(`api/category/page`, {
    params: query,
  });
  return response;
};

export const createCategory = async (name: string) => {
  const response = await adminServer.post(`api/category`, { name });
  return response;
};

export const updateCategory = async (id: number, name: string) => {
  const response = await adminServer.put(`api/category/${id}`, { name });
  return response;
};