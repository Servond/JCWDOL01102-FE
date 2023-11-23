import { IApiResponse, IApiResponseStatic } from "../interfaces";

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
  is_deleted: boolean;
  is_verified: boolean;
  reset_password_token?: string;
  verify_token?: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
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
  id?: number;
}

export interface UserCreationAttributes {
  image_id?: number | null;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  role_id: number;
  password: string;
}

export type CreateUserResponse = IApiResponse<UserResponseData>;
export type SendEmailVerificationResponse = IApiResponse<ISendEmailResponse>;

export interface GetUserByEmailResponse extends IApiResponseStatic {
  data?: IEmailCheckResponse;
}
