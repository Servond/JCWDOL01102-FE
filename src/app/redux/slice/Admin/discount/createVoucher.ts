import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../../data/interfaces";
import { AxiosError } from "axios";
import {
  IVoucherAttributes,
  VoucherPromotionInput,
} from "../../../../../data/voucher/interface";
import { postVoucher } from "../../../../../api/admin/discount-management";

interface ICreateVoucherState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IVoucherAttributes>;
}

export const createVoucher = createAsyncThunk<
  IApiResponse<IVoucherAttributes>,
  VoucherPromotionInput,
  { rejectValue: IApiResponse<IVoucherAttributes> }
>("createVoucher/post", async (input, thunkApi) => {
  try {
    const res = await postVoucher(input.voucher, input.productId);
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

const createVoucherSlice = createSlice({
  name: "getProductByBranchSlice",
  initialState: {
    apiState: "idle",
    resp: {},
  } as ICreateVoucherState,
  reducers: {
    resetCreateVoucherState: (state) => {
      state.apiState = "idle";
      state.resp = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(createVoucher.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(createVoucher.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(createVoucher.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IVoucherAttributes>;
    });
  },
});

export const { resetCreateVoucherState } = createVoucherSlice.actions;
export default createVoucherSlice.reducer;
