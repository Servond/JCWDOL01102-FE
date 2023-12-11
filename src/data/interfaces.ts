export interface IAppInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value?: string | undefined;
}

export interface IAppModalProps {
  onClose: VoidFunction;
  isOpen: boolean;
  value?: string | undefined;
}

export interface IPaginate<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}

export interface IApiResponse<T> {
  statusCode?: number;
  message?: string;
  data?: T;
}

export interface IApiResponseStatic {
  statusCode?: number;
  message?: string;
}

export interface OptionType {
  label: string;
  value: string;
}
export interface IResponseApi<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface IProduct {
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
  imageUrl: string;
}

export interface IQuery {
  [key: string]: string | number | null | undefined;
}

export interface IPage<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}
