import { AddressAttributes } from "../data/address/interface";
import { adminServer } from "./server";

export const createAddress = (id: number, data: AddressAttributes) => {
  return adminServer.post(`api/address/${id}`, data, {});
};

export const getAddressList = (id: number) => {
  return adminServer.get(`api/address/${id}`, {});
};

export const changeDefaultAddress = (id: number, addressId: number) => {
  return adminServer.put(`api/address/${id}/${addressId}`, {});
};

export const updateAddress = (
  id: number,
  addressId: number,
  data: AddressAttributes
) => {
  return adminServer.patch(`api/address/${id}/${addressId}`, data, {});
};
