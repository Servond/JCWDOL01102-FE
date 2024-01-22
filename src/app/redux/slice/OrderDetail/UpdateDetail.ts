import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../data/interfaces";
import { AxiosError } from "axios";
import { IOrderWithDetail } from "../../../../data/OrderDetail/interface";
import { updateOrderStatusUser } from "../../../../api/admin/order-management";

interface IOrderDetailState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IOrderWithDetail>;
}

const initialState: IOrderDetailState = {
  apiState: "idle",
  resp: {},
};

export const updateOrderStatusByUser = createAsyncThunk<
  IApiResponse<IOrderWithDetail>,
  number,
  { rejectValue: IApiResponse<IOrderWithDetail> }
>("orderDetailUserUpdate/put", async (orderId, thunkApi) => {
  try {
    const res = await updateOrderStatusUser(orderId, "done");
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

const updateOrderUserSlice = createSlice({
  name: "orderDetailUserUpdate",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateOrderStatusByUser.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(updateOrderStatusByUser.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(updateOrderStatusByUser.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IOrderWithDetail>;
    });
  },
});

export default updateOrderUserSlice.reducer;
