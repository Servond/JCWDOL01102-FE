import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse, IPaginate } from "../../../../../data/interfaces";
import { AxiosError } from "axios";
import { IVoucherAttributes } from "../../../../../data/voucher/interface";
import { getVoucherPaginate } from "../../../../../api/admin/voucher-manegement";
import { IUserPaginateInput } from "../../../../../data/user/interfaces";

interface IPaginateVoucherState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IPaginate<IVoucherAttributes>>;
  vouchers: IVoucherAttributes[];
  pageSize: number;
  totalPages: number;
  currentPages: number;
  sortBy: string;
  filterBy: number;
  keySearch: string;
}

export const fetchVoucherPaginate = createAsyncThunk<
  IApiResponse<IPaginate<IVoucherAttributes>>,
  IUserPaginateInput,
  { rejectValue: IApiResponse<IPaginate<IVoucherAttributes>> }
>("paginateVoucher/get", async (input, thunkApi) => {
  try {
    const res = await getVoucherPaginate(
      input.page,
      input.limit,
      String(input.sortBy),
      Number(input.filterBy),
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

const createVoucherSlice = createSlice({
  name: "getProductByBranchSlice",
  initialState: {
    apiState: "idle",
    resp: {},
    vouchers: [],
    pageSize: 0,
    totalPages: 0,
    currentPages: 1,
    sortBy: "",
    filterBy: 0,
    keySearch: "",

  } as IPaginateVoucherState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchVoucherPaginate.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.resp = action.payload;
        state.vouchers = (
          action.payload.data! as IPaginate<IVoucherAttributes>
        ).data;
        state.apiState = "done";
      }
    });

    builder.addCase(fetchVoucherPaginate.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchVoucherPaginate.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

export default createVoucherSlice.reducer;
