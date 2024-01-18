/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../../../../api/user";

export interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  image_id: string;
  name: string;
  gender: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  referralCode: string;
  role_id: number;
  birthdate: string;
  isDeleted: boolean;
  isVerified: boolean;
  resetPasswordToken: string;
  verifyToken: string;
}

export interface IErrorResponse {
  status: number;
  data: any;
  statusText: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IUserState {
  status: "idle" | "pending" | "done" | "rejected";
  user: IUser | null | IErrorResponse;
  statusCode?: number;
  error: any;
}

const initialState: IUserState = {
  status: "idle",
  user: null,
  statusCode: undefined,
  error: {},
};
interface IFetchUserById {
  id: number;
}

export const fetchUserById_ = createAsyncThunk(
  "user/getbyid",
  async (input: IFetchUserById) => {
    try {
      const res = await getUserById(input.id);
      return res.data?.data;
    } catch (e: any) {
      return e?.response;
    }
  }
);

const user2Slice = createSlice({
  name: "user2",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById_.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUserById_.fulfilled, (state, action) => {
        state.status = "done";
        state.user = action.payload;
      })
      .addCase(fetchUserById_.rejected, (state, action: any) => {
        if (action.payload === undefined) {
          state.statusCode = 500;
        }
        if (action.payload?.status === 404) {
          state.statusCode = 404;
        }
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const user2Reducer = user2Slice.reducer;
