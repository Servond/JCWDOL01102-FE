import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { manageProductVoucher } from "../../../../../api/admin/discount-management";
import { IApiResponseStatic } from "../../../../../data/interfaces";
import { IManageProductVoucherInput } from "../../../../../data/voucher/interface";
import { AxiosError } from "axios";

interface IManageProductVoucherState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponseStatic;
  checkboxValue: string[];
}

export const manageProductVoucherData = createAsyncThunk<
  IApiResponseStatic,
  IManageProductVoucherInput,
  { rejectValue: IApiResponseStatic }
>("manageProductVoucher/post", async (input, thunkApi) => {
  try {
    const res = await manageProductVoucher(input.voucherId, input.data);
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

const manageProductVoucherSlice = createSlice({
  name: "manageProductVoucher",
  initialState: {
    apiState: "idle",
    resp: {},
    checkboxValue: [],
  } as IManageProductVoucherState,
  reducers: {
    resetManageProductState: (state) => {
      state.resp = {};
      state.apiState = "idle";
    },
    setCheckboxValue: (state, action) => {
      state.checkboxValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(manageProductVoucherData.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.resp = action.payload;
        state.apiState = "done";
      }
    });

    builder.addCase(manageProductVoucherData.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(manageProductVoucherData.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

export const { resetManageProductState, setCheckboxValue } =
  manageProductVoucherSlice.actions;
export default manageProductVoucherSlice.reducer;
