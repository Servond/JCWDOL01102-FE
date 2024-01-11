import {
  GetCartResponse,
  ICartAttributes,
  ICartEditAttributes,
  IManageCartInput,
  ManageCartResponse,
} from "../data/cart/interface";
import { getToken } from "./admin/product";
import { server } from "./server";

export const manageCart = async (input: IManageCartInput) => {
  return server.post<ManageCartResponse>("/api/cart", input.data, {
    params: {
      action: input.action,
      branchId: input.branchId,
      userId: input.userId,
      productId: input.productId,
    },
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getCart = async (input: ICartEditAttributes) => {
  return server.get<GetCartResponse>("/api/cart", {
    params: input,
    headers: {
      Authorization: getToken(),
    },
  });
};

export const clearCart = async (input: ICartAttributes[]) => {
  return server.delete<ManageCartResponse>("/api/cart", {
    data: input,
    headers: {
      Authorization: getToken(),
    },
  });
};
