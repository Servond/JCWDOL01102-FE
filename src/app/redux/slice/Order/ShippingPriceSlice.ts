/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IReqCourierPrice, getCourierPrice } from "../../../../api/order";
import { handleAsyncThunkError } from "../../../../utils/function/errorThunkAPIHandler";

export const fetchJnePrice = createAsyncThunk(
  "shippingPrice/fetchJnePrice",
  async (data: IReqCourierPrice, thunkAPI) => {
    try {
      const response = await getCourierPrice({
        ...data,
        courier: "jne",
      });
      return response.data.data;
    } catch (error: any) {
      handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export const fetchTikiPrice = createAsyncThunk(
  "shippingPrice/fetchTikiPrice",
  async (data: IReqCourierPrice, thunkAPI) => {
    try {
      const response = await getCourierPrice({
        ...data,
        courier: "tiki",
      });
      return response.data.data;
    } catch (error: any) {
      handleAsyncThunkError(error, thunkAPI);
    }
  }
);

export const fetchPosPrice = createAsyncThunk(
  "shippingPrice/fetchPosPrice",
  async (data: IReqCourierPrice, thunkAPI) => {
    try {
      const response = await getCourierPrice({
        ...data,
        courier: "pos",
      });
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

interface ICourierPrice {
  service: string;
  description: string;
  cost: {
    value: number;
    etd: string;
    note: string;
  }[];
}

interface IInitialState {
  jneData: ICourierPrice[];
  tikiData: ICourierPrice[];
  posData: ICourierPrice[];
  statusJne: "idle" | "pending" | "done" | "rejected";
  statusTiki: "idle" | "pending" | "done" | "rejected";
  statusPos: "idle" | "pending" | "done" | "rejected";
  errorJne: AxiosError | undefined;
  errorTiki: AxiosError | undefined;
  errorPos: AxiosError | undefined;
}

const initialState: IInitialState = {
  jneData: [],
  tikiData: [],
  posData: [],
  statusJne: "idle",
  statusTiki: "idle",
  statusPos: "idle",
  errorJne: undefined,
  errorTiki: undefined,
  errorPos: undefined,
};

const shippingPriceSlice = createSlice({
  name: "shippingPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJnePrice.pending, (state) => {
        state.statusJne = "pending";
      })
      .addCase(fetchJnePrice.fulfilled, (state, action) => {
        state.statusJne = "done";
        state.jneData = action.payload?.rajaongkir.results[0].costs! ?? [];
      })
      .addCase(fetchJnePrice.rejected, (state, action) => {
        state.jneData = [];
        state.statusJne = "rejected";
        state.errorJne = action.payload as AxiosError;
      });
    builder
      .addCase(fetchTikiPrice.pending, (state) => {
        state.statusTiki = "pending";
      })
      .addCase(fetchTikiPrice.fulfilled, (state, action) => {
        state.statusTiki = "done";
        state.tikiData = action.payload?.rajaongkir.results[0].costs! ?? [];
      })
      .addCase(fetchTikiPrice.rejected, (state, action) => {
        state.tikiData = [];
        state.statusTiki = "rejected";
        state.errorTiki = action.payload as AxiosError;
      });
    builder
      .addCase(fetchPosPrice.pending, (state) => {
        state.statusPos = "pending";
      })
      .addCase(fetchPosPrice.fulfilled, (state, action) => {
        state.statusPos = "done";
        state.posData = action.payload?.rajaongkir.results[0].costs! ?? [];
      })
      .addCase(fetchPosPrice.rejected, (state, action) => {
        state.posData = [];
        state.statusPos = "rejected";
        state.errorPos = action.payload as AxiosError;
      });
  },
});

export default shippingPriceSlice.reducer;
