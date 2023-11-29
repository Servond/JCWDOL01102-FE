import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../../../../../api/admin/category";

export const getCategory = createAsyncThunk(
  "adminCategory/getCategory",
  async () => {
    const response = await fetchCategory();
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
}

interface IAdminCategory {
  status: "idle" | "pending" | "succeeded" | "rejected";
  data: ICategory[];
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
  },
});

export default adminCategorySlice.reducer;
