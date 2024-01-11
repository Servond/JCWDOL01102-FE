import { IGetNearestBranchInput } from "../data/branch/interface";
import { ICategoryAttributes } from "../data/category/interface";
import { IApiResponse } from "../data/interfaces";

import { server } from "./server";

export const getNearestBranch = (input: IGetNearestBranchInput) => {
  return server.get("/api/branches", {
    params: input,
  });
};

export const getProductRecommendation = (branchId: number) => {
  return server.get("/api/store/recommendation", {
    params: { branchId },
  });
};

export const getLandingpageCetgory = (branchId: number) => {
  return server.get<IApiResponse<ICategoryAttributes[]>>(
    "/api/store/categories",
    {
      params: { branchId },
    }
  );
};
