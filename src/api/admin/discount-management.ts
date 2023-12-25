/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { IApiResponse } from "../../data/interfaces";
import {
  IPromotionAttributes,
  PromotionCreationAttributes,
  PromotionPaginateResponse,
} from "../../data/promotion/interface";
import {
  IGetProductVoucherResponse,
  IVoucherAttributes,
  VoucherCreationAttributes,
  VoucherPaginateResponse,
} from "../../data/voucher/interface";
import { adminServer } from "../server";

export const getVoucherPaginate = (
  page: number,
  limit: number,
  sortBy: string | undefined,
  filterBy: string | undefined,
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

export const getPromoPaginate = (
  page: number,
  limit: number,
  sortBy: string | undefined,
  filterBy: string | undefined,
  key: string
) => {
  return adminServer.get<PromotionPaginateResponse>("api/promotions", {
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

export const postPromotion = (data: PromotionCreationAttributes) => {
  return adminServer.post<IApiResponse<IPromotionAttributes>>(
    "api/promotions",
    data
  );
};

export const manageProductVoucher = (voucherId: number, data: string[]) => {
  return adminServer.post<IApiResponse<IPromotionAttributes>>(
    "api/vouchers/products",
    {
      data,
    },
    {
      params: {
        voucherId,
      },
    }
  );
};

export const removeVoucher = (voucherId: number) => {
  return adminServer.delete<IApiResponse<IVoucherAttributes>>(
    `api/vouchers/${voucherId}`
  );
};

export const removePromotion = (promotionId: number) => {
  return adminServer.delete<IApiResponse<IPromotionAttributes>>(
    `api/promotions/${promotionId}`
  );
};

export const fetchProductVoucherByBranch = async (
  voucherId: number,
  key?: string
): Promise<any> => {
  try {
    const res = await adminServer.get<IApiResponse<IGetProductVoucherResponse>>(
      "api/vouchers/products",
      {
        params: {
          voucherId,
          key: `%${key}%`,
        },
      }
    );
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw {
        statusCode: e.response?.status,
        message: e.message,
      } as IApiResponse<IGetProductVoucherResponse>;
    }
    throw e;
  }
};
