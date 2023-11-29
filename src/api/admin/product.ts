// {{base_url}}/api/product

import { IProductRequest } from "../../app/redux/slice/Admin/AddProduct/AddProductSlice";
import { server } from "../server";

export const postCreateProduct = (file: File, data: IProductRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", data.name!);
  formData.append("price", data.price!.toString());
  formData.append("stock", data.stock!.toString());
  formData.append("branchId", data.branchId!.toString()!);
  formData.append("weight", data.weight!.toString()!);
  formData.append("desc", data.desc!);
  formData.append("categoryId", data.categoryId!.toString()!);
  return server.post(`api/product`, formData);
};

// {{base_url}}/api/product?page=1&limit=10&name&categoryId=

interface IQuery {
  [key: string]: string | number | null | undefined;
}

export const fetchAdminProductPage = (query: IQuery) => {
  return server.get(`api/product`, { params: query });
};
// {{base_url}}/api/product/:id

export const updateProduct = (id: number, data: Partial<IProductRequest>) => {
  return server.put(`api/product/${id}`, data);
};

// {{base_url}}/api/product/:id

export const deleteProduct = (id: number) => {
  return server.delete(`api/product/${id}`);
};
