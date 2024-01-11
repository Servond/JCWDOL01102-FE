/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResponseApi } from "../../../../../data/interfaces";
import { IOrderDetail } from "../../../../../data/order/orderDetail.interface";
import { handleAsyncThunkError } from "../../../../../utils/function/errorThunkAPIHandler";
import { fetchOrderDetail } from "../../../../../api/admin/order-management";

export const getOrderDetailDashboard = createAsyncThunk(
  "orderDetail/getOrderDetailDashboard",
  async (invoiceNo: string, thunkAPI) => {
    try {
      const response = await fetchOrderDetail(invoiceNo);
      return response.data;
    } catch (error: any) {
      handleAsyncThunkError(error, thunkAPI);
    }
  }
);

interface IOrderDetailState {
  orderId?: number;
  invoiceNumber?: string;
  status: "idle" | "pending" | "done" | "rejected";
  httpStatusCode: number;
  data?: IResponseApi<IOrderDetail>;
}

const initialState: IOrderDetailState = {
  status: "idle",
  httpStatusCode: 0,
};

const orderDetailSlice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    setOrderDetail: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetailDashboard.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getOrderDetailDashboard.fulfilled, (state, action) => {
      state.status = "done";
      state.httpStatusCode = action.payload.statusCode;
      state.orderId = action.payload.data.id;
      state.invoiceNumber = action.payload.data.invoiceNo;
      state.data = action.payload;
    });
    builder.addCase(getOrderDetailDashboard.rejected, (state, action: any) => {
      state.status = "rejected";
      state.httpStatusCode = action.payload.status;
    });
  },
});

export const { setOrderDetail } = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
