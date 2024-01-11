import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  ICartAttributes,
  GetCartResponse,
  ICartEditAttributes,
} from "../../../../data/cart/interface";
import { getCart } from "../../../../api/cart";

interface IGetCartState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: GetCartResponse;
  cart: ICartAttributes[];
}

export const fetchProductCart = createAsyncThunk<
  GetCartResponse,
  ICartEditAttributes,
  { rejectValue: GetCartResponse }
>("getCart/get", async (input, thunkApi) => {
  try {
    const res = await getCart(input);
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

const fetchProductCartSlice = createSlice({
  name: "getCart",
  initialState: {
    apiState: "idle",
    resp: {},
    cart: [],
  } as IGetCartState,
  reducers: {
    setCartItemQuantity(state, action) {
      const index = state.cart.findIndex(
        (prod) => prod.id === action.payload.id
      );
      state.cart[index].qty = action.payload.qty;
    },
    deleteCartItem(state, action) {
      const index = state.cart.findIndex(
        (prod) => prod.id === action.payload.id
      );
      state.cart.splice(index, 1);
    },
    addCartItem(state, action) {
      state.cart.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProductCart.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
        state.cart = action.payload.data as ICartAttributes[];
      }
    });

    builder.addCase(fetchProductCart.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchProductCart.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as GetCartResponse;
    });
  },
});

export default fetchProductCartSlice.reducer;
export const { setCartItemQuantity, deleteCartItem, addCartItem } =
  fetchProductCartSlice.actions;
