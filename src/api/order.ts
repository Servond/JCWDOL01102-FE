/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrderWithDetail } from "../data/OrderDetail/interface";
import { IResponseApi } from "../data/interfaces";
import { IPaymentGateway } from "../data/order.interface";
import { IDataOrder } from "../data/order/interface";
import { IOrderDetail } from "../data/order/orderDetail.interface";
import { IPostOrderResponse } from "../data/order/postOrder.interface";
import { RajaOngkirResponse } from "../data/rajaongkir/interface";
import { getToken } from "./admin/product";
import { server } from "./server";

export const getPaymentMethods = () => {
  return server.get<IResponseApi<IPaymentGateway[]>>(
    "/api/common/payment-gateway"
  );
};

export interface IReqCourierPrice {
  origin: string;
  destination: string;
  weight: number;
  courier: string;
}

export const getCourierPrice = (data: IReqCourierPrice) => {
  return server.post<IResponseApi<RajaOngkirResponse>>(
    `/api/common/courier-price`,
    data
  );
};

export const createTransaction = (data: IDataOrder) => {
  return server.post<IResponseApi<IPostOrderResponse>>(`/api/order`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
};

export const getOrderWithDetail = (invoiceNo: string) => {
  return server.get<IResponseApi<IOrderWithDetail>>(
    `/api/order/detail/${invoiceNo}`,
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};
