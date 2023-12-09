import { IApiResponseStatic } from "../../data/interfaces";
import { adminServer } from "../server";

export const deleteAdminById = (id: number) => {
  return adminServer.delete<IApiResponseStatic>(`/api/users/${id}`);
};
