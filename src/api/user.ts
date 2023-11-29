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
  verifyToken?: string
) => {
  return server.get<SendEmailVerificationResponse>("api/users/email", {
    params: {
      email,
      name,
      verifyToken,
    },
  });
};

export const verifyUserByEmail = (verifyToken: string) => {
  return server.patch<IApiResponseStatic>(`api/users/verify`, {
    verifyToken,
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
