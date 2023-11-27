import { server } from "./server";
import {
  CreateUserResponse,
  GetUserByEmailResponse,
  IEmailCheckInput,
  LoginResponse,
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
  return server.patch<IApiResponseStatic>(`api/users/verify`, {
    id: id,
  });
};

export const updateUser = (id: number, data: UserCreationAttributes) => {
  return server.put(`api/users/${id}`, data);
};

export const login = (email: string, password: string) => {
  return server.post<LoginResponse>("api/users/login", {
    email,
    password,
  });
};
