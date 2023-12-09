import { IApiResponseStatic } from "../../data/interfaces";
import { UserCreationAttributes } from "../../data/user/interfaces";
import { adminServer } from "../server";

export const deleteAdminById = (id: number) => {
  return adminServer.delete<IApiResponseStatic>(`/api/users/${id}`);
};

export const updateAdminById = (
  id: number,
  payload: UserCreationAttributes
) => {
  return adminServer.put<IApiResponseStatic>(`/api/users/${id}`, payload);
};
