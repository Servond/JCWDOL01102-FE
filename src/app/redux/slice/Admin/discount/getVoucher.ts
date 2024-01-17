import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPaginate } from "../../../../../data/interfaces";
import { AxiosError } from "axios";

import { getVoucherPaginate } from "../../../../../api/admin/discount-management";
import { IUserPaginateInput } from "../../../../../data/user/interfaces";
import {
  IVoucherAttributes,
  VoucherPaginateResponse,
} from "../../../../../data/voucher/interface";

interface IPaginateVoucherState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: VoucherPaginateResponse;
  vouchers: IVoucherAttributes[];
  pageSize: number;
  totalPages: number;
  currentPages: number;
  sortBy: string;
  filterBy: string;
  keySearch: string;
}

export const fetchVoucherPaginate = createAsyncThunk<
  VoucherPaginateResponse,
  IUserPaginateInput,
  { rejectValue: VoucherPaginateResponse }
>("paginateVoucher/get", async (input, thunkApi) => {
  try {
    const res = await getVoucherPaginate(
      input.page,
      input.limit,
      String(input.sortBy),
      String(input.filterBy),
      input.key!
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

const getVoucherSlice = createSlice({
  name: "paginateVoucher",
  initialState: {
    apiState: "idle",
    resp: {},
    vouchers: [],
    pageSize: 0,
    totalPages: 0,
    currentPages: 1,
    sortBy: "",
    filterBy: "",
    keySearch: "",
  } as IPaginateVoucherState,
  reducers: {
    setVoucherKeySearch: (state, action) => {
      state.keySearch = action.payload;
    },
    setVoucherSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setVoucherFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    resetVoucherPagination: (state) => {
      state.apiState = "idle";
      state.resp = {};
      state.vouchers = [];
      state.pageSize = 0;
      state.totalPages = 0;
      state.currentPages = 1;
      state.keySearch = "";
      state.sortBy = "";
      state.filterBy = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchVoucherPaginate.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.resp = action.payload;
        state.vouchers = (
          action.payload.data! as IPaginate<IVoucherAttributes>
        ).data;
        state.pageSize = (
          action.payload.data! as IPaginate<IVoucherAttributes>
        ).pageSize;
        state.currentPages = (
          action.payload.data! as IPaginate<IVoucherAttributes>
        ).currentPage;
        state.totalPages = (
          action.payload.data! as IPaginate<IVoucherAttributes>
        ).totalPages;
        state.currentPages = (
          action.payload.data! as IPaginate<IVoucherAttributes>
        ).currentPage;
        state.apiState = "done";
      }
    });

    builder.addCase(fetchVoucherPaginate.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchVoucherPaginate.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

// export const { setVoucherKeySearch, setVoucherSortBy, setVoucherFilterBy } =
//   getVoucherSlice.actions;
export const {
  setVoucherKeySearch,
  setVoucherSortBy,
  setVoucherFilterBy,
  resetVoucherPagination,
} = getVoucherSlice.actions;

export default getVoucherSlice.reducer;
