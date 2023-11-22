import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddressList } from "../../../../api/address";

export const fetchAddressList = createAsyncThunk(
  "addressList/fetchAddressList",
  async (id: number) => {
    const response = await getAddressList(id);
    return response.data.data;
  }
);

export interface Address {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  receiverName: string;
  phoneNumber: string;
  address: string;
  provinceId: number;
  userId: number;
  cityId: number;
  latitude: string;
  longitude: string;
  isDefault: boolean;
  isDeleted: boolean;
}

interface AddressListState {
  addressList: Address[];
  selectedAddressId?: number;
  status: "idle" | "pending" | "done" | "rejected";
  error: string;
}

const initialState: AddressListState = {
  addressList: [],
  selectedAddressId: undefined,
  status: "idle",
  error: "",
};

const addressListSlice = createSlice({
  name: "addressList",
  initialState,
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAddressList.fulfilled, (state, action) => {
        state.status = "done";
        state.addressList = action.payload;
      })
      .addCase(fetchAddressList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "";
      });
  },
});

export default addressListSlice.reducer;

export const { selectAddress } = addressListSlice.actions;
