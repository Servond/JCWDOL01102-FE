export interface IPaymentGateway {
  id: number;
  name: string;
  logoUrl: string;
  code: string;
  type: string;
}

export interface IResponseNotifications {
  statusCode: number;
  message: string;
  data: {
    data: INotification[];
    totalCount: number;
    pageSize: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface INotification {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  orderId: number;
  status: string;
  order_id: number;
  order: {
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
  };
}