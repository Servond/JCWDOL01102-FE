import { createSlice } from "@reduxjs/toolkit";

export interface IProductRequest {
  categoryId?: number;
  name?: string;
  price?: number;
  stock?: number;
  branchId?: number;
  weight?: number;
  desc?: string;
}

interface AddProductState {
  status: "idle" | "pending" | "done" | "rejected";
  error: string;
  data: IProductRequest;
  touched: {
    name: boolean;
    price: boolean;
    stock: boolean;
    branchId: boolean;
    weight: boolean;
    desc: boolean;
  };
  errors: {
    name: string | null;
    price: string | null;
    stock: string | null;
    branchId: string | null;
    weight: string | null;
    desc: string | null;
  };
  file: "string" | null;
}

const initialState: AddProductState = {
  status: "idle",
  error: "",
  touched: {
    name: false,
    price: false,
    stock: false,
    branchId: false,
    weight: false,
    desc: false,
  },
  errors: {
    name: null,
    price: null,
    stock: null,
    branchId: null,
    weight: null,
    desc: null,
  },
  file: null,
  data: {},
};

const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setCreateProduct: (state, action) => {
      state.data = action.payload;
    },
    setImageProduct: (state, action) => {
      state.file = action.payload;
    },
    touchFieldCreateProduct: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.touched[action.payload] = true;
    },
    setErrorsCreateProduct: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCreateProduct,
  setImageProduct,
  touchFieldCreateProduct,
  setErrorsCreateProduct,
} = addProductSlice.actions;

export default addProductSlice.reducer;
