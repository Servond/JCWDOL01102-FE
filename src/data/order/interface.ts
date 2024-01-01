interface Courier {
  shipper: string;
  name: string;
  code: string;
  price: number;
  etd: string;
  image: string;
}
interface ICart {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface IProductOrder {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  categoryId: number;
  imageId: number;
  name: string;
  price: number;
  stock: number;
  branchId: number;
  weight: number;
  desc: string;
  imageUrl: string;
  category: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    name: string;
    branchId: number;
  };
}

export interface IDataOrder {
  userId?: number;
  branchId?: number;
  origin?: number;
  destination?: number;
  products?: ICart[];
  courier?: Courier;
  discountId?: number[];
  totalAmount?: number;
  paymentCode?: string;
}

export interface IOrderSlice {
  courier: Courier | null;
  cart: ICart[];
  isOpenDrawer: boolean;
  origin?: number;
  destination?: number;
  branchId?: number;
  dataOrder: IDataOrder | null;
  products: IProductOrder[];
  statusCode: number;
  statusFetchProduct: "idle" | "pending" | "done" | "rejected";
  paymentCode: string;
  productAmount: number;
  shippingAmount: number;
  totalAmount: number;
}
