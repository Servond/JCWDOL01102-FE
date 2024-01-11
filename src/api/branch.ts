import { IBranchResponseData } from "../data/branch/interface";
import { IApiResponse } from "../data/interfaces";
import { getToken } from "./admin/product";
import { adminServer } from "./server";

export const getAllBranch = () => {
  return adminServer.get<IApiResponse<IBranchResponseData[]>>("/api/branches", {
    headers: {
      Authorization: getToken(),
    },
  });
};
