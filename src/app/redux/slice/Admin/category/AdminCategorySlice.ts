import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCategory,
  fetchCategoryPage,
} from "../../../../../api/admin/category";
import { IPage, IQuery } from "../../../../../data/interfaces";

export const getCategory = createAsyncThunk(
  "adminCategory/getCategory",
  async () => {
    const response = await fetchCategory();
    return response.data;
  }
);

export const getCategoryPage = createAsyncThunk(
  "adminCategory/getCategoryPage",
  async (query: IQuery) => {
    const response = await fetchCategoryPage(query);
    return response.data;
  }
);

interface ICategory {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  branchId: number;
  totalProduct?: number;
}

interface IAdminCategory {
  status: "idle" | "pending" | "succeeded" | "rejected";
  data: ICategory[];
  pageData?: IPage<ICategory>;
  error: string | null;
}

const initialState: IAdminCategory = {
  status: "idle",
  data: [],
  error: null,
};

export const adminCategorySlice = createSlice({
  name: "adminCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message!;
    });
    builder.addCase(getCategoryPage.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getCategoryPage.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.pageData = action.payload.data;
    });
    builder.addCase(getCategoryPage.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message!;
    });
  },
});

export default adminCategorySlice.reducer;
