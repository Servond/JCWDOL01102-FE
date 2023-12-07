import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAdminProductPage } from "../../../../../api/admin/product";
interface IPage {
  [key: string]: string | number | null | undefined;
}


export const getAdminProduct = createAsyncThunk(
  "adminGetProduct/getAdminProduct",
  async (query: IPage) => {
    const response = await fetchAdminProductPage({
      page: query.page,
      limit: query.limit,
      name: query.name,
      categoryId: query.categoryId,
      sortBy: query.sortBy,
      order: query.order,
    });

    return response.data;
  }
);

interface IProduct {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: number;
  imageId: number;
  name: string;
  price: number;
  stock: number;
  branchId: number;
  weight: number;
  desc: string;
  imageUrl: string;
}

interface IAdminGetProduct {
  status: "idle" | "pending" | "succeeded" | "rejected";
  data: {
    data: IProduct[];
    totalCount: number | null;
    pageSize: number | null;
    totalPages: number | null;
    currentPage: number | null;
    error: string | null;
  };
  totalCount: number | null;
  pageSize: number | null;
  totalPages: number | null;
  currentPage: number | null;
  error: string | null;
}

const initialState: IAdminGetProduct = {
  status: "idle",
  data: {
    data: [],
    totalCount: null,
    pageSize: null,
    totalPages: null,
    currentPage: null,
    error: null,
  },
  totalCount: null,
  pageSize: null,
  totalPages: null,
  currentPage: null,
  error: null,
};

const adminGetProductSlice = createSlice({
  name: "adminGetProduct",
  initialState,
  reducers: {
    adminGetProductPending: (state) => {
      state.status = "pending";
    },
    adminGetProductSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.pageSize = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    adminGetProductFail: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminProduct.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getAdminProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.pageSize = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(getAdminProduct.rejected, (state, action) => {
      state.status = "rejected";
      state.error = "error";
    });
  },
});

export const {
  adminGetProductPending,
  adminGetProductSuccess,
  adminGetProductFail,
} = adminGetProductSlice.actions;

export default adminGetProductSlice.reducer;
