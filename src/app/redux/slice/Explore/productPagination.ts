import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ILandingpageProductInput,
  IProductLandingPage,
  LandingpageProductResponse,
} from "../../../../data/product/interface";
import { IPaginate } from "../../../../data/interfaces";

import { AxiosError } from "axios";
import { getExploreProductPaginate } from "../../../../api/explore";

interface ILandingpageProductState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: LandingpageProductResponse;
  products: IProductLandingPage[];
  pageSize: number;
  totalPages: number;
  currentPages: number;
  sortBy: string;
  order: string;
  filterBy: string;
  name: string;
}

export const fetchLandingpageProduct = createAsyncThunk<
  LandingpageProductResponse,
  ILandingpageProductInput,
  { rejectValue: LandingpageProductResponse }
>("paginatePromotion/get", async (input, thunkApi) => {
  try {
    const res = await getExploreProductPaginate(input);
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

const getLandingpageProductSlice = createSlice({
  name: "landingpageProduct/get",
  initialState: {
    apiState: "idle",
    resp: {},
    products: [],
    pageSize: 0,
    totalPages: 0,
    currentPages: 1,
    sortBy: "id",
    order: "asc",
    filterBy: "",
    name: "",
  } as ILandingpageProductState,
  reducers: {
    setLandingpageProductNameSearch: (state, action) => {
      state.name = action.payload;
    },
    setLandingpageProductSortBy: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
    setLandingpageProductFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    resetLandingpageProductPagination: (state) => {
      state.apiState = "idle";
      state.resp = {} as LandingpageProductResponse;
      state.products = [];
      state.pageSize = 0;
      state.totalPages = 0;
      state.currentPages = 1;
      state.name = "";
      state.sortBy = "id";
      state.filterBy = "";
      state.order = "asc";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLandingpageProduct.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.resp = action.payload;
        state.products = (
          action.payload.data! as IPaginate<IProductLandingPage>
        ).data;
        state.pageSize = (
          action.payload.data! as IPaginate<IProductLandingPage>
        ).pageSize;
        state.currentPages = (
          action.payload.data! as IPaginate<IProductLandingPage>
        ).currentPage;
        state.totalPages = (
          action.payload.data! as IPaginate<IProductLandingPage>
        ).totalPages;
        state.currentPages = (
          action.payload.data! as IPaginate<IProductLandingPage>
        ).currentPage;
        state.apiState = "done";
      }
    });

    builder.addCase(fetchLandingpageProduct.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchLandingpageProduct.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

export const {
  setLandingpageProductNameSearch,
  setLandingpageProductSortBy,
  setLandingpageProductFilterBy,
  resetLandingpageProductPagination,
} = getLandingpageProductSlice.actions;

export default getLandingpageProductSlice.reducer;
