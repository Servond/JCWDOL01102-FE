import { IApiResponseStatic } from "../../data/interfaces";
import { UserCreationAttributes } from "../../data/user/interfaces";
import { adminServer } from "../server";
import { getToken } from "./product";

export const deleteAdminById = (id: number) => {
  return adminServer.delete<IApiResponseStatic>(`/api/users/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const updateAdminById = (
  id: number,
  payload: UserCreationAttributes
) => {
  return adminServer.put<IApiResponseStatic>(`/api/users/${id}`, payload, {
    headers: {
      Authorization: getToken(),
    },
  });
};
