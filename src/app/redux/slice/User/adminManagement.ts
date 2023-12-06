import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IUserPaginateInput,
  UserPaginateResponse,
  UserResponseData,
} from "../../../../data/user/interfaces";
import { getUserByRolePaginate } from "../../../../api/user";
import { AxiosError } from "axios";
import { IPaginate } from "../../../../data/interfaces";

interface IAdminManagementState {
  adminTotal: number;
  pageSize: number;
  totalPages: number;
  currentPages: number;
  apiState: "idle" | "pending" | "done" | "rejected";
  admins: UserResponseData[];
  resp: UserPaginateResponse;
}

export const fetchAdminPaginate = createAsyncThunk<
  UserPaginateResponse,
  IUserPaginateInput,
  { rejectValue: UserPaginateResponse }
>("adminManagement/paginate", async (payload, thunkApi) => {
  try {
    const res = await getUserByRolePaginate(payload.page, payload.limit);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.data.message,
      });
    }
    return thunkApi.rejectWithValue(e as UserPaginateResponse);
  }
});

const adminManagementSlice = createSlice({
  name: "adminManagement",
  initialState: {
    adminTotal: 0,
    pageSize: 0,
    totalPages: 0,
    currentPages: 1,
    admins: [],
    resp: {},
    apiState: "idle",
  } as IAdminManagementState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAdminPaginate.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.adminTotal = (
          action.payload.data! as IPaginate<UserResponseData>
        ).totalCount;
        state.pageSize = (
          action.payload.data! as IPaginate<UserResponseData>
        ).pageSize;
        state.totalPages = (
          action.payload.data! as IPaginate<UserResponseData>
        ).totalPages;
        state.currentPages = (
          action.payload.data! as IPaginate<UserResponseData>
        ).currentPage;
        state.admins = (
          action.payload.data! as IPaginate<UserResponseData>
        ).data;
        state.apiState = "done";
      }
    });

    builder.addCase(fetchAdminPaginate.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchAdminPaginate.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

export default adminManagementSlice.reducer;
