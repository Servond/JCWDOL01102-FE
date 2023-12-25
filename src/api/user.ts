import { adminServer, server } from "./server";
import {
  CreateUserResponse,
  GetUserByEmailResponse,
  IEmailCheckInput,
  LoginResponse,
  SendEmailVerificationResponse,
  UserCreationAttributes,
  UserPaginateResponse,
} from "../data/user/interfaces";
import { IApiResponseStatic } from "../data/interfaces";

export const getUserById = (id: number, token: string) => {
  return adminServer.get(`api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserByEmail = (param: IEmailCheckInput) => {
  return adminServer.get<GetUserByEmailResponse>(`api/users`, {
    signal: param.controller.signal,
    params: {
      email: param.email,
    },
  });
};

export const getUserByRolePaginate = (
  page: number,
  limit: number,
  sortBy: string | undefined,
  filterBy: number | undefined,
  key: string
) => {
  return adminServer.get<UserPaginateResponse>("api/users", {
    params: {
      page,
      limit,
      sortBy,
      filterBy,
      key: `%${key}%`,
    },
  });
};

export const postUser = (data: UserCreationAttributes) => {
  return server.post<CreateUserResponse>("api/users", data, {});
};

export const getEmailVerification = (
  name?: string,
  email?: string,
  verifyToken?: string
) => {
  return server.get<SendEmailVerificationResponse>("api/auth/email", {
    params: {
      email,
      name,
      verifyToken,
    },
  });
};

export const verifyUserByEmail = (verifyToken: string) => {
  return server.patch<IApiResponseStatic>(`api/auth/verify`, {
    verifyToken,
  });
};

export const updateUser = (id: number, data: UserCreationAttributes) => {
  return adminServer.put(`api/users/${id}`, data);
};

export const login = (email: string, password: string) => {
  return server.post<LoginResponse>("api/auth/login", {
    email,
    password,
  });
};
