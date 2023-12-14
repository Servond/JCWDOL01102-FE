import { IApiResponse, IPaginate } from "../interfaces";

export interface IPromotionAttributes {
  name: string;
  id: number;
  type: string;
  dateStart: string;
  dateEnd: string;
  value: number | null;
  valueType: string | null;
}

export interface PromotionCreationAttributes
  extends Omit<IPromotionAttributes, "id"> {}

export interface PostPromotionInput {
  promotion: PromotionCreationAttributes;
  productId: number | null;
}

export type PromotionPaginateResponse = IApiResponse<
  IPaginate<IPromotionAttributes>
>;
