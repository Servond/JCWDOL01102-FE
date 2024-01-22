import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../data/interfaces";
import { AxiosError } from "axios";

import {
  IOrderData,
  IUpdateOrderStatusInput,
} from "../../../../data/order/OrderManagement.interface";
import { cancelOrder } from "../../../../api/admin/order-management";

interface ICancelOrderState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IOrderData>;
}

const initialState: ICancelOrderState = {
  apiState: "idle",
  resp: {},
};

export const cancelOrderById = createAsyncThunk<
  IApiResponse<IOrderData>,
  IUpdateOrderStatusInput,
  { rejectValue: IApiResponse<IOrderData> }
>("cancelOrder/put", async (param, thunkApi) => {
  try {
    const res = await cancelOrder(param.orderId, Number(param.branchId));
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

const cancelOrderUserSlice = createSlice({
  name: "cancelOrder",
  initialState,
  reducers: {
    resetCancelOrderStatusState(state) {
      state.apiState = "idle";
      state.resp = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(cancelOrderById.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(cancelOrderById.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(cancelOrderById.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IOrderData>;
    });
  },
});

export const { resetCancelOrderStatusState } = cancelOrderUserSlice.actions;
export default cancelOrderUserSlice.reducer;
