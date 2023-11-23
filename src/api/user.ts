import { server } from "./server";
import {
  CreateUserResponse,
  GetUserByEmailResponse,
  IEmailCheckInput,
  SendEmailVerificationResponse,
  UserCreationAttributes,
} from "../data/user/interfaces";
import { IApiResponseStatic } from "../data/interfaces";

export const getUserById = (id: number) => {
  return server.get(`api/users/${id}`);
};

export const getUserByEmail = (param: IEmailCheckInput) => {
  return server.get<GetUserByEmailResponse>(`api/users`, {
    signal: param.controller.signal,
    params: {
      email: param.email,
    },
  });
};

export const postUser = (data: UserCreationAttributes) => {
  return server.post<CreateUserResponse>("api/users", data);
};

export const getEmailVerification = (
  name?: string,
  email?: string,
  id?: number
) => {
  return server.get<SendEmailVerificationResponse>("api/users/email", {
    params: {
      email,
      name,
      id,
    },
  });
};

export const verifyUserByEmail = (id: number) => {
  return server.put<IApiResponseStatic>(`api/users/${id}`, {
    isVerified: true,
  });
};
