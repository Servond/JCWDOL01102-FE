import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../data/interfaces";
import { AxiosError } from "axios";
import { getLandingpageCetgory } from "../../../../api/landingPage";
import { ICategoryAttributes } from "../../../../data/category/interface";

interface IGetLandingpageCategoriesState {
  apiState: "idle" | "pending" | "rejected" | "done";
  categories: ICategoryAttributes[];
  resp: IApiResponse<ICategoryAttributes[]>;
}

export const fetchLandingpageCategories = createAsyncThunk<
  IApiResponse<ICategoryAttributes[]>,
  number,
  { rejectValue: IApiResponse<ICategoryAttributes[]> }
>("getLandingpageCategories/get", async (branchId, thunkApi) => {
  try {
    const res = await getLandingpageCetgory(branchId);
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

const getLandingpageCategoriesSlice = createSlice({
  name: "getNearestBranch",
  initialState: {
    apiState: "idle",
    categories: [],
    resp: {},
  } as IGetLandingpageCategoriesState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLandingpageCategories.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
        state.categories = (
          action.payload as IApiResponse<ICategoryAttributes[]>
        ).data!;
      }
    });

    builder.addCase(fetchLandingpageCategories.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchLandingpageCategories.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<ICategoryAttributes[]>;
    });
  },
});

export default getLandingpageCategoriesSlice.reducer;
