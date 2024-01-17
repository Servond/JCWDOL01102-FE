import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IUserPaginateInput,
  UserPaginateResponse,
  UserResponseData,
} from "../../../../../data/user/interfaces";
import { getUserByRolePaginate } from "../../../../../api/user";
import { AxiosError } from "axios";
import { IPaginate } from "../../../../../data/interfaces";

interface IAdminManagementState {
  adminTotal: number;
  pageSize: number;
  totalPages: number;
  currentPages: number;
  sortBy: string;
  filterBy: number;
  keySearch: string;
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
    const res = await getUserByRolePaginate(
      payload.page,
      payload.limit,
      String(payload.sortBy),
      Number(payload.filterBy),
      payload.key!
    );
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response) {
        return thunkApi.rejectWithValue({
          statusCode: e.response?.status,
          message: e.response?.data.message,
        });
      } else if (e.request) {
        return thunkApi.rejectWithValue({
          statusCode: 500,
          message: e.code,
        });
      }
    }
    return thunkApi.rejectWithValue({
      statusCode: 500,
      message: (e as Error).message,
    });
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
    sortBy: "",
    filterBy: 0,
    keySearch: "",
  } as IAdminManagementState,
  reducers: {
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setKeySearch: (state, action) => {
      state.keySearch = action.payload;
    },
    resetUserPagination: (state) => {
      state.adminTotal = 0;
      state.pageSize = 0;
      state.totalPages = 0;
      state.currentPages = 1;
      state.admins = [];
      state.resp = {};
      state.apiState = "idle";
      state.sortBy = "";
      state.filterBy = 0;
      state.keySearch = "";
    },
  },
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

export const { setFilterBy, setSortBy, setKeySearch, resetUserPagination } =
  adminManagementSlice.actions;
export default adminManagementSlice.reducer;
