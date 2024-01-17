import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../../data/interfaces";
import { AxiosError } from "axios";
import { IVoucherAttributes } from "../../../../../data/voucher/interface";
import { removeVoucher } from "../../../../../api/admin/discount-management";

interface ICreateDeleteState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IVoucherAttributes>;
}

export const deleteVoucher = createAsyncThunk<
  IApiResponse<IVoucherAttributes>,
  number,
  { rejectValue: IApiResponse<IVoucherAttributes> }
>("deleteVoucher/delete", async (voucherId, thunkApi) => {
  try {
    const res = await removeVoucher(voucherId);
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

const deleteVoucherSlice = createSlice({
  name: "deleteVoucher",
  initialState: {
    apiState: "idle",
    resp: {},
  } as ICreateDeleteState,
  reducers: {
    resetDeleteVoucherState: (state) => {
      state.apiState = "idle";
      state.resp = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(deleteVoucher.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(deleteVoucher.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(deleteVoucher.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IVoucherAttributes>;
    });
  },
});

export const { resetDeleteVoucherState } = deleteVoucherSlice.actions;
export default deleteVoucherSlice.reducer;
