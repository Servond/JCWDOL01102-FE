import { server } from "./server";
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
import { generateAuthToken } from "../utils/function/generateAuthToken";
import { getToken } from "./admin/product";

export const getUserById = (id: number, token: string) => {
  return server.get(`api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserByEmail = (param: IEmailCheckInput) => {
  return server.get<GetUserByEmailResponse>(`api/users`, {
    signal: param.controller.signal,
    params: {
      email: param.email,
    },
    headers: {
      Authorization: generateAuthToken(localStorage.getItem("token")),
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
  return server.get<UserPaginateResponse>("api/users", {
    headers: {
      Authorization: getToken(),
    },
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
  return server.post<CreateUserResponse>("api/users", data, {
    headers: {
      Authorization: getToken(),
    },
  });
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
    headers: {
      Authorization: getToken(),
    },
  });
};

export const verifyUserByEmail = (verifyToken: string) => {
  return server.patch<IApiResponseStatic>(
    `api/users/verify`,
    {
      verifyToken,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateUser = (id: number, data: UserCreationAttributes) => {
  return server.put(`api/users/${id}`, data, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const login = (email: string, password: string) => {
  return server.post<LoginResponse>(
    "api/users/login",
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};
