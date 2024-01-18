export interface IOrderManagementResponse {
  statusCode: number;
  message: string;
  data: {
    data: IOrderData[];
    totalCount: number;
    pageSize: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface IOrderData {
  id: number;
  invoiceNo: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  order_details: IOrderDetail[];
}

interface IOrderDetail {
  orderId: number;
  productId: number;
  qty: number;
  price: number;
  product: IProduct;
}

interface IProduct {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  imageId: number;
  name: string;
  price: number;
  stock: number;
  branchId: number;
  weight: number;
  desc: string;
  image: {
    uniqueId: string;
  };
}

export interface IUpdateOrderStatusInput extends Pick<IOrderData, "status"> {
  orderId: number;
}
