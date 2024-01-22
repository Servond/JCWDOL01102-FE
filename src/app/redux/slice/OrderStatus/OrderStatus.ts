import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../data/interfaces";
import { AxiosError } from "axios";

import {
  IOrderData,
  IUpdateOrderStatusInput,
} from "../../../../data/order/OrderManagement.interface";
import { updateOrderStatusUser } from "../../../../api/admin/order-management";

interface IOrderDetailState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IOrderData>;
}

const initialState: IOrderDetailState = {
  apiState: "idle",
  resp: {},
};

export const updateOrderStatusById = createAsyncThunk<
  IApiResponse<IOrderData>,
  IUpdateOrderStatusInput,
  { rejectValue: IApiResponse<IOrderData> }
>("updateOrderStatus/put", async (param, thunkApi) => {
  try {
    const res = await updateOrderStatusUser(param.orderId, param.status);
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

const updateOrderStatusSlice = createSlice({
  name: "updateOrderStatus",
  initialState,
  reducers: {
    resetUpdateOrderStatusState(state) {
      state.apiState = "idle";
      state.resp = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(updateOrderStatusById.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(updateOrderStatusById.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(updateOrderStatusById.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IOrderData>;
    });
  },
});

export const { resetUpdateOrderStatusState } = updateOrderStatusSlice.actions;
export default updateOrderStatusSlice.reducer;
