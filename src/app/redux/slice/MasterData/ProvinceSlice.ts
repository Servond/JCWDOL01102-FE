import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProvinces } from "../../../../api/masterData";

export const fetchProvinces = createAsyncThunk(
  "province/fetchProvinces",
  async () => {
    const response = await getProvinces();
    return response.data.data;
  }
);

interface IProvinceData {
  province_id: number;
  province_name: string;
}

interface IProvince {
  status: "idle" | "pending" | "done" | "rejected";
  data: IProvinceData[];
  error: string;
}

const initialState: IProvince = {
  status: "idle",
  data: [],
  error: "",
};

const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProvinces.pending.type]: (state) => {
      state.status = "pending";
    },
    [fetchProvinces.fulfilled.type]: (state, action) => {
      state.status = "done";
      state.data = action.payload;
    },
    [fetchProvinces.rejected.type]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export default provinceSlice.reducer;
