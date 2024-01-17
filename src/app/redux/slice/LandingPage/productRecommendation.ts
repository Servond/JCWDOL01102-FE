import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getProductRecommendation } from "../../../../api/landingPage";
import {
  IProductLandingPage,
  ProductRecommendationResponse,
} from "../../../../data/product/interface";

interface IGetNearestBranchState {
  apiState: "idle" | "pending" | "rejected" | "done";
  products: IProductLandingPage[];
  resp: ProductRecommendationResponse;
}

export const fetchProductRecommendation = createAsyncThunk<
  ProductRecommendationResponse,
  number,
  { rejectValue: ProductRecommendationResponse }
>("getProductRecommendation/get", async (brancId, thunkApi) => {
  try {
    const res = await getProductRecommendation(brancId);
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

const getProductRecommendationSlice = createSlice({
  name: "getProductRecommendation",
  initialState: {
    apiState: "idle",
    products: {},
    resp: {},
  } as IGetNearestBranchState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductRecommendation.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
        state.products = (
          action.payload as ProductRecommendationResponse
        ).data!;
      }
    });

    builder.addCase(fetchProductRecommendation.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchProductRecommendation.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as ProductRecommendationResponse;
    });
  },
});

export default getProductRecommendationSlice.reducer;
