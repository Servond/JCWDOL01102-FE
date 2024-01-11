import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  ICartAttributes,
  ManageCartResponse,
} from "../../../../data/cart/interface";
import { clearCart } from "../../../../api/cart";

interface IClearCartState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: ManageCartResponse;
}

export const ClearProductCart = createAsyncThunk<
  ManageCartResponse,
  ICartAttributes[],
  { rejectValue: ManageCartResponse }
>("clearCart/post", async (input, thunkApi) => {
  try {
    const res = await clearCart(input);
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

const ClearProductCartSlice = createSlice({
  name: "getCart",
  initialState: {
    apiState: "idle",
    resp: {},
  } as IClearCartState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(ClearProductCart.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(ClearProductCart.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(ClearProductCart.rejected, (state) => {
      state.apiState = "rejected";
    });
  },
});

export default ClearProductCartSlice.reducer;
