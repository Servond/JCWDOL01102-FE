import { IApiResponse } from "../../data/interfaces";
import {
  IPromotionAttributes,
  PromotionCreationAttributes,
} from "../../data/promotion/interface";
import {
  IVoucherAttributes,
  VoucherCreationAttributes,
  VoucherPaginateResponse,
} from "../../data/voucher/interface";
import { adminServer } from "../server";

export const getVoucherPaginate = (
  page: number,
  limit: number,
  sortBy: string | undefined,
  filterBy: number | undefined,
  key: string
) => {
  return adminServer.get<VoucherPaginateResponse>("api/vouchers", {
    params: {
      page,
      limit,
      sortBy,
      filterBy,
      key: `%${key}%`,
    },
  });
};

export const postVoucher = (
  data: VoucherCreationAttributes,
  productId: number | null
) => {
  return adminServer.post<IApiResponse<IVoucherAttributes>>(
    "api/vouchers",
    data,
    {
      params: productId ? { productId } : undefined,
    }
  );
};

export const postPromotion = (
  data: PromotionCreationAttributes,
  productId: number | null
) => {
  return adminServer.post<IApiResponse<IPromotionAttributes>>(
    "api/promotions",
    data,
    {
      params: productId ? { productId } : undefined,
    }
  );
};
