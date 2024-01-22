// get /api/order/admin

import { IQuery } from "../../data/interfaces";
import { server } from "../server";
import { getToken } from "./product";

export const fetchOrderManagement = (query: IQuery) => {
  return server.get(`api/order/admin`, {
    params: query,
    headers: {
      Authorization: getToken(),
    },
  });
};

export const updateOrderStatus = (orderId: number, status: string) => {
  return server.put(
    `api/order/status/${orderId}`,
    { status },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateOrderStatusUser = (orderId: number, status: string) => {
  return server.put(
    `api/order/user/status/${orderId}`,
    { status },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const cancelOrder = (orderId: number, branchId?: number) => {
  return server.put(
    `api/order/cancel/${orderId}`,
    {},
    {
      headers: {
        Authorization: getToken(),
      },
      params: {
        branchId,
      },
    }
  );
};

export const fetchOrderDetail = (invoiceNo: string) => {
  return server.get(`api/order/dashboard/${invoiceNo}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};
