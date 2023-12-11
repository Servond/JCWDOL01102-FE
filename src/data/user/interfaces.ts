import { IApiResponse, IApiResponseStatic, IPaginate } from "../interfaces";

export interface UserResponseData {
  id: number;
  image_id?: number;
  branch_id?: number;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  referral_code: string;
  role_id: number;
  birthdate?: Date;
  isDeleted: boolean;
  isVerified: boolean;
  resetPassword_token?: string;
  verifyToken?: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  role?: { role: string } | string;
  branch?: { name: string };
  permission?: string[];
}

export interface IUserLoginAttributes {
  name: string;
  email: string;
  branchId: number | null;
  userId: number;
  phoneNumber: string;
  referralCode: string;
  role: string;
  permission: string[];
  branch: string | null;
  iat: number;
}

export interface IEmailCheckResponse {
  available: boolean;
}

export interface IEmailCheckInput {
  email: string;
  controller: AbortController;
}

export interface ISendEmailResponse {
  from?: string;
  message: string;
  to: string;
  subject?: string;
  status: string;
}

export interface ISendEmailCheckInput {
  name?: string;
  email?: string;
  verifyToken?: string;
}

export interface ILoginResponse {
  user: IUserLoginAttributes;
  token: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUserPaginateInput {
  page: number;
  limit: number;
  sortBy?: unknown;
  filterBy?: unknown;
  key?: string;
}

export interface AdminEditByIdInput {
  id: number;
  data: UserCreationAttributes;
}
export interface UserCreationAttributes {
  image_id?: number | null;
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  role_id?: number;
  password?: string;
  branch_id?: number;
}

export interface IUserFromToken {
  name: string;
  phoneNumber: string;
  email: string;
  referralCode: string;
  role: string;
  permission: string[];
}

export type CreateUserResponse = IApiResponse<UserResponseData>;
export type SendEmailVerificationResponse = IApiResponse<ISendEmailResponse>;
export type LoginResponse = IApiResponse<ILoginResponse>;
export type UserByRoleResponse = IApiResponse<UserResponseData[]>;
export type UserPaginateResponse = IApiResponse<IPaginate<UserResponseData>>;
export interface GetUserByEmailResponse extends IApiResponseStatic {
  data?: IEmailCheckResponse;
}
