import { AddressAttributes } from "../data/address/interface";
import { server } from "./server";

export const createAddress = (id: number, data: AddressAttributes) => {
  return server.post(`api/address/${id}`, data);
};

export const getAddressList = (id: number) => {
  return server.get(`api/address/${id}`);
};

export const changeDefaultAddress = (id: number, addressId: number) => {
  return server.put(`api/address/${id}/${addressId}`);
};

export const updateAddress = (
  id: number,
  addressId: number,
  data: AddressAttributes
) => {
  return server.patch(`api/address/${id}/${addressId}`, data);
};
