import { IApiResponse, IPaginate } from "../interfaces";

export interface IVoucherAttributes {
  id: number;
  branchId: number;
  name: string;
  type: string;
  dateStart: string;
  dateEnd: string;
  minimumPrice?: number | null;
  value: number;
  valueType: string;
}

export interface VoucherCreationAttributes
  extends Omit<IVoucherAttributes, "id"> {}

export interface VoucherPromotionInput {
  voucher: VoucherCreationAttributes;
  productId: number | null;
}

export interface IManageProductVoucherInput {
  voucherId: number;
  data: string[];
}

export type VoucherPaginateResponse = IApiResponse<
  IPaginate<IVoucherAttributes>
>;

export interface IProductVoucher {
  id: number;
  name: string;
  active: boolean;
}

export interface IGetProductVoucherResponse {
  productList: IProductVoucher[];
  activeProductIdList: string[];
  filteredActiveProductIdList: string[];
}
