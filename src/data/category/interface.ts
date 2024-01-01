import { IPaginate } from "../interfaces";

export interface ICategoryAttributes {
  id: number;
  name: string;
  branchId: number;
}

export interface IGetCategoriesWithLimitInput {
  limit: number;
  branchId: number;
}
export type CategoryLimitResponse = IPaginate<ICategoryAttributes>;
