import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  IManageCartInput,
  ManageCartResponse,
} from "../../../../data/cart/interface";
import { manageCart } from "../../../../api/cart";

interface IManageCartState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: ManageCartResponse;
}

export const manageProductCart = createAsyncThunk<
  ManageCartResponse,
  IManageCartInput,
  { rejectValue: ManageCartResponse }
>("manageCart/post", async (input, thunkApi) => {
  try {
    const res = await manageCart(input);
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

const manageProductCartSlice = createSlice({
  name: "manageCart",
  initialState: {
    apiState: "idle",
    resp: {},
  } as IManageCartState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(manageProductCart.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(manageProductCart.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(manageProductCart.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as ManageCartResponse;
    });
  },
});

export default manageProductCartSlice.reducer;
