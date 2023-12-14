import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse, IProduct } from "../../../../../data/interfaces";
import { fetchAllProductByBranch } from "../../../../../api/admin/product";
import { AxiosError } from "axios";

interface IGetProductByBranchState {
  apiState: "idle" | "pending" | "rejected" | "done";
  products: IProduct[];
  resp: IApiResponse<IProduct[]>;
}

export const getProductByBranch = createAsyncThunk<
  IApiResponse<IProduct[]>,
  undefined,
  { rejectValue: IApiResponse<IProduct[]> }
>("getProductByBranch/get", async (_, thunkApi) => {
  try {
    const res = await fetchAllProductByBranch();
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

const getProductByBranchSlice = createSlice({
  name: "getProductByBranchSlice",
  initialState: {
    apiState: "idle",
    products: [],
    resp: {},
  } as IGetProductByBranchState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProductByBranch.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.products = action.payload.data as IProduct[];
        state.products;
        state.resp = action.payload;
        state.apiState = "done";
      }
    });

    builder.addCase(getProductByBranch.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(getProductByBranch.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IProduct[]>;
    });
  },
});

export default getProductByBranchSlice.reducer;
