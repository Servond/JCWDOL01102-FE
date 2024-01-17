import { IApiResponse } from "../interfaces";
import { IProductLandingPage } from "../product/interface";

export interface ICartAttributes {
  id: number;
  userId: number;
  branchId: number;
  productId: number;
  qty: number;
  product: IProductLandingPage;
}

export interface ICartEditAttributes extends Partial<ICartAttributes> {}
export interface IManageCartInput {
  data: Omit<ICartEditAttributes, "product">;
  action: "add" | "reduce";
  branchId: number;
  userId: number;
  productId: number;
}

export type ManageCartResponse = IApiResponse<ICartAttributes>;
export type GetCartResponse = IApiResponse<ICartAttributes[]>;
