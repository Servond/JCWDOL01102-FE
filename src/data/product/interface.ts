import { IApiResponse, IPaginate, IProduct } from "../interfaces";
import { IPromotionAttributes } from "../promotion/interface";

export interface IProductLandingPage extends IProduct {
  promotion: IPromotionAttributes[];
}

export interface ILandingpageProductInput {
  page: number;
  limit: number;
  sortBy: string | undefined;
  filterBy: string | undefined;
  name: string;
  includePromotion: boolean;
  branchId: number;
  categoryId: string | undefined;
  order: string;
}

export interface IProductCreationAttributes extends Partial<IProduct> {}
export type LandingpageProductResponse = IApiResponse<
  IPaginate<IProductLandingPage>
>;

export type ProductRecommendationResponse = IApiResponse<IProductLandingPage[]>;
