import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPaginate } from "../../../../../data/interfaces";
import { AxiosError } from "axios";
import { getPromoPaginate } from "../../../../../api/admin/discount-management";
import { IUserPaginateInput } from "../../../../../data/user/interfaces";
import {
  IPromotionPaginateAttributes,
  PromotionPaginateResponse,
} from "../../../../../data/promotion/interface";

interface IPaginateProimotionState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: PromotionPaginateResponse;
  promotions: IPromotionPaginateAttributes[];
  pageSize: number;
  totalPages: number;
  currentPages: number;
  sortBy: string;
  filterBy: string;
  keySearch: string;
}

export const fetchPromotionPaginate = createAsyncThunk<
  PromotionPaginateResponse,
  IUserPaginateInput,
  { rejectValue: PromotionPaginateResponse }
>("paginatePromotion/get", async (input, thunkApi) => {
  try {
    const res = await getPromoPaginate(
      input.page,
      input.limit,
      String(input.sortBy),
      String(input.filterBy),
      input.key!
    );
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

const getPromotionSlice = createSlice({
  name: "paginatePromotion",
  initialState: {
    apiState: "idle",
    resp: {},
    promotions: [],
    pageSize: 0,
    totalPages: 0,
    currentPages: 1,
    sortBy: "",
    filterBy: "",
    keySearch: "",
  } as IPaginateProimotionState,
  reducers: {
    setPromotionKeySearch: (state, action) => {
      console.log("here");
      state.keySearch = action.payload;
    },
    setPromotionSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPromotionFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    resetPromotionPagination: (state) => {
      state.apiState = "idle";
      state.resp = {};
      state.promotions = [];
      state.pageSize = 0;
      state.totalPages = 0;
      state.currentPages = 1;
      state.keySearch = "";
      state.sortBy = "";
      state.filterBy = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPromotionPaginate.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.resp = action.payload;
        state.promotions = (
          action.payload.data! as IPaginate<IPromotionPaginateAttributes>
        ).data;
        state.pageSize = (
          action.payload.data! as IPaginate<IPromotionPaginateAttributes>
        ).pageSize;
        state.currentPages = (
          action.payload.data! as IPaginate<IPromotionPaginateAttributes>
        ).currentPage;
        state.totalPages = (
          action.payload.data! as IPaginate<IPromotionPaginateAttributes>
        ).totalPages;
        state.currentPages = (
          action.payload.data! as IPaginate<IPromotionPaginateAttributes>
        ).currentPage;
        state.apiState = "done";
      }
    });

    builder.addCase(fetchPromotionPaginate.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchPromotionPaginate.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

// export const { setVoucherKeySearch, setVoucherSortBy, setVoucherFilterBy } =
//   getVoucherSlice.actions;
export const {
  setPromotionKeySearch,
  setPromotionSortBy,
  setPromotionFilterBy,
  resetPromotionPagination,
} = getPromotionSlice.actions;

export default getPromotionSlice.reducer;
