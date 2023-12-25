import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../../data/interfaces";
import { AxiosError } from "axios";
import { removePromotion } from "../../../../../api/admin/discount-management";
import { IPromotionAttributes } from "../../../../../data/promotion/interface";

interface IDeletePromotionState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IPromotionAttributes>;
}

export const deletePromotion = createAsyncThunk<
  IApiResponse<IPromotionAttributes>,
  number,
  { rejectValue: IApiResponse<IPromotionAttributes> }
>("deletePromotion/delete", async (voucherId, thunkApi) => {
  try {
    const res = await removePromotion(voucherId);
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

const deletePromotionSlice = createSlice({
  name: "deletePromotion",
  initialState: {
    apiState: "idle",
    resp: {},
  } as IDeletePromotionState,
  reducers: {
    resetDeletePromotionState: (state) => {
      state.apiState = "idle";
      state.resp = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(deletePromotion.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(deletePromotion.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(deletePromotion.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IPromotionAttributes>;
    });
  },
});

export const { resetDeletePromotionState } = deletePromotionSlice.actions;
export default deletePromotionSlice.reducer;
