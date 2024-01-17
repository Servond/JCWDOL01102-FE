// 1	city_id	int	NULL	NULL	NO	NULL
// 2	province_id	int	NULL	NULL	NO	NULL
// 3	city_name	varchar(255)	utf8mb4	utf8mb4_0900_ai_ci	NO	NULL
// 4	postal_code	char(5)	utf8mb4	utf8mb4_0900_ai_ci	NO	NULL

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCities } from "../../../../api/masterData";

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (id?: number) => {
    const response = await getCities(id);
    return response.data.data;
  }
);

interface ICityAttributes {
  city_id?: number;
  province_id?: number;
  city_name?: string;
  postal_code?: string;
}

interface ICitiesState {
  status: "idle" | "pending" | "done" | "rejected";
  data: ICityAttributes[];
  error: string;
}

const initialState: ICitiesState = {
  status: "idle",
  data: [],
  error: "",
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCities.pending.type]: (state) => {
      state.status = "pending";
    },
    [fetchCities.fulfilled.type]: (state, action) => {
      state.status = "done";
      state.data = action.payload;
    },
    [fetchCities.rejected.type]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export default citiesSlice.reducer;
