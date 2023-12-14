import { IBranchResponseData } from "../data/branch/interface";
import { IApiResponse } from "../data/interfaces";
import { generateAuthToken } from "../utils/function/generateAuthToken";
import { server } from "./server";

export const getAllBranch = () => {
  return server.get<IApiResponse<IBranchResponseData[]>>("/api/branches", {
    headers: {
      Authorization: generateAuthToken(localStorage.getItem("token")),
    },
  });
};
