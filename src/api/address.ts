import { AddressAttributes } from "../data/address/interface";
import { getToken } from "./admin/product";
import { adminServer } from "./server";

export const createAddress = (id: number, data: AddressAttributes) => {
  return adminServer.post(`api/address/${id}`, data, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getAddressList = (id: number) => {
  return adminServer.get(`api/address/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const changeDefaultAddress = (id: number, addressId: number) => {
  return adminServer.put(`api/address/${id}/${addressId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const updateAddress = (
  id: number,
  addressId: number,
  data: AddressAttributes
) => {
  return adminServer.patch(`api/address/${id}/${addressId}`, data, {
    headers: {
      Authorization: getToken(),
    },
  });
};
