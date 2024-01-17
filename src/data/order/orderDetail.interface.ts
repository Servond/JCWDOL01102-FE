export interface IOrderDetail {
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
  order_details: IProductDetail[];
}

interface IOrderStatus {
  status: string;
  createdAt: string;
}

interface IProductDetail {
  qty: number;
  price: number;
  productId: number;
  products: IProduct;
}

interface IProduct {
  name: string;
  imageId: number;
  image: {
    uniqueId: string;
  };
}
