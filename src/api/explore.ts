import { IGetCategoriesWithLimitInput } from "../data/category/interface";

import {
  ILandingpageProductInput,
  LandingpageProductResponse,
} from "../data/product/interface";
import { server } from "./server";

export const getExploreProductPaginate = (input: ILandingpageProductInput) => {
  return server.get<LandingpageProductResponse>("/api/store/products", {
    params: input,
  });
};

export const getCategoriesWithLimit = (input: IGetCategoriesWithLimitInput) => {
  return server.get("/api/store/categories", {
    params: input,
  });
};
