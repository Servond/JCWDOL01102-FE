/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDataOrder, IOrderSlice } from "../../../../data/order/interface";
import { getMultipleProductApi } from "../../../../api/product";

export const fetchOrderProduct = createAsyncThunk(
  "order/fetchOrderProduct",
  async (productId: string, thunkAPI) => {
    try {
      const response = await getMultipleProductApi(productId);
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        thunkAPI.rejectWithValue({
          error: error.response.data,
          status: error.response.status,
        });
      } else if (error.request) {
        thunkAPI.rejectWithValue({
          error: "No response received from the server",
          status: 500,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        thunkAPI.rejectWithValue({
          error: "An error occurred while setting up the request",
          status: 500,
        });
      }
    }
  }
);

const initialState: IOrderSlice = {
  courier: null,
  cart: [],
  promotion: [],
  branchId: 1,
  isOpenDrawer: false,
  dataOrder: {
    userId: 1,
    branchId: 1,
    origin: 1,
    destination: 2,
    courier: {
      code: "-",
      name: "-",
      etd: "-",
      image: "-",
      price: 0,
      shipper: "-",
    },
  },
  products: [],
  statusCode: 0,
  statusFetchProduct: "idle",
  paymentCode: "",
  productAmount: 0,
  shippingAmount: 0,
  cutPrice: 0,
  totalAmount: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCourier: (state, action) => {
      state.courier = action.payload;
    },
    setIsOpenDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
    setPaymentCode: (state, action) => {
      state.paymentCode = action.payload;
    },
    setDataOrder: (
      state,
      action: {
        payload: IDataOrder;
      }
    ) => {
      state.dataOrder = {
        ...state.dataOrder,
        ...action.payload,
      };
    },
    setProductAmount: (state, action) => {
      state.productAmount = action.payload;
    },
    setShippingAmount: (state, action) => {
      state.shippingAmount = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
      state.dataOrder = {
        ...state.dataOrder,
        totalAmount: action.payload,
      };
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setPromotion: (state, action) => {
      state.promotion = action.payload;
    },
    setCutPrice: (state, action) => {
      state.cutPrice = action.payload;
    },
    clearCourier(state) {
      state.courier = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderProduct.pending, (state) => {
      state.statusFetchProduct = "pending";
    });
    builder.addCase(fetchOrderProduct.fulfilled, (state, action) => {
      state.statusFetchProduct = "done";
      state.products = action.payload!;
    });
    builder.addCase(fetchOrderProduct.rejected, (state, action) => {
      state.statusFetchProduct = "rejected";
      state.statusCode = (action.payload as any).status;
    });
  },
});

export const {
  setCourier,
  setIsOpenDrawer,
  setPaymentCode,
  setDataOrder,
  setProductAmount,
  setShippingAmount,
  setTotalAmount,
  setCart,
  setPromotion,
  setCutPrice,
  clearCourier,
} = orderSlice.actions;

export default orderSlice.reducer;
