import { IResponseApi } from "../data/interfaces";
import { IProductOrder } from "../data/order/interface";
import { getToken } from "./admin/product";
import { server } from "./server";

export const getMultipleProductApi = (productId: string) => {
  return server.get<IResponseApi<IProductOrder[]>>(
    `/api/product/search?productId=${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    }
  );
};
