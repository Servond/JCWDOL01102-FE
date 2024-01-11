/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IOrderData,
  IOrderManagementResponse,
} from "../../../../../data/order/OrderManagement.interface";
import { IQuery } from "../../../../../data/interfaces";
import { fetchOrderManagement } from "../../../../../api/admin/order-management";
import { handleAsyncThunkError } from "../../../../../utils/function/errorThunkAPIHandler";

export const getOrderManagement = createAsyncThunk(
  "orderManagement/getOrderManagement",
  async (query: IQuery, thunkAPI) => {
    try {
      const response = await fetchOrderManagement(query);
      return response.data;
    } catch (error: any) {
      handleAsyncThunkError(error, thunkAPI);
    }
  }
);

interface IOrdermanagementState {
  orderTotal: number;
  pageSize: number;
  totalPages: number;
  currentPages: number;
  sortBy: string;
  filterBy: number;
  keySearch: string;
  apiState: "idle" | "pending" | "done" | "rejected";
  orders: IOrderData[];
  resp: IOrderManagementResponse;
}

const initialState: IOrdermanagementState = {
  orderTotal: 0,
  pageSize: 0,
  totalPages: 0,
  currentPages: 1,
  sortBy: "",
  filterBy: 0,
  keySearch: "",
  apiState: "idle",
  orders: [],
  resp: {} as IOrderManagementResponse,
};

const orderManagementSlice = createSlice({
  name: "orderManagement",
  initialState,
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
    resetOrderPagination: (state) => {
      state.orderTotal = 0;
      state.pageSize = 0;
      state.totalPages = 0;
      state.currentPages = 1;
      state.orders = [];
      state.resp = {} as IOrderManagementResponse;
      state.apiState = "idle";
      state.sortBy = "";
      state.filterBy = 0;
      state.keySearch = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderManagement.pending, (state) => {
        state.apiState = "pending";
      })
      .addCase(getOrderManagement.fulfilled, (state, action) => {
        state.apiState = "done";
        state.resp = action.payload;
        state.orders = action.payload.data.data;
        state.orderTotal = action.payload.data.totalCount;
        state.pageSize = action.payload.data.pageSize;
        state.totalPages = action.payload.data.totalPages;
        state.currentPages = action.payload.data.currentPage;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(getOrderManagement.rejected, (state, _) => {
        state.apiState = "rejected";
      });
  },
});

export const { setFilterBy, setSortBy, setKeySearch, resetOrderPagination } =
  orderManagementSlice.actions;

export default orderManagementSlice.reducer;
