// {{base_url}}/api/category

import { IQuery } from "../../data/interfaces";
import { adminServer } from "../server";
import { getToken } from "./product";

export const fetchCategory = async () => {
  const response = await adminServer.get(`api/category`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const fetchCategoryPage = async (query: IQuery) => {
  const response = await adminServer.get(`api/category/page`, {
    params: query,
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const createCategory = async (name: string) => {
  const response = await adminServer.post(
    `api/category`,
    { name },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};

export const updateCategory = async (id: number, name: string) => {
  const response = await adminServer.put(
    `api/category/${id}`,
    { name },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};

export const deleteCategoryById = async (id: number) => {
  const response = await adminServer.delete(`api/category/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};