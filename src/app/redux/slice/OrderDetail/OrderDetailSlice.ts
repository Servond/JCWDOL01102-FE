import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../data/interfaces";
import { getOrderWithDetail } from "../../../../api/order";
import { AxiosError } from "axios";
import { IOrderWithDetail } from "../../../../data/OrderDetail/interface";

interface IOrderDetailState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IOrderWithDetail>;
  orderDetail: Partial<IOrderWithDetail>;
}

const initialState: IOrderDetailState = {
  apiState: "idle",
  resp: {},
  orderDetail: {},
};

export const fetchOrderWithDetail = createAsyncThunk<
  IApiResponse<IOrderWithDetail>,
  string,
  { rejectValue: IApiResponse<IOrderWithDetail> }
>("orderDetail/get", async (invoiceNO, thunkApi) => {
  try {
    const res = await getOrderWithDetail(invoiceNO);
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

const orderDetailSLice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrderWithDetail.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
        state.orderDetail = action.payload.data as Partial<IOrderWithDetail>;
      }
    });

    builder.addCase(fetchOrderWithDetail.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchOrderWithDetail.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IOrderWithDetail>;
    });
  },
});

export default orderDetailSLice.reducer;
