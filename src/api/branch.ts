import { IBranchResponseData } from "../data/branch/interface";
import { IApiResponse } from "../data/interfaces";
import { adminServer } from "./server";

export const getAllBranch = () => {
  return adminServer.get<IApiResponse<IBranchResponseData[]>>("/api/branches");
};
