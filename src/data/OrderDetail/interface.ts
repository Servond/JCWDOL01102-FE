import { IProductLandingPage } from "../product/interface";

export interface IOrderWithDetail {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  voucherId: number | null;
  paymentId: number;
  total: number;
  status: string;
  promotionId: number | null;
  branchId: number;
  invoiceNo: string;
  howToPay: string;
  receivedName: string;
  phone: string;
  address: string;
  orderStatus: IOrderStatus[];
  orderDetails: IDetailOrder[];
}

export interface IOrderStatus {
  id: number;
  status: string;
  createdAt: string;
}

export interface IDetailOrder {
  id: number;
  orderId: number;
  productId: number;
  qty: number;
  price: number;
  order_id: number;
  product: IProductLandingPage;
}

export interface IGetOrderDetailParam {
  invoiceNo: string;
  branchId: number;
}
