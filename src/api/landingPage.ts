import { IGetNearestBranchInput } from "../data/branch/interface";
import { IGetCategoriesWithLimitInput } from "../data/category/interface";
import { server } from "./server";

export const getCategoriesWithLimit = (input: IGetCategoriesWithLimitInput) => {
  return server.get("/api/category", {
    params: input,
  });
};

export const getNearestBranch = (input: IGetNearestBranchInput) => {
  return server.get("/api/branches", {
    params: input,
  });
};
