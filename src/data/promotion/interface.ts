import { IApiResponse, IPaginate } from "../interfaces";

export interface IPromotionAttributes {
  name: string;
  id: number;
  type: string;
  dateStart: string;
  dateEnd: string;
  value: number | null;
  valueType: string | null;
  productId: number | null;
}

export interface IPromotionPaginateAttributes extends IPromotionAttributes {
  product: { name: string };
}

export interface PromotionCreationAttributes
  extends Omit<IPromotionAttributes, "id"> {}

export interface PostPromotionInput {
  promotion: PromotionCreationAttributes;
  productId: number | null;
}

export type PromotionPaginateResponse = IApiResponse<
  IPaginate<IPromotionPaginateAttributes>
>;
