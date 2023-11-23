import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getUserById } from "../../../../api/user";

interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  image_id: string;
  name: string;
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

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IUserState {
  status: "idle" | "pending" | "done" | "rejected";
  user: IUser | null;
  error: any;
}

const initialState: IUserState = {
  status: "idle",
  user: null,
  error: {},
};

export const fetchUserById_ = createAsyncThunk(
  "user/getbyid",
  async (id: number) => {
    try {
      const res = await getUserById(id);
      return res.data?.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return Promise.reject(e.response);
      }
      return Promise.reject(e);
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
      .addCase(fetchUserById_.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const user2Reducer = user2Slice.reducer;
