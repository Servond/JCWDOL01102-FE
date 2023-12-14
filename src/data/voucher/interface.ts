import { IApiResponse, IPaginate } from "../interfaces";

export interface IVoucherAttributes {
  id: number;
  name: string;
  type: string;
  dateStart: string;
  dateEnd: string;
  minimumPrice?: number | null;
  value: number;
  valueType: string;
  product?: { id: number; name: string; branch: { id: number; name: string } };
}

export interface VoucherCreationAttributes
  extends Omit<IVoucherAttributes, "id"> {}

export interface VoucherPromotionInput {
  voucher: VoucherCreationAttributes;
  productId: number | null;
}

export type VoucherPaginateResponse = IApiResponse<
  IPaginate<IVoucherAttributes>
>;
