import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../../data/interfaces";
import { AxiosError } from "axios";
import { IVoucherAttributes } from "../../../../../data/voucher/interface";
import { postPromotion } from "../../../../../api/admin/discount-management";
import {
  IPromotionAttributes,
  PromotionCreationAttributes,
} from "../../../../../data/promotion/interface";

interface ICreatePromotionState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IPromotionAttributes>;
}

export const createPromotion = createAsyncThunk<
  IApiResponse<IPromotionAttributes>,
  PromotionCreationAttributes,
  { rejectValue: IApiResponse<IVoucherAttributes> }
>("createVoucher/post", async (input, thunkApi) => {
  try {
    const res = await postPromotion(input);
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

const createPromotionSlice = createSlice({
  name: "getProductByBranchSlice",
  initialState: {
    apiState: "idle",
    products: [],
    resp: {},
  } as ICreatePromotionState,
  reducers: {
    resetCreatePromotionState: (state) => {
      state.apiState = "idle";
      state.resp = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(createPromotion.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(createPromotion.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(createPromotion.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IPromotionAttributes>;
    });
  },
});

export const { resetCreatePromotionState } = createPromotionSlice.actions;
export default createPromotionSlice.reducer;
