import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../data/interfaces";
import { AxiosError } from "axios";
import {
  ICategoryAttributes,
  IGetCategoriesWithLimitInput,
} from "../../../../data/category/interface";
import { getCategoriesWithLimit } from "../../../../api/explore";

interface IGetCategoriesWithLimitState {
  apiState: "idle" | "pending" | "rejected" | "done";
  categories: ICategoryAttributes[];
  resp: IApiResponse<ICategoryAttributes[]>;
}

export const fetchCategoriesWithLimit = createAsyncThunk<
  IApiResponse<ICategoryAttributes[]>,
  IGetCategoriesWithLimitInput,
  { rejectValue: IApiResponse<ICategoryAttributes[]> }
>("getCategoriesWithLimit/get", async (input, thunkApi) => {
  try {
    const res = await getCategoriesWithLimit(input);
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

const getCategoriesWithLimitSlice = createSlice({
  name: "getNearestBranch",
  initialState: {
    apiState: "idle",
    categories: [],
    resp: {},
  } as IGetCategoriesWithLimitState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategoriesWithLimit.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
        state.categories = [
          {
            branchId: 0,
            id: 0,
            name: "All",
          },
          ...(action.payload as IApiResponse<ICategoryAttributes[]>).data!,
          {
            branchId: 0,
            id: 5,
            name: "More",
          },
        ];
      }
    });

    builder.addCase(fetchCategoriesWithLimit.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchCategoriesWithLimit.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<ICategoryAttributes[]>;
    });
  },
});

export default getCategoriesWithLimitSlice.reducer;
