import { IGetNearestBranchInput } from "../data/branch/interface";
import {
  ICategoryAttributes,
  IGetCategoriesWithLimitInput,
} from "../data/category/interface";
import { IApiResponse } from "../data/interfaces";
import {
  ILandingpageProductInput,
  LandingpageProductResponse,
} from "../data/product/interface";
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

export const getProductRecommendation = (branchId: number) => {
  return server.get("/api/store/recommendation", {
    params: { branchId },
  });
};
export const getLandingPageProductPaginate = (
  input: ILandingpageProductInput
) => {
  return server.get<LandingpageProductResponse>("/api/product/landing-page", {
    params: input,
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
